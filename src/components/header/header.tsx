import { AppBar, IconButton, Toolbar, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ReactElement, useState } from "react";
import React from "react";
import NavMenu from "../nav-menu/navMenu";

type tHeaderProps = {
    pageTitle: string;
}

export default function Header({pageTitle}: tHeaderProps): ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const theme = useTheme();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                    <Toolbar className="Header__toolbar">
                        <Box className="Header__toolbar__left-toolbar">
                            <IconButton
                                onClick={handleMenu}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-lable="menu"
                                className="Header__icon-button"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div">
                                {pageTitle}
                            </Typography>
                        </Box>
                        <Typography className="Header__app-title" variant={smDownScreen ? 'h4' : 'h3'} component="div">
                            Timothy Hatch
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
