import { ReactElement } from "react";
import PdfViewer from "../pdf-viewer/pdfViewer";


export default function About(): ReactElement {

    return (
        <PdfViewer file="./hatch_resume_2024.pdf" />
    );
}
