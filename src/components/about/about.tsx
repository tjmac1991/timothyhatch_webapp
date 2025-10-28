import { ReactElement } from "react";
import PdfViewer from "../pdf-viewer/pdfViewer";
import { Box, Button, Chip, Typography } from "@mui/material";
import { skillsList } from "../../constants/skills.constants";
import { DownloadRounded } from "@mui/icons-material";

function yearsSince(startYear: number, startMonth = 1, startDay = 1): number {
  const now = new Date();
  const start = new Date(startYear, startMonth - 1, startDay);
  let years = now.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (beforeAnniversary) years -= 1;
  return years;
}

export default function About(): ReactElement {
    const startYear = 2015;
    const startMonth = 8;
    const startDay = 15;

    const variant: string = "years";
    const yrs = yearsSince(startYear, startMonth, startDay);
    const sinceText =
        variant === "since"
            ? `Since ${startYear},`
            : `For ${yrs} year${yrs === 1 ? "" : "s"},`;

    // Public asset path (place hatch_resume_2024.pdf in /public)
    const resumeHref = "./Timothy J. Hatch — Resume.pdf";

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
            <Box className="About__text">
                <Typography component="p">
                    Hi, I’m <strong>Timothy Hatch</strong> — a Full-Cycle Developer, gamer, golfer,
                    hockey player, and lifelong tech enthusiast.
                </Typography>

                <Typography component="p">
                    {sinceText} I’ve been bringing projects from <strong>inception to production</strong>,
                    working across a wide range of stacks and technologies. One of my favorite
                    experiences was developing motion control code for a <strong>6-axis robot arm</strong>,
                    bringing automation to life in a 3D environment.
                </Typography>

                <Typography component="p" sx={{ mb: 0 }}>
                    Through my career, I’ve learned that technology is a never-ending landscape — there’s
                    always more to discover. What’s kept me growing is a commitment to <strong>constant learning</strong>,
                    <strong> curiosity</strong>, and knowing how to research and find solutions when the answers
                    aren’t obvious.
                </Typography>
            </Box>

            <Box className="About__download">
                <Button
                    variant="contained"
                    component="a"
                    href={resumeHref}
                    download="Timothy_Hatch_Resume.pdf"
                    startIcon={<DownloadRounded />}
                    aria-label="Download my resume as PDF"
                    >
                    Download Resume
                </Button>
            </Box>

            <PdfViewer file="./Timothy J. Hatch — Resume.pdf" />
        </Box>
    );
}
