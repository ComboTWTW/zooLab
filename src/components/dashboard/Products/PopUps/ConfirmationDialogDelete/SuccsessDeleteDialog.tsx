import { GridRowId } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface Props {
    handleCloseSuccessDialog: () => void;
    successDeleteMessage: string | null;
}
const SuccsessDeleteDialog = ({
    handleCloseSuccessDialog,
    successDeleteMessage,
}: Props) => {
    return (
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
    );
};

export default SuccsessDeleteDialog;
