import { Box, Card, useMediaQuery, useTheme } from "@mui/material";
import { ReactElement } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

export default function About(): ReactElement {
    const theme = useTheme();

    const lgScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const mdLgScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const smMdScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

    let scale = 1.5;
    if(lgScreen) scale = 1.5
    else if(mdLgScreen) scale = 1
    else if(smMdScreen) scale = 0.75
    else if(smScreen) scale = 0.5

    return (
        <Box className="About">
            <Card className="About__card">
                <Document file="./hatch_resume_2024.pdf">
                    <Page
                        className="About__page"
                        renderAnnotationLayer={false}
                        scale={scale}
                        pageNumber={1} />
                </Document>
            </Card>
        </Box>
    );
}
