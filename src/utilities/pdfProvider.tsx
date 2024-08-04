import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportPdf = async (pdfName: string) => {
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
    jsPdf.save(pdfName);
};