import { ILogEntry } from "../redux/slices/logSlice";
import { IWarband } from "../types/warband";
import { getWarbandRating } from "./warbandProvider";

export const saveWarbandToFile = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined, warband: IWarband) => {
    const anchor = document.createElement("a");
    document.body.appendChild(anchor);
    const json = JSON.stringify(warband);
    const blob = new Blob([json], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = `${warband.name} - ${warband.faction} - ${warband.id} (${getWarbandRating(warband.warriors)}).json`;
    anchor.id = "ClickableDownloadAnchor";
    anchor.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(document.getElementById("ClickableDownloadAnchor") as Node);
    e?.preventDefault();
    e?.stopPropagation();
};

export const exportLog = async (e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined, logName: string, log: ILogEntry[]) => {

    const anchor = document.createElement("a");
    document.body.appendChild(anchor);
    const json = JSON.stringify(log);
    const blob = new Blob([json], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = logName;
    anchor.id = "ClickableDownloadAnchor";
    anchor.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(document.getElementById("ClickableDownloadAnchor") as Node);
    e?.preventDefault();
    e?.stopPropagation();
};