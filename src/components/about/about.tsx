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
            <Box component="p">
                &nbsp;&nbsp;&nbsp;&nbsp;My name is Timothy Hatch! I am a Full Cycle Developer, Gamer, Golfer, Hockey player, Tech enthusiast.
                I have been completing projects from inception to production for almost 9 years now.
                I've worked across a variety of stacks and technologies. My favorite was developing motion code to move a 6-axis robot arm through our 3d world to help automate manufacturing.
                In my career I have learned that there is so much to know and learn as a developer and I am never going to know all of it, but I'm always eager to expand my knowledge.
                The things I have found to overcome the knowledge barrier are: always being ready to learn and knowing how to research to find the answer.
            </Box>
            <PdfViewer file="./hatch_resume_2024.pdf" />
        </Box>
    );
}
