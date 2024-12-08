import {Logout} from "@mui/icons-material";
import {IconButton} from "@mui/material";

const handleLogout = () => {
    localStorage.removeItem("token");
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
