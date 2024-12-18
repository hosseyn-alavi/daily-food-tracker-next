import {
    Alert,
    Button,
    CircularProgress,
    IconButton,
    Dialog,
    DialogActions,
    DialogTitle,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {useState} from "react";
import {deleteFood} from "@/lib/api/deleteFood";
import {deleteRecord} from "@/lib/api/deleteRecord";
import {enqueueSnackbar} from "notistack";

interface Props {
    resetList: () => void;
    id: number;
    type: "food" | "record";
}

export const DeleteButton = ({resetList, id, type}: Props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async (fId: number) => {
        setIsLoading(true);
        handleCloseDialog();
        let error = null;
        if (type === "food") {
            error = await deleteFood(fId);
        }
        if (type === "record") {
            error = await deleteRecord(fId);
        }

        if (error) {
            setIsError(true);
            enqueueSnackbar({message: "Error deleting food", variant: "error"});
        } else {
            setIsError(false);
            enqueueSnackbar({
                message: "Food deleted successfully",
                variant: "success",
            });

            resetList();
        }
        setIsLoading(false);
    };

    return (
        <>
            <IconButton
                sx={{position: "absolute", top: 0, right: 0}}
                color="error"
                onClick={() => {
                    setOpenDialog(true);
                }}
                disabled={isLoading}
                size="small"
            >
                {!isLoading ? <ClearIcon /> : <CircularProgress size={20} />}
            </IconButton>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Are you sure?</DialogTitle>

                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>

                    <Button
                        onClick={() => {
                            handleDelete(id);
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
                {isError && (
                    <Alert severity="error">Something went wrong!</Alert>
                )}
            </Dialog>
        </>
    );
};
