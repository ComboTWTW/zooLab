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
import { NumericEditCell, renderEditCell } from "./NumericEditCell";

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
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    /* ------------------------------------------------------------------------------------------------------------------------------ */
    /* DELETE RATION HANDLING */

    /* If delete buttom was clicked */

    const handleDeleteClick = (id: GridRowId) => () => {
        setSelectedRowId(id); // Store the id of the row to be deleted
        setOpenDialog(true); // Open the confirmation dialog (are you sure you want to delete)
    };

    /* Conformation window if Delete button was clicked  */
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(null);

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

    /* ------------------------------------------------------------------------------------------------------------------------------ */
    /* EDIT RATION HANDLING */

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit },
        }));
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.View },
        }));
    };

    /* DELTE CONFORMATION DIALOG  ------------------------*/

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        }));
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDeleteMessage(null); // Reset success message on close
    };

    /* ACTIONS LOGIC END--------------------------------------- */

    /* TABLE SET-UP------------------------------------------------ */

    const processRowUpdate = (newRow: any) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows((oldRows) =>
            oldRows.map((row) => (row.id === newRow.id ? updatedRow : row))
        );
        console.log("save");
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
            renderEditCell: (params) => (
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
        },
        {
            field: "image_big",
            headerName: "Картинка (большая)",
            width: 150,
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
            renderEditCell: (params) => (
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
            renderEditCell: (params) => {
                let tempValue = params.value;

                const handleChange = (e: any) => {
                    tempValue = e.target.value;
                };

                const handleBlur = () => {
                    if (tempValue.trim() === "") {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: params.value,
                        }); // Revert to previous value
                    } else {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: tempValue,
                        }); // Save new value
                    }
                };

                return (
                    <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full max-h-full resize-none px-2"
                    >
                        {tempValue}
                    </textarea>
                );
            },
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
            renderEditCell: (params) => {
                let tempValue = params.value;

                const handleChange = (e: any) => {
                    tempValue = e.target.value;
                };

                const handleBlur = () => {
                    if (tempValue.trim() === "") {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: params.value,
                        }); // Revert to previous value
                    } else {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: tempValue,
                        }); // Save new value
                    }
                };

                return (
                    <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full max-h-full resize-none px-2"
                    >
                        {tempValue}
                    </textarea>
                );
            },
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
            renderEditCell: (params) => {
                let tempValue = params.value;

                const handleChange = (e: any) => {
                    tempValue = e.target.value;
                };

                const handleBlur = () => {
                    if (tempValue.trim() === "") {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: params.value,
                        }); // Revert to previous value
                    } else {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: tempValue,
                        }); // Save new value
                    }
                };

                return (
                    <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full max-h-full resize-none px-2"
                    >
                        {tempValue}
                    </textarea>
                );
            },
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
            renderEditCell: (params) => {
                let tempValue = params.value;

                const handleChange = (e: any) => {
                    tempValue = e.target.value;
                };

                const handleBlur = () => {
                    if (tempValue.trim() === "") {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: params.value,
                        }); // Revert to previous value
                    } else {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: tempValue,
                        }); // Save new value
                    }
                };

                return (
                    <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full max-h-full resize-none px-2"
                    >
                        {tempValue}
                    </textarea>
                );
            },
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
            renderEditCell: (params) => {
                let tempValue = params.value;

                const handleChange = (e: any) => {
                    tempValue = e.target.value;
                };

                const handleBlur = () => {
                    if (tempValue.trim() === "") {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: params.value,
                        }); // Revert to previous value
                    } else {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: tempValue,
                        }); // Save new value
                    }
                };

                return (
                    <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full max-h-full resize-none px-2"
                    >
                        {tempValue}
                    </textarea>
                );
            },
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
            renderEditCell: (params) => {
                let tempValue = params.value;

                const handleChange = (e: any) => {
                    tempValue = e.target.value;
                };

                const handleBlur = () => {
                    if (tempValue.trim() === "") {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: params.value,
                        }); // Revert to previous value
                    } else {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: tempValue,
                        }); // Save new value
                    }
                };

                return (
                    <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full max-h-full resize-none px-2"
                    >
                        {tempValue}
                    </textarea>
                );
            },
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
            renderEditCell: (params) => <NumericEditCell params={params} />,
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
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        /* Save Changes */
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
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
                        onClick={handleEditClick(id)}
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

    /* TABLE SET-UP END --------------------------------------- */

    /* --------------------------------------- */
    return (
        <Box sx={{ maxWidth: "100%", maxHeight: "100%" }}>
            <DataGrid
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
