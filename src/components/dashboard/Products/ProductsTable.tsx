import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { useSearchParams } from "react-router-dom";
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
import { rationsT } from "../../../api/getRation";
import { useMutation } from "@tanstack/react-query";
import { RenderEditCell } from "./RenderEditCell";
import DragAndDropImage from "./DragAndDropImage";
import ConfirmationDialogDelete from "./PopUps/ConfirmationDialogDelete/ConfirmationDialogDelete";
import SuccsessDeleteDialog from "./PopUps/ConfirmationDialogDelete/SuccsessDeleteDialog";
import ConfirmationDialogEdit from "./PopUps/ConfirmationDialogDelete/ConfirmationDialogEdit";
import SuccsessEditDialog from "./PopUps/ConfirmationDialogDelete/SuccsessEditDialog";
import { error } from "console";

interface Props {
    rationsData: rationsT;
}

const ProductsTable = ({ rationsData }: Props) => {
    /* PAGINATION LOGIC -------------------------------- */

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get("p") || "1"));

    const handlePageChange = (
        newPage: number,
        selectedRowId: GridRowId | null
    ) => {
        console.log(newPage);
        setSearchParams((prev) => {
            prev.set("menu", "products"); // Ensure menu=products is always present
            prev.set("p", (newPage + 1).toString()); // Set page number

            return prev;
        });
        selectedRowId !== null &&
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [selectedRowId]: {
                    mode: GridRowModes.View,
                    ignoreModifications: true,
                },
            }));
        setEditCnt(0);
    };

    /* Rows and RowModel states*/

    type editedRowT =
        | (Omit<rationsT[0], "image" | "image_big"> & {
              newImages?: ["image"] | ["image_big"] | ["image", "image_big"];
              image:
                  | string
                  | [file: File, folder: string, originalImagePath: string];
              image_big:
                  | string
                  | [file: File, folder: string, originalImagePath: string];
          })
        | null
        | undefined;

    const [rows, setRows] = useState(rationsData);
    const [editedRows, setEditedRows] = useState<editedRowT>(null);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

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
        console.log(editCnt);
        setSelectedRowId(id);
        const handleEdit = () => {
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit },
            }));
            console.log("id " + id);
            setEditedRows(rationsData.find((item) => item.id === id));

            setEditCnt((editCnt) => ++editCnt);
        };
        editCnt === 0 && handleEdit();
    };

    /* Confirmation windows if Save button was clicked */
    const [openSaveEditDialog, setOpenSaveEditDialog] = useState(false);

    /* Save button was clicked */

    const handleSaveClick = (row: any, id: GridRowId) => () => {
        if (editedRows !== rationsData[+id]) {
            setOpenSaveEditDialog(true);
        }

        setSelectedRowId(id);
    };

    /* Cancel-edit button was clicked */
    const handleCancelEditClick = (id: GridRowId) => () => {
        const handleEdit = () => {
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
            }));
            setEditCnt((editCnt) => --editCnt);
        };
        editCnt === 1 && handleEdit();
    };

    /* React-query Upload Image */
    const mutationUploadImage = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch("/api/upload_image", {
                method: "POST",
                body: formData, // Sending FormData directly
            });

            if (!response.ok) {
                throw new Error("failed to upload");
            }

            return response.json();
        },
        onSuccess: (data) => {
            console.log("Image was uploaded successfully:", data.imageUrl);
        },
        onError: (error: any) => {
            alert(error.message);
        },
    });

    /* React-query SEND EDITED DATA TO DB */
    const mutationUpdateRation = useMutation({
        mutationFn: async (
            mutationPayload: Omit<rationsT[0], "created_at">
        ) => {
            const response = await fetch("/api/update_ration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mutationPayload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update ration");
            }

            return response.json(); // Return the successful response data
        },
        onSuccess: () => {
            setSuccesEditedMessage(
                `Рацион с id=${selectedRowId} был успешно отредактирован`
            );
        },
        onError: (error) => {
            alert(error.message);
        },
    });

    /* If in edit dialog windows "edit" button was clicked  */
    const handleConfirmEdit = async () => {
        if (selectedRowId === null) return; // Check if editing was made

        const handleUploadImage = async (
            file: File,
            folder: string,
            originalImagePath?: string
        ) => {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("folder", folder);
            if (originalImagePath) {
                formData.append("originalImagePath", `${originalImagePath}`);
            }
            try {
                const response = await mutationUploadImage.mutateAsync(
                    formData
                );
                return response.imageUrl; // Return the uploaded image path from the server response
            } catch (error) {
                console.error("Image upload failed:", error);
                throw error;
            }
        };

        const uploadImagesAndPrepareData = async (): Promise<
            Omit<rationsT[0], "deleted" | "created_at">
        > => {
            if (editedRows !== undefined && editedRows !== null) {
                if (editedRows.newImages !== undefined) {
                    const updatedRows: editedRowT = { ...editedRows }; // Create a copy to ensure immutability
                    if (Array.isArray(editedRows.newImages)) {
                        for (const element of editedRows.newImages) {
                            const imageField = editedRows[element];

                            // Type guard for `{ file: File, folder: string, originalImagePath: string }`
                            const isImageField = (
                                field: unknown
                            ): field is {
                                file: File;
                                folder: string;
                                originalImagePath: string;
                            } => {
                                return (
                                    field !== null &&
                                    typeof field === "object" &&
                                    "file" in field &&
                                    "folder" in field &&
                                    "originalImagePath" in field &&
                                    field.file instanceof File &&
                                    typeof field.folder === "string" &&
                                    typeof field.originalImagePath === "string"
                                );
                            };

                            if (isImageField(imageField)) {
                                try {
                                    const { file, folder, originalImagePath } =
                                        imageField;
                                    const imageUrl = await handleUploadImage(
                                        file,
                                        folder,
                                        originalImagePath
                                    );
                                    updatedRows[element] = imageUrl; // Update the IMAGE URL
                                } catch (error) {
                                    console.error(
                                        `Failed to upload ${element}:`,
                                        error
                                    );
                                    throw error;
                                }
                            } else {
                                console.error(
                                    `Invalid imageField format for ${element}:`,
                                    imageField
                                );
                            }
                        }
                    }

                    // Remove `newImages` after processing
                    delete updatedRows.newImages;

                    // Ensure `image` and `image_big` are strings
                    if (
                        typeof updatedRows.image === "string" &&
                        typeof updatedRows.image_big === "string"
                    ) {
                        // Return only the necessary fields for rationsT[0]
                        const result: Omit<
                            rationsT[0],
                            "deleted" | "created_at"
                        > = {
                            id: updatedRows.id,
                            title: updatedRows.title,
                            image: updatedRows.image,
                            image_big: updatedRows.image_big,
                            composition: updatedRows.composition,
                            description: updatedRows.description,
                            weight: updatedRows.weight,
                            price: updatedRows.price,
                            composition_full: updatedRows.composition_full,
                            nutrition_value: updatedRows.nutrition_value,
                        };
                        return result;
                    }
                } else {
                    if (
                        typeof editedRows.image === "string" &&
                        typeof editedRows.image_big === "string"
                    ) {
                        const result: Omit<
                            rationsT[0],
                            "deleted" | "created_at"
                        > = {
                            id: editedRows.id,
                            title: editedRows.title,
                            image: editedRows.image,
                            image_big: editedRows.image_big,
                            composition: editedRows.composition,
                            description: editedRows.description,
                            weight: editedRows.weight,
                            price: editedRows.price,
                            composition_full: editedRows.composition_full,
                            nutrition_value: editedRows.nutrition_value,
                        };
                        return result;
                    } else {
                        throw new Error(
                            "Invalid types for image or image_big. Expected strings."
                        );
                    }
                }
            }

            console.log(editedRows);
            throw new Error(
                "Invalid data: Unable to process images or prepare data"
            );
        };

        try {
            const finalData = await uploadImagesAndPrepareData();

            // Extract the required fields for the mutation
            const mutationPayload: Omit<rationsT[0], "deleted" | "created_at"> =
                {
                    id: finalData.id,
                    title: finalData.title,
                    image: finalData.image,
                    image_big: finalData.image_big,
                    composition: finalData.composition,
                    description: finalData.description,
                    weight: finalData.weight,
                    price: finalData.price,
                    composition_full: finalData.composition_full,
                    nutrition_value: finalData.nutrition_value,
                };

            await mutationUpdateRation.mutateAsync(mutationPayload);

            setOpenSaveEditDialog(false); // Close the dialog
        } catch (error) {
            console.error("Error during update process:", error);
        }

        setRowModesModel((oldModel) => ({
            ...oldModel,
            [selectedRowId]: {
                mode: GridRowModes.View,
            },
        }));
    };

    /* Message state if editing was succsefflul */
    const [succesEditedMessage, setSuccesEditedMessage] = useState<
        string | null
    >(null);

    // Reset success edit message on close succ windows
    const handleCloseSuccessEditDialog = () => {
        setEditCnt(0);
        setSuccesEditedMessage(null);
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
                            onClick={handleCancelEditClick(id)}
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
                onPaginationModelChange={(e) =>
                    handlePageChange(e.page, selectedRowId)
                }
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
            <ConfirmationDialogDelete
                handleCancelDelete={handleCancelDelete}
                handleConfirmDelete={handleConfirmDelete}
                openDialog={openDialog}
                selectedRowId={selectedRowId}
            />

            {/* Successful deleting dialog*/}
            <SuccsessDeleteDialog
                handleCloseSuccessDialog={handleCloseSuccessDialog}
                successDeleteMessage={succesEditedMessage}
            />

            {/* CONFORMATION DIALOG EDIT */}
            <ConfirmationDialogEdit
                handleCancelEditClick={handleCancelEditClick}
                handleConfirmEdit={handleConfirmEdit}
                openSaveEditDialog={openSaveEditDialog}
                selectedRowId={selectedRowId}
                setOpenSaveEditDialog={setOpenSaveEditDialog}
            />

            {/* Successful editing dialog*/}
            <SuccsessEditDialog
                handleCloseSuccessEditDialog={handleCloseSuccessEditDialog}
                setSuccesEditedMessage={setSuccesEditedMessage}
                succesEditedMessage={succesEditedMessage}
            />
        </Box>
    );
};

export default ProductsTable;
