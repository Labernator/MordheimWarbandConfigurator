import { useNavigate } from "react-router-dom";
import { loadWarband } from "../redux/slices";
import { useAppDispatch } from "../redux/store";
import { IWarband } from "../types/warband";
import { getWarbandRating } from "../utilities/warbandProvider";
import React from "react";

export const WarbandLoader = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return <input
        id="file-uploader"
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={() => {
            const reader = new FileReader();
            reader.onload = (ev: ProgressEvent<FileReader>) => {
                const warband: IWarband = JSON.parse(ev.target?.result as string);
                dispatch(loadWarband(warband));
                const myStorage = localStorage;
                myStorage.setItem(`${warband.name} - ${warband.faction} (${getWarbandRating(warband.warriors)})`, JSON.stringify(warband));
                navigate("/overview");
            };
            reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
        }}
    />;
};