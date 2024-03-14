import { ReactElement } from "react";
import PdfViewer from "../pdf-viewer/pdfViewer";
import { Box, Chip, Typography } from "@mui/material";
import { skillsList } from "../../constants/skills.constants";

export default function About(): ReactElement {

    return (
        <Box className="About">
            <Box className="About__chip-container">
                <Typography component="h4">Some of the technologies I've worked with:</Typography>
                {skillsList.map(chip => {
                    return (
                        <Chip
                            className="About__chip-container--chip"
                            component="a"
                            label={chip.name}
                            icon={chip.CustomIcon}
                            href={chip.link}
                            clickable={chip.link !== undefined}
                        />
                    );
                })}
            </Box>
            <PdfViewer file="./hatch_resume_2024.pdf" />
        </Box>
    );
}
