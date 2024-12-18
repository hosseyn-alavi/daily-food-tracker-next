"use client";
import {
    Container,
    Box,
    Paper,
    Typography,
    IconButton,
    Grid2,
} from "@mui/material";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useCallback, useEffect, useState} from "react";
import dayjs from "dayjs";
import {TotalDailyCalories} from "../../components/TotalDailyCalories";
import {
    getDailyRecords,
    type GetRecordResponse,
} from "@/lib/api/getDailyRecord";
import {DeleteButton} from "@/components/DeleteButton";
import {ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";

function RecordsPage() {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
        dayjs(new Date())
    );
    const [records, setRecords] = useState<GetRecordResponse>({records: []});
    const [isLoading, setIsLoading] = useState(false);

    const getRecords = useCallback(async (date?: Date) => {
        setIsLoading(true);
        const res = await getDailyRecords(date);
        if (res) {
            setRecords(res);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getRecords(selectedDate?.toDate());
    }, [getRecords, selectedDate]);

    return (
        <Container
            component="div"
            maxWidth="xs"
            sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 3,
                    marginBottom: 2,
                }}
            >
                <IconButton
                    onClick={() =>
                        setSelectedDate(dayjs(selectedDate).subtract(1, "day"))
                    }
                >
                    <ArrowBackIos />
                </IconButton>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{
                            width: 150,
                        }}
                        disableFuture
                        format="DD MMM YYYY"
                        onChange={(e) => {
                            setSelectedDate(e);
                        }}
                        value={selectedDate}
                        slotProps={{
                            textField: {
                                size: "small",
                            },
                        }}
                    />
                </LocalizationProvider>
                <IconButton
                    onClick={() =>
                        setSelectedDate(dayjs(selectedDate).add(1, "day"))
                    }
                >
                    <ArrowForwardIos />
                </IconButton>
            </Box>
            <Box>
                <TotalDailyCalories
                    dailyRecordsCal={records}
                    isLoading={isLoading}
                />
            </Box>

            <Box
                sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column-reverse",
                    alignItems: "center",
                }}
            >
                {records.records.map((record) => (
                    <Paper
                        key={record.id}
                        variant="outlined"
                        sx={{
                            p: 1,
                            m: 0.5,
                            width: 300,
                            flexDirection: "column",
                            display: "flex",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                height: 25,
                            }}
                        >
                            <Typography variant="body1" fontWeight="bold">
                                {record.name}
                            </Typography>
                            {!!record.id && (
                                <DeleteButton
                                    id={record.id}
                                    resetList={getRecords}
                                    type="record"
                                />
                            )}
                        </Box>
                        <Grid2 container mt={1}>
                            <Grid2 size={6}>
                                <Typography variant="body2">
                                    {record.total}&nbsp;
                                    <Typography variant="caption" fontSize={10}>
                                        Kcal
                                    </Typography>
                                </Typography>
                            </Grid2>

                            <Grid2 size={6}>
                                <Typography variant="body2">
                                    {record.amount}
                                    <Typography variant="caption" fontSize={10}>
                                        g
                                    </Typography>
                                </Typography>
                            </Grid2>
                        </Grid2>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}

export default RecordsPage;
