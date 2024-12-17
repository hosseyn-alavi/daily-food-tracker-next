import AddIcon from "@mui/icons-material/Add";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    TextField,
} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import type {FoodAttributes} from "@/models/Food";
import {addFood} from "@/lib/api/addFood";
import {enqueueSnackbar} from "notistack";

interface Props {
    resetList: () => void;
}

export const AddFoodForm = ({resetList}: Props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        reset();
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        watch,
    } = useForm<FoodAttributes>();

    const onSubmit = async (data: FoodAttributes) => {
        setIsLoading(true);
        const error = await addFood(data);

        if (error) {
            setIsError(true);
            enqueueSnackbar({message: "Error adding food", variant: "error"});
        } else {
            setIsError(false);
            enqueueSnackbar({
                message: "Food added successfully",
                variant: "success",
            });
            handleCloseDialog();
            resetList();
        }
        setIsLoading(false);
    };

    return (
        <Container component="div" maxWidth="xs">
            <Box
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "absolute",
                    bottom: "100px",
                    right: "30px",
                    zIndex: 999,
                }}
            >
                <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => {
                        setOpenDialog(true);
                    }}
                >
                    <AddIcon />
                </Fab>
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Food</DialogTitle>
                <Box
                    component="form"
                    noValidate
                    sx={{mt: 1}}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <DialogContent>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            hiddenLabel
                            type="text"
                            id="food-name"
                            label="Food name"
                            {...register("name", {required: true})}
                            helperText={errors.name && "Food name is require."}
                            error={Boolean(errors.name)}
                            slotProps={{
                                inputLabel: {shrink: Boolean(watch("name"))},
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            label="Calories per 100gr"
                            id="cal-per-100gr"
                            {...register("caloriesPer100g", {required: true})}
                            helperText={
                                errors.caloriesPer100g &&
                                "CaloriesPer100g  is require."
                            }
                            error={Boolean(errors.caloriesPer100g)}
                            slotProps={{
                                inputLabel: {
                                    shrink: Boolean(watch("caloriesPer100g")),
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            type="number"
                            label="DefaultWeight"
                            id="defaultWeight"
                            {...register("defaultWeight")}
                            error={Boolean(errors.defaultWeight)}
                            slotProps={{
                                inputLabel: {
                                    shrink: Boolean(watch("defaultWeight")),
                                },
                            }}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        {isLoading ? (
                            <CircularProgress size={23} />
                        ) : (
                            <Button type="submit" disabled={isLoading}>
                                Submit
                            </Button>
                        )}
                    </DialogActions>
                    {isError && (
                        <Alert severity="error">Something went wrong!</Alert>
                    )}
                </Box>
            </Dialog>
        </Container>
    );
};
