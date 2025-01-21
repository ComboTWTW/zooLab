import { GridRowId } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface Props {
    succesEditedMessage: string | null;
    setSuccesEditedMessage: (arg0: string | null) => void;
    handleCloseSuccessEditDialog: () => void;
}

const SuccsessEditDialog = ({
    succesEditedMessage,
    setSuccesEditedMessage,
    handleCloseSuccessEditDialog,
}: Props) => {
    return (
        <Dialog
            open={!!succesEditedMessage}
            onClose={() => setSuccesEditedMessage(null)}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>Успех</DialogTitle>
            <DialogContent dividers>
                <p>{succesEditedMessage}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseSuccessEditDialog} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccsessEditDialog;
