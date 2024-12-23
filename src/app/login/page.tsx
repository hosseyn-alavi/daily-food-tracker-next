"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useForm} from "react-hook-form";

import {useState} from "react";
import {CircularProgress} from "@mui/material";
import {login} from "@/lib/api/auth";
import {useRouter} from "next/navigation";
import {enqueueSnackbar} from "notistack";

export interface Inputs {
    username: string;
    password: string;
}

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Inputs>();

    const onSubmit = async (data: Inputs) => {
        setIsLoading(true);
        const res = await login(data);

        if (res.token) {
            setIsLoading(false);

            router.push("/");
        } else {
            enqueueSnackbar("Invalid username or password", {variant: "error"});
            setIsLoading(false);
        }
        reset();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    pt: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5" color="text.primary">
                    Sign in
                </Typography>
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
                        id="username"
                        label="username"
                        autoComplete="username"
                        autoFocus
                        {...register("username", {required: true})}
                        helperText={errors.username && "Username is required."}
                        error={Boolean(errors.username)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password", {
                            required: true,
                            minLength: 3,
                        })}
                        helperText={
                            errors.password &&
                            "password should be at least 3 characters."
                        }
                        error={Boolean(errors.password)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        size="large"
                    >
                        {isLoading ? <CircularProgress size={23} /> : "Sign In"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;
