import { useNavigate } from "react-router-dom";
import { loadWarband } from "../redux/slices/warbandSlice";
import { useAppDispatch } from "../redux/store";
import { IWarband } from "../types/warband";
import { getWarbandRating } from "./warbandProvider";

export const saveWarbandToFile = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, warband: IWarband) => {
    const anchor = document.createElement("a");
    document.body.appendChild(anchor);
    const json = JSON.stringify(warband);
    const blob = new Blob([json], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = `${warband.name} - ${warband.faction} (${getWarbandRating(warband.warriors)}).json`;
    anchor.id = "ClickableDownloadAnchor";
    anchor.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(document.getElementById("ClickableDownloadAnchor") as Node);
    const myStorage = localStorage;
    myStorage.setItem(`${warband.name} - ${warband.faction} (${getWarbandRating(warband.warriors)})`, json);
    e.preventDefault();
    e.stopPropagation();
};
