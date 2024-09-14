import {useEffect, useMemo, useState} from "react";
//import {LoginForm} from "./containers/pages/LoginForm";
//import { MainForm } from "./containers/pages/MainForm";
//import { NavigationPanel } from "./components/NavigationPanel";
//import { RecordsPage } from "./containers/pages/RecordsPage";
//import { FoodsPage } from "./containers/pages/FoodsPage";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {Box} from "@mui/material";
import {useRouter} from "next/router";

enum ActivePage {
    Main,
    Records,
    Foods,
}

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activePage] = useState(ActivePage.Main);

    const router = useRouter();

    // const handleGoToRecords = () => {
    //   setActivePage(ActivePage.Records);
    // };

    // const handleGoToMain = () => {
    //   setActivePage(ActivePage.Main);
    // };

    // const handleGoToFoods = () => {
    //   setActivePage(ActivePage.Foods);
    // };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: "dark",
                },
            }),
        []
    );

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    height: "100vh",
                })}
            >
                {isLoggedIn ? (
                    <div id="container" style={{height: "100vh"}}>
                        {activePage === ActivePage.Records && (
                            <div
                                id="contentR"
                                style={{
                                    height: `calc(100vh - 80px)`,
                                    overflow: "scroll",
                                }}
                            >
                                {/* <RecordsPage /> */}
                            </div>
                        )}
                        {activePage === ActivePage.Foods && (
                            <div
                                id="contentR"
                                style={{
                                    height: `calc(100vh - 80px)`,
                                    overflow: "scroll",
                                }}
                            >
                                {/* <FoodsPage /> */}
                            </div>
                        )}
                        {activePage === ActivePage.Main && (
                            <div
                                id="contentM"
                                style={{height: `calc(100vh - 80px)`}}
                            >
                                {/* <MainForm /> */}
                            </div>
                        )}

                        <div>
                            {/* <NavigationPanel
                handleGoToRecords={handleGoToRecords}
                handleGoToMain={handleGoToMain}
                handleGoToFoods={handleGoToFoods}
              /> */}
                        </div>
                    </div>
                ) : (
                    <>Login</>
                    // <LoginForm setIsLoggedIn={setIsLoggedIn} />
                )}
            </Box>
        </ThemeProvider>
    );
}

export default Home;
