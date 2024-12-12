"use client";
import {useEffect, useState} from "react";
import {Paper} from "@mui/material";
import type {GetRecordResponse} from "@/lib/api/getDailyRecord";

interface Props {
    dailyRecordsCal: GetRecordResponse;
}

export function TotalDailyCalories({
    dailyRecordsCal: {records, dailyGoal},
}: Readonly<Props>) {
    const [totalDaily, setTotalDaily] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const sum = records.reduce((sum, {total}) => sum + total, 0);
        const totalDailyCal = Number(sum.toFixed(2));
        setTotalDaily(totalDailyCal);

        const progressPercentage = (totalDailyCal / (dailyGoal ?? 0)) * 100;
        console.log("progressPercentage:", progressPercentage);
        setProgress(progressPercentage);
    }, [records, dailyGoal]);

    const getBackgroundColor = () => {
        const colorRanges = [
            {range: 50, color: "lightgreen"},
            {range: 80, color: "orange"},
            {range: 100, color: "red"},
        ];

        for (const colorRange of colorRanges) {
            if (progress <= colorRange.range) {
                return colorRange.color;
            }
        }

        return "red";
    };
    return (
        <div>
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    mb: 1,
                    backgroundColor: "transparent",
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        backgroundColor: `${getBackgroundColor()}`,
                        width: `${progress}%`,
                        height: 54,
                        position: "absolute",
                        zIndex: -1,
                        top: 0,
                        left: 0,
                    }}
                />
                {`Daily total calories =  ${totalDaily}`}
            </Paper>
        </div>
    );
}
