"use client";
import {Home, SoupKitchen, TableView} from "@mui/icons-material";
import {BottomNavigation, BottomNavigationAction, Box} from "@mui/material";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import {useEffect, type ReactNode} from "react";

interface LayoutProps {
    children: ReactNode; // Specify that the layout can wrap other components
}

export const Layout = ({children}: LayoutProps) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    const theme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    height: "100vh",
                })}
            >
                <div id="container" style={{height: "100vh"}}>
                    <div
                        id="contentR"
                        style={{
                            height: "calc(100vh - 80px)",
                            overflow: "scroll",
                        }}
                    >
                        {children}
                    </div>

                    <div>
                        <BottomNavigation
                            showLabels
                            // value={value}
                            // onChange={(event, newValue) => {
                            //   setValue(newValue);
                            // }}
                        >
                            <BottomNavigationAction
                                label="Home"
                                icon={<Home />}
                                onClick={() => router.push("/")}
                            />
                            <BottomNavigationAction
                                label="View"
                                icon={<TableView />}
                                onClick={() => router.push("/view")}
                            />
                            <BottomNavigationAction
                                label="Foods"
                                icon={<SoupKitchen />}
                                onClick={() => router.push("/foods")}
                            />
                        </BottomNavigation>
                    </div>
                </div>
            </Box>
        </ThemeProvider>
    );
};
