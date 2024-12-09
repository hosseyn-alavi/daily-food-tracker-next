"use client";
import {LogoutButton} from "@/components/LogoutButton";
import {TotalDailyCalories} from "@/components/TotalDailyCalories";
import {
    getDailyRecords,
    type GetRecordResponse,
} from "@/lib/api/getDailyRecord";
import {getFoodsList} from "@/lib/api/getFoodList";
import {submitRecords} from "@/lib/api/submitRecords";
import type {FoodAttributes} from "@/models/Food";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Container,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";

export interface FoodDetailsRecord {
    name: string;
    caloriesPer100g: number | null;
    amount: number | null;
    total?: number;
    id?: number;
}

function Home() {
    const [options, setOptions] = useState<FoodAttributes[]>([]);

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [dailyRecordsCal, setDailyRecordsCal] = useState<GetRecordResponse>({
        records: [],
    });

    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors},
        watch,
    } = useForm<FoodDetailsRecord>();

    const getFoods = useCallback(async () => {
        const res = await getFoodsList();
        if (res) {
            setOptions(res);
        }
    }, []);

    const getDailyRecordsApi = useCallback(async () => {
        const res = await getDailyRecords();
        if (res) {
            setDailyRecordsCal(res);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }

        getFoods();
        getDailyRecordsApi();
    }, [router, getFoods, getDailyRecordsApi]);

    const onSubmit = async (data: FoodDetailsRecord) => {
        data.total = ((data.amount ?? 0) * (data.caloriesPer100g ?? 0)) / 100;
        setIsLoading(true);
        const res = await submitRecords(data);

        if (res && res.status === 200) {
            setIsLoading(false);
            setIsError(false);
            reset();
            getDailyRecordsApi();
            setOpen(true);
            setMessage("Record added successfully");
        } else {
            setIsLoading(false);
            setIsError(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="div" maxWidth="xs">
            <LogoutButton />

            <Snackbar
                open={open}
                anchorOrigin={{horizontal: "center", vertical: "top"}}
                onClose={handleClose}
                autoHideDuration={3000}
            >
                <Alert severity="success">{message}</Alert>
            </Snackbar>

            <Box
                sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <TotalDailyCalories dailyRecordsCal={dailyRecordsCal} />

                <Autocomplete
                    disablePortal
                    options={options}
                    fullWidth
                    renderInput={(params) => (
                        <TextField {...params} label="Food" />
                    )}
                    getOptionLabel={(opt) => opt.name}
                    onChange={(e, v) => {
                        setValue("name", v?.name ? v.name : "");
                        setValue(
                            "caloriesPer100g",
                            v?.caloriesPer100g ? v.caloriesPer100g : null
                        );
                        setValue(
                            "amount",
                            v?.defaultWeight ? v.defaultWeight : null
                        );
                    }}
                />
                <Box
                    component="form"
                    noValidate
                    sx={{mt: 1}}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="food-name"
                        label="Food name"
                        hiddenLabel
                        autoComplete="food name"
                        {...register("name", {required: true})}
                        helperText={errors.name && "Food name is require."}
                        error={Boolean(errors.name)}
                        slotProps={{
                            inputLabel: {
                                shrink: Boolean(watch("name")),
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Calories per 100gr"
                        id="cal-per-100gr"
                        autoComplete="calories per 100gr"
                        {...register("caloriesPer100g", {
                            required: true,
                        })}
                        helperText={
                            errors.caloriesPer100g &&
                            "Food calories is require."
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
                        required
                        fullWidth
                        type="number"
                        label="Amount"
                        id="amount"
                        autoComplete="amount"
                        helperText={
                            errors.caloriesPer100g && "Amount is require."
                        }
                        error={Boolean(errors.amount)}
                        {...register("amount", {required: true})}
                        slotProps={{
                            inputLabel: {
                                shrink: Boolean(watch("amount")),
                            },
                        }}
                    />
                    <Typography color="text.primary">
                        {`Total = ${
                            (Number(watch("amount") ?? 0) *
                                Number(watch("caloriesPer100g") ?? 0)) /
                            100
                        }`}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={isLoading || !watch("amount")}
                        size="large"
                    >
                        {isLoading ? <CircularProgress size={25} /> : "Submit"}
                    </Button>
                </Box>
                {isError && (
                    <Alert severity="error">Something went wrong!</Alert>
                )}
            </Box>
        </Container>
    );
}

export default Home;
