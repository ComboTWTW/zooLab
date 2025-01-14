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
            prev.set("p", (newPage + 1).toString()); // Set page number
            prev.set("menu", "products"); // Ensure menu=products is always present
            return prev;
        });
    };

    /* PAGINATION LOGIC -------------------------------- */

    /* ------------------------------------------------ */

    const [rows, setRows] = useState(rationsData);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    /* ------------------------------------------------ */

    /* Conformation window state Delete */
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(null);

    const [successDeleteMessage, setSuccessDeleteMessage] = useState<
        string | null
    >(null); //if succsefull delete message state

    /* React-query post for deleting ration */
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
                `Ration with id=${rationDelete.id} was successfully deleted`
            ); // Set success message
        },
        onError: (error: any) => {
            alert(error.message);
        },
    });

    /* ------------------------------------------------ */

    /* ACTIONS LOGIC --------------------------------------- */

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

    const handleDeleteClick = (id: GridRowId) => () => {
        setSelectedRowId(id); // Store the id of the row to be deleted
        setOpenDialog(true); // Open the confirmation dialog
    };

    /* DELTE CONFORMATION DIALOG  */
    const handleConfirmDelete = async () => {
        if (selectedRowId === null) return; // Check if selectedRowId is valid

        await mutation.mutateAsync({ id: +selectedRowId }); // Pass the selectedRowId to the mutation function
        setRows((oldRows) => oldRows.filter((row) => row.id !== selectedRowId)); // Update the rows in the table
        setOpenDialog(false); // Close the dialog
        console.log("Deleted row", selectedRowId);
    };
    const handleCancelDelete = () => {
        setOpenDialog(false); // Close the dialog without doing anything
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
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
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
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
            ),
        },
        { field: "title", headerName: "Название", width: 100, editable: true },
        {
            field: "composition",
            headerName: "Состав",
            width: 100,
            editable: true,
        },
        {
            field: "description",
            headerName: "Описание",
            width: 150,
            editable: true,
        },
        { field: "weight", headerName: "Вес", width: 100, editable: true },
        {
            field: "composition_full",
            headerName: "Описание (полн.)",
            width: 300,
            editable: true,
        },

        {
            field: "nutrition_value",
            headerName: "Пищ. ценность",
            width: 150,
            editable: true,
        },
        {
            field: "price",
            headerName: "Цена",
            width: 60,
            editable: true,
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
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this product?</p>
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
                <DialogTitle>Success</DialogTitle>
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
