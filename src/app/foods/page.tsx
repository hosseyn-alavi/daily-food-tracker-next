"use client";
import {Container, Box, Paper, Typography, Grid2} from "@mui/material";
import {useCallback, useEffect, useState} from "react";

import {DeleteButton} from "../../components/DeleteButton";
import {getFoodsList} from "@/lib/api/getFoodList";
import type {FoodAttributes} from "@/models/Food";
import {AddFoodForm} from "@/components/AddFoodForm";

function FoodsPage() {
    const [foodList, setFoodList] = useState<FoodAttributes[]>([]);

    const getFoods = useCallback(async () => {
        const res = await getFoodsList();
        if (res) {
            setFoodList(res);
        }
    }, []);
    useEffect(() => {
        getFoods();
    }, [getFoods]);

    return (
        <Container component="div" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column-reverse",
                    alignItems: "center",
                }}
            >
                {foodList.map((item) => (
                    <Paper
                        key={item.id}
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
                                position: "relative",
                            }}
                        >
                            <Typography variant="body1" fontWeight="bold">
                                {item.name}
                            </Typography>
                            {!!item.id && (
                                <DeleteButton
                                    id={item.id}
                                    resetList={getFoods}
                                    type="food"
                                />
                            )}
                        </Box>
                        <Grid2 container mt={1}>
                            <Grid2 size={6}>
                                <Typography variant="body2">
                                    {item.caloriesPer100g}&nbsp;
                                    <Typography variant="caption" fontSize={10}>
                                        Kcal/100g
                                    </Typography>
                                </Typography>
                            </Grid2>

                            <Grid2 size={6}>
                                <Typography variant="body2">
                                    {item.defaultWeight}
                                    <Typography variant="caption" fontSize={10}>
                                        g
                                    </Typography>
                                </Typography>
                            </Grid2>
                        </Grid2>
                    </Paper>
                ))}
            </Box>
            <AddFoodForm resetList={getFoods} />
        </Container>
    );
}

export default FoodsPage;
