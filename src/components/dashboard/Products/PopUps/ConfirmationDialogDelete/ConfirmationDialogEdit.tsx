import { GridRowId } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface Props {
    openSaveEditDialog: boolean;
    handleCancelEditClick: (id: GridRowId) => void;
    selectedRowId: GridRowId | null;
    handleConfirmEdit: () => void;
    setOpenSaveEditDialog: (arg0: boolean) => void;
}

const ConfirmationDialogEdit = ({
    openSaveEditDialog,
    handleCancelEditClick,
    selectedRowId,
    handleConfirmEdit,
    setOpenSaveEditDialog,
}: Props) => {
    return (
        <Dialog
            open={openSaveEditDialog}
            onClose={handleCancelEditClick}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>Подтвердить редактирование</DialogTitle>
            <DialogContent>
                <p>
                    Вы уверены, что хотите изменить рацион с id=
                    {selectedRowId}
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleConfirmEdit()} color="primary">
                    Edit
                </Button>
                <Button
                    color="error"
                    onClick={() => setOpenSaveEditDialog(false)}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialogEdit;
