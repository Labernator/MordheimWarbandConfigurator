import { useNavigate } from "react-router-dom";
import { loadWarband } from "../redux/slices";
import { useAppDispatch } from "../redux/store";
import { IWarband } from "../types/warband";
import { DataBaseProvider } from "../utilities/DatabaseProvider";

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
            reader.onload = async (ev: ProgressEvent<FileReader>) => {
                const warband: IWarband = JSON.parse(ev.target?.result as string);
                const DatabaseProviderInstance = await DataBaseProvider.getInstance();
                await DatabaseProviderInstance.getWarbandMetadata(warband.faction);
                dispatch(loadWarband(warband));
                navigate("/overview");
            };
            reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
        }}
    />;
};