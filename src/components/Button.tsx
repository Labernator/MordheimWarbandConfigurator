import { useNavigate } from "react-router-dom";
import { loadWarband, initialWarband } from "../redux/slices/warbandSlice";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { getWarbandMetadata } from "../utilities/dataBaseProvider";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { exportPdf } from "../utilities/pdfProvider";

export const CreateWarbandButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    const faction = warband.faction;
    const name = warband.name;
    const enabled = !!warband.name && warband.name.length >= 3 && !!warband.faction;
    const handleButtonClick = () => {
        dispatch(loadWarband({ ...initialWarband, faction, name, limit: getWarbandMetadata(faction || "").limit }));
        navigate("/overview");
    }
    return <ButtonControl label={"Create warband"} command={handleButtonClick} enabled={enabled} />
};

export const LoadFileButton = () => {
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        document.getElementById("file-uploader")?.click()
        e.preventDefault();
        e.stopPropagation();
    };
    return <ButtonControl label={"Load warband from file"} command={onClickHandler} enabled={true} />
};

export const GeneratePdfButton = () => {
    const nameSelector = useAppSelector((state) => state.pdf.name)
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        exportPdf(nameSelector);
    };
    return <ButtonControl label={"Create PDF"} command={onClickHandler} enabled={!!nameSelector} />
};

export const ButtonControl = ({ label, command, enabled }: { label: string; command: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; enabled?: boolean }) => {
    return <div className={enabled ? "button" : "button disabled"} onClick={(e) => enabled ? command(e) : undefined}>{label}</div>
};
