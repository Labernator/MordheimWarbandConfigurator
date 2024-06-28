import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from "@fortawesome/free-solid-svg-icons";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const exportPdf = async () => {
    const jsPdf = new jsPDF("landscape", "mm", "a4", true);
    let canvas: HTMLCanvasElement;
    const container = Array.from(document.querySelectorAll(".pdf-container"));
    for (let i = 0; i < container.length; i++) {
        if (i > 0) {
            jsPdf.addPage();
        }
        canvas = await html2canvas(container[i] as unknown as HTMLElement, { scale: 2 });
        jsPdf.addImage(canvas.toDataURL("image/png", 0.5), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight(), undefined, "FAST");
    }
    jsPdf.save('Saurus.pdf');
};

export const NavHeader = () => {

    return <React.Fragment>
        <div className="theme-doc-breadcrumbs breadcrumbsContainer_Z_bl">
            <ul className="breadcrumbs" style={{  listStyleType:"none"}}>

                <li className="breadcrumbs__item" style={{float: "right", cursor: "pointer"}} onClick={() => exportPdf()}><FontAwesomeIcon icon={faPrint} style={{height: "2em", color: "var(--ifm-link-hover-color)"}}/></li>
            </ul>
        </div>
    </React.Fragment>;
};