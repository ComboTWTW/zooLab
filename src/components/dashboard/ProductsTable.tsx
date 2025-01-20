import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
    DataGrid,
    GridColDef,
    GridRowId,
    GridRowModesModel,
    GridRowModes,
    GridActionsCellItem,
    GridEventListener,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { rationsT } from "../../api/getRation";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useMutation } from "@tanstack/react-query";
import { RenderEditCell } from "./RenderEditCell";
import DragAndDropImage from "./DragAndDropImage";
import { rations } from "../../constants";

interface Props {
    rationsData: rationsT;
}

const ProductsTable = ({ rationsData }: Props) => {
    /* PAGINATION LOGIC -------------------------------- */

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get("p") || "1"));

    const handlePageChange = (newPage: number) => {
        console.log(newPage);
        setSearchParams((prev) => {
            prev.set("menu", "products"); // Ensure menu=products is always present
            prev.set("p", (newPage + 1).toString()); // Set page number

            return prev;
        });
    };

    /* Rows and RowModel states*/

    const [rows, setRows] = useState(rationsData);
    const [editedRows, setEditedRows] = useState({});
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    useEffect(() => {
        console.log("edited rows");
        console.log(editedRows);
    }, [editedRows]);

    /* Prevents default start and exit editing behaviour on some actions*/
    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStart: GridEventListener<"rowEditStart"> = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };

    /* ------------------------------------------------------------------------------------------------------------------------------ */
    /* DELETE RATION HANDLING */

    /* If delete buttom was clicked */

    const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(null);
    const handleDeleteClick = (id: GridRowId) => () => {
        setSelectedRowId(id); // Store the id of the row to be deleted
        setOpenDialog(true); // Open the confirmation dialog (are you sure you want to delete)
    };

    /* Conformation window if Delete button was clicked  */
    const [openDialog, setOpenDialog] = useState(false);

    /* If in delete dialog window "cancel" button was clicked  */
    const handleCancelDelete = () => {
        setOpenDialog(false); // Close the delete dialog without doing anything
    };

    /* If in delete dialog windows "delete" button was clicked  */
    const handleConfirmDelete = async () => {
        if (selectedRowId === null) return; // Check if selectedRowId is valid

        await mutation.mutateAsync({ id: +selectedRowId }); // Pass the selectedRowId to the mutation function
        setRows((oldRows) => oldRows.filter((row) => row.id !== selectedRowId)); // Update the rows in the table
        setOpenDialog(false); // Close the dialog
    };

    /* React-query DELETING mutation */
    const mutation = useMutation({
        mutationFn: async (rationDelete: { id: number }) => {
            const response = await fetch("/api/delete_ration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rationDelete),
            });

            if (!response.ok) {
                throw new Error("failed to delete");
            }

            return response.json();
        },
        onSuccess: (data, rationDelete: { id: number }) => {
            setSuccessDeleteMessage(
                `Рацион с id=${rationDelete.id} был успешно помещен в корзину`
            ); // Set success message
        },
        onError: (error: any) => {
            alert(error.message);
        },
    });

    /* Message state if deleting was succsefflul */
    const [successDeleteMessage, setSuccessDeleteMessage] = useState<
        string | null
    >(null);

    // Reset success delete message on close succ windows
    const handleCloseSuccessDialog = () => {
        setSuccessDeleteMessage(null);
    };

    /* EDIT RATION HANDLING */

    /* Edit button was clicked */
    const [editCnt, setEditCnt] = useState<number>(0);
    const handleEditClick = (row: any, id: GridRowId) => () => {
        setEditedRows(rationsData[+id]);
        console.log(editCnt);
        const handleEdit = () => {
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit },
            }));
            setEditCnt((editCnt) => ++editCnt);
        };
        editCnt < 1 && handleEdit();
    };

    /* Save button was clicked */

    const handleSaveClick = (row: any, id: GridRowId) => () => {
        setEditCnt((editCnt) => --editCnt);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.View },
        }));
    };

    /* Cancel-edit button was clicked */
    const handleCancelClick = (id: GridRowId) => () => {
        const handleEdit = () => {
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
            }));
            setEditCnt((editCnt) => --editCnt);
        };
        editCnt === 1 && handleEdit();
    };

    /* Updates  rows state before updating table */
    const processRowUpdate = (newRow: any, oldRow: any, params: any) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows((oldRows) =>
            oldRows.map((row) => (row.id === newRow.id ? updatedRow : row))
        );

        return updatedRow;
    };

    const columns: GridColDef[] = [
        {
            field: "image",
            headerName: "Картинка",
            width: 150,
            editable: true,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="Product"
                    style={{
                        width: "full",
                        height: "full",
                        objectFit: "cover",
                    }}
                />
            ),
            renderEditCell: (params) => {
                const handleImageChange = (file: File) => {
                    // Update the state with the new file or send it to the server
                    const reader = new FileReader();
                    reader.onload = () => {
                        const filePath = reader.result as string; // For preview or upload handling

                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: filePath, // This is just an example; you might handle it differently
                        });
                    };
                    reader.readAsDataURL(file);
                };

                return (
                    <DragAndDropImage
                        setEditedRows={setEditedRows}
                        params={params}
                        editedRows={editedRows}
                        rationsData={rationsData}
                        handleImageChange={handleImageChange}
                    />
                );
            },
        },
        {
            field: "image_big",
            headerName: "Картинка (большая)",
            width: 150,
            editable: true,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="Product"
                    style={{
                        width: "full",
                        height: "full",
                        objectFit: "cover",
                    }}
                />
            ),
            renderEditCell: (params) => {
                const handleImageChange = (file: File) => {
                    // Update the state with the new file or send it to the server
                    const reader = new FileReader();
                    reader.onload = () => {
                        const filePath = reader.result as string; // For preview or upload handling
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: filePath, // This is just an example; you might handle it differently
                        });
                    };
                    reader.readAsDataURL(file);
                };

                return (
                    <DragAndDropImage
                        setEditedRows={setEditedRows}
                        params={params}
                        editedRows={editedRows}
                        rationsData={rationsData}
                        handleImageChange={handleImageChange}
                    />
                );
            },
        },
        {
            field: "title",
            headerName: "Название",
            width: 100,
            editable: true,
            renderCell: (params) => (
                <span className="line-clamp-5 px-1" title={params.value}>
                    {params.value}
                </span>
            ),
            renderEditCell: (params) => (
                <RenderEditCell
                    params={params}
                    typeOfField={"text"}
                    editedRows={editedRows}
                    setEditedRows={setEditedRows}
                    rationsData={rationsData}
                />
            ),
        },
        {
            field: "composition",
            headerName: "Состав",
            width: 100,
            editable: true,
            renderCell: (params) => (
                <span className="line-clamp-5 px-1" title={params.value}>
                    {params.value}
                </span>
            ),
            renderEditCell: (params) => (
                <RenderEditCell
                    params={params}
                    typeOfField={"text"}
                    editedRows={editedRows}
                    setEditedRows={setEditedRows}
                    rationsData={rationsData}
                />
            ),
        },
        {
            field: "description",
            headerName: "Описание",
            width: 150,
            editable: true,
            renderCell: (params) => (
                <span className="line-clamp-5 px-1" title={params.value}>
                    {params.value}
                </span>
            ),
            renderEditCell: (params) => (
                <RenderEditCell
                    params={params}
                    typeOfField={"text"}
                    editedRows={editedRows}
                    setEditedRows={setEditedRows}
                    rationsData={rationsData}
                />
            ),
        },
        {
            field: "weight",
            headerName: "Вес",
            width: 100,
            editable: true,
            renderCell: (params) => (
                <span className="line-clamp-5 px-1" title={params.value}>
                    {params.value}
                </span>
            ),
            renderEditCell: (params) => (
                <RenderEditCell
                    params={params}
                    typeOfField={"text"}
                    editedRows={editedRows}
                    setEditedRows={setEditedRows}
                    rationsData={rationsData}
                />
            ),
        },
        {
            field: "composition_full",
            headerName: "Описание (полн.)",
            width: 300,
            editable: true,
            renderCell: (params) => (
                <span className="line-clamp-5 px-1" title={params.value}>
                    {params.value}
                </span>
            ),
            renderEditCell: (params) => (
                <RenderEditCell
                    params={params}
                    typeOfField={"text"}
                    editedRows={editedRows}
                    setEditedRows={setEditedRows}
                    rationsData={rationsData}
                />
            ),
        },

        {
            field: "nutrition_value",
            headerName: "Пищ. ценность",
            width: 150,
            editable: true,
            renderCell: (params) => (
                <span className="line-clamp-5 px-1" title={params.value}>
                    {params.value}
                </span>
            ),
            renderEditCell: (params) => (
                <RenderEditCell
                    params={params}
                    typeOfField={"text"}
                    editedRows={editedRows}
                    setEditedRows={setEditedRows}
                    rationsData={rationsData}
                />
            ),
        },
        {
            field: "price",
            headerName: "Цена",
            width: 60,
            editable: true,
            renderCell: (params) => (
                <span className="line-clamp-5 px-1" title={params.value}>
                    {params.value}
                </span>
            ),
            renderEditCell: (params) => (
                <RenderEditCell
                    params={params}
                    typeOfField={"number"}
                    editedRows={editedRows}
                    setEditedRows={setEditedRows}
                    rationsData={rationsData}
                />
            ),
        },
        {
            field: "created_at",
            headerName: "Создано",
            width: 150,
            editable: false,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Действия",
            width: 100,
            /* ACTION BUTTONS ---------------- */
            getActions: ({ id, row }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        /* Save Changes */
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(row, id)}
                        />,
                        /* Cancel Changes */
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                        />,
                    ];
                }
                return [
                    /* Edit button */
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditClick(row, id)}
                    />,
                    /* Delete button */
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                    />,
                ];
            },
        },
    ];

    return (
        <Box sx={{ maxWidth: "100%", maxHeight: "100%" }}>
            <DataGrid
                onRowEditStop={handleRowEditStop}
                onRowEditStart={handleRowEditStart}
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={setRowModesModel}
                processRowUpdate={processRowUpdate}
                rowHeight={200}
                pagination // Enable pagination
                onPaginationModelChange={(e) => handlePageChange(e.page)}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: page - 1 }, // Set rows per page to 5
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                sx={{
                    "& .MuiDataGrid-cell": {
                        whiteSpace: "normal",
                        lineHeight: 1.5, // Adjust line height for better spacing
                        overflow: "hidden", // Prevent content overflow
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3, // Limit to 3 lines
                    },
                }}
            />

            {/* CONFORMATION DIALOG DELETE */}
            <Dialog
                open={openDialog}
                onClose={handleCancelDelete}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Подтвердить удаление</DialogTitle>
                <DialogContent>
                    <p>
                        Вы уверены, что хотите поместить в корзину рацион с id=
                        {selectedRowId}
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={() => handleConfirmDelete()} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Successful deleting dialog*/}
            <Dialog
                open={!!successDeleteMessage}
                onClose={handleCloseSuccessDialog}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Успех</DialogTitle>
                <DialogContent dividers>
                    <p>{successDeleteMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductsTable;
