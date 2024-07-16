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
                navigate("/warband-overview")
                // e.preventDefault();
                // e.stopPropagation();
            };
            reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
        }}
    />
}

function isMordheimConfigWarband(input: any): input is IWarband {
    return (input as IWarband).name !== undefined && (input as IWarband).faction !== undefined && (input as IWarband).cash !== undefined && (input as IWarband).stash !== undefined && (input as IWarband).warriors !== undefined && (input as IWarband).treasure !== undefined;
}
export const LocalStorageContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const myStorage: string[] = Object.values(localStorage);
    const actualMordheimStorage = myStorage.filter((stateString) => {
        const state: IWarband = JSON.parse(stateString);
        if (!isMordheimConfigWarband(state)) {
            return false;
        }
        return true;
    });
    const handleOnClick = (state: IWarband) => {
        dispatch(loadWarband(state));
        navigate("/warband-overview");
    }
    return <div className="warband-overview" style={{ width: "100%" }}><div className="content-container"><table className="table-striped">
        <thead>
            <tr><td>Warband</td><td>Faction</td><td>Rating</td></tr>
        </thead>
        <tbody>
            {actualMordheimStorage.length > 0 ?
                actualMordheimStorage.map((stateString) => {
                    const state: IWarband = JSON.parse(stateString);
                    return <tr onClick={() => handleOnClick(state)}>
                        <td>{state.name}</td>
                        <td>{state.faction || ""}</td>
                        <td>{getWarbandRating(state.warriors)}</td>
                    </tr>;
                }) :
                <tr><td colSpan={3}>Nothing has been stored yet or you have cleared your cache</td></tr>
            }
        </tbody>
    </table>
    </div>
    </div>;
}