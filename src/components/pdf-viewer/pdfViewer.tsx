import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, Card, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

type tPdfViewerProps = {
    file: string;
}
export default function PdfViewer({file}: tPdfViewerProps): ReactElement {
    const theme = useTheme();
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageHeight, setPageHeight] = useState<number>(0);

    useEffect(() => {
        setNumPages(0);
        setPageNumber(1);
        setPageHeight(0);
    }, [file]);

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
        <Box className="PdfViewer">
            <Card className="PdfViewer__card">
                <Box
                    className="PdfViewer__document"
                    sx={{ minHeight: pageHeight || undefined }}
                >
                    <Document
                        file={file}
                        onLoadSuccess={({ numPages: loadedPageCount }) => setNumPages(loadedPageCount)}
                    >
                        <Page
                            className="PdfViewer__page"
                            onRenderSuccess={page => setPageHeight(page.getViewport({ scale }).height)}
                            renderAnnotationLayer={false}
                            scale={scale}
                            pageNumber={pageNumber} />
                    </Document>
                </Box>
                {numPages > 1 && (
                    <Box className="PdfViewer__controls">
                        <IconButton
                            aria-label="Previous PDF page"
                            disabled={pageNumber <= 1}
                            onClick={() => setPageNumber(currentPage => currentPage - 1)}
                        >
                            <ArrowBackIosNew />
                        </IconButton>
                        <Typography aria-live="polite" component="span">
                            Page {pageNumber} of {numPages}
                        </Typography>
                        <IconButton
                            aria-label="Next PDF page"
                            disabled={pageNumber >= numPages}
                            onClick={() => setPageNumber(currentPage => currentPage + 1)}
                        >
                            <ArrowForwardIos />
                        </IconButton>
                    </Box>
                )}
            </Card>
        </Box>
    );
}
