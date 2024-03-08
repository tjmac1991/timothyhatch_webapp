import { AppBar, IconButton, Toolbar, Box, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ReactElement, useState } from "react";
import React from "react";
import NavMenu from "../nav-menu/navMenu";


export default function Header(): ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (): void => {
        setAnchorEl(null);
    }

    return (
        <>
            <Box className="Header">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={handleMenu}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-lable="menu"
                            className="Header--icon-button"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div">
                            Posts
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <NavMenu
                open={menuOpen}
                anchorEl={anchorEl}
                handleClose={handleClose}
            ></NavMenu>
        </>
    );
}
