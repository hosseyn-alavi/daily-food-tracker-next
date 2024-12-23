import {Logout} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import Cookies from "js-cookie";

const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
};

export const LogoutButton = () => {
    return (
        <div>
            <IconButton
                aria-label="logout"
                color="primary"
                onClick={handleLogout}
            >
                <Logout />
            </IconButton>
        </div>
    );
};
