import { PaletteMode, createTheme } from "@mui/material";

export default function theme(mode?: PaletteMode) {
    return createTheme({
        palette: {
            mode,
        }
    });
}

