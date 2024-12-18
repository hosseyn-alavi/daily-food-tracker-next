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
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import {useRouter} from "next/navigation";
import {enqueueSnackbar} from "notistack";
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
    const [isLoading, setIsLoading] = useState(false);
    const [dailyRecordsCal, setDailyRecordsCal] = useState<GetRecordResponse>({
        records: [],
    });
    const [isGetDailyRecordsLoading, setIsGetDailyRecordsLoading] =
        useState(false);
    const [isGetFoodsLoading, setIsGetFoodsLoading] = useState(false);

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
        setIsGetFoodsLoading(true);
        const res = await getFoodsList();
        if (res) {
            setOptions(res);
        }
        setIsGetFoodsLoading(false);
    }, []);

    const getDailyRecordsApi = useCallback(async () => {
        setIsGetDailyRecordsLoading(true);
        const res = await getDailyRecords();
        if (res) {
            setDailyRecordsCal(res);
        }
        setIsGetDailyRecordsLoading(false);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }

        getFoods();
        getDailyRecordsApi();
    }, [getFoods, router, getDailyRecordsApi]);

    const onSubmit = async (data: FoodDetailsRecord) => {
        data.total = ((data.amount ?? 0) * (data.caloriesPer100g ?? 0)) / 100;
        setIsLoading(true);
        const res = await submitRecords(data);

        if (res && res.status === 200) {
            reset();
            getDailyRecordsApi();
            enqueueSnackbar("Record added successfully", {
                variant: "success",
            });
        } else {
            enqueueSnackbar("Error submitting record", {
                variant: "error",
            });
        }
        setIsLoading(false);
    };

    return (
        <Container component="div" maxWidth="xs">
            <LogoutButton />

            <Box
                sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <TotalDailyCalories
                    dailyRecordsCal={dailyRecordsCal}
                    isLoading={isGetDailyRecordsLoading}
                />

                <Autocomplete
                    disablePortal
                    options={options}
                    fullWidth
                    renderInput={(params) => (
                        <TextField {...params} label="Food" />
                    )}
                    popupIcon={
                        isGetFoodsLoading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : undefined
                    }
                    disabled={isGetFoodsLoading}
                    getOptionLabel={(opt) => opt.name}
                    value={null}
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
                        document.getElementById("amount")?.focus();
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
                        type="number"
                        slotProps={{
                            htmlInput: {
                                inputMode: "decimal",
                                pattern: "[0-9]*",
                            },
                            inputLabel: {
                                shrink: Boolean(watch("caloriesPer100g")),
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Amount"
                        id="amount"
                        autoComplete="amount"
                        helperText={
                            errors.caloriesPer100g && "Amount is require."
                        }
                        error={Boolean(errors.amount)}
                        {...register("amount", {required: true})}
                        type="number"
                        slotProps={{
                            htmlInput: {
                                inputMode: "decimal",
                                pattern: "[0-9]*",
                            },
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
            </Box>
        </Container>
    );
}

export default Home;
