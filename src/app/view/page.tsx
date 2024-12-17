"use client";
import {Container, Box, Paper, Typography} from "@mui/material";

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

function RecordsPage() {
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
        getRecords();
    }, [getRecords]);

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{
                        marginTop: 3,
                        marginBottom: 2,
                    }}
                    disableFuture
                    defaultValue={dayjs(new Date())}
                    format="DD MMM YYYY"
                    onChange={(e) => {
                        getRecords(e?.toDate());
                    }}
                />
            </LocalizationProvider>
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
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                height: 25,
                            }}
                        >
                            <Typography variant="body1">
                                Food name = {record.name}
                            </Typography>
                            {!!record.id && (
                                <DeleteButton
                                    id={record.id}
                                    resetList={getRecords}
                                    type="record"
                                />
                            )}
                        </Box>

                        <Typography variant="body1">
                            Amount = {record.amount}
                        </Typography>

                        <Typography variant="body1">
                            Total Cal = {record.total}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
}

export default RecordsPage;
