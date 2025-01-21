import { GridRowId } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface Props {
    openDialog: boolean;
    handleCancelDelete: () => void;
    selectedRowId: GridRowId | null;
    handleConfirmDelete: () => void;
}

const ConfirmationDialogDelete = ({
    openDialog,
    handleCancelDelete,
    selectedRowId,
    handleConfirmDelete,
}: Props) => {
    return (
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
    );
};

export default ConfirmationDialogDelete;
