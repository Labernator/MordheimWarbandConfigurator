import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadWarband } from "../redux/slices/warbandSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IUserWarband } from "../types/database";
import { IWarband } from "../types/warband";
import { DataBaseProvider } from "../utilities/DatabaseProvider";
import { exportPdf } from "../utilities/pdfProvider";
import { getWarbandRating } from "../utilities/warbandProvider";
import { saveWarbandToFile } from "../utilities/fileOperations";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
export const LoadFileButton = () => {
    const onClickHandler = (_e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        document.getElementById("file-uploader")?.click();
        _e?.preventDefault();
        _e?.stopPropagation();
    };
    return <ButtonControl label={"Warband JSON"} command={onClickHandler} enabled={true} />;
};

export const LookForButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAuth0();
    const [databaseWarbands, setDatabaseWarbands] = useState<IUserWarband[]>([]);
    const [selectedWarband, setSelectedWarband] = useState<IUserWarband>();
    const onButtonClickHandler = async () => {
        const DatabaseProviderInstance = await DataBaseProvider.getInstance();
        const response = await DatabaseProviderInstance.searchWarbands(user?.email || "");
        setDatabaseWarbands(response);
    };
    return <React.Fragment>
        {databaseWarbands.length > 0 ?
            <React.Fragment><table className="table">
                <thead>
                    <tr>
                        <td>Warband</td>
                        <td>Faction</td>
                        <td>Rating</td>
                    </tr>
                </thead>
                <tbody>
                    {databaseWarbands.map((warband) => {
                        const warbandState: IWarband = JSON.parse(warband.WarbandJson);
                        const rating = getWarbandRating(warbandState.warriors);
                        const className = selectedWarband?.WarbandId === warband.WarbandId ? "focused" : "";
                        return <tr key="dummy-key" onClick={() => setSelectedWarband(warband)}>
                            <td className={className}>{warbandState.name}</td>
                            <td className={className}>{warbandState.faction || ""}</td>
                            <td className={className}>{rating}</td>
                        </tr>;
                    })
                    }
                </tbody>
            </table>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div
                    className={selectedWarband ? "delete-button" : "delete-button disabled"}
                    onClick={async () => {
                        if (selectedWarband) {
                            const warband: IWarband = JSON.parse(selectedWarband?.WarbandJson);
                            const DatabaseProviderInstance = await DataBaseProvider.getInstance();
                            await DatabaseProviderInstance.deleteWarband(warband.id);
                            await onButtonClickHandler();
                            setSelectedWarband(undefined);
                        }
                    }}>
                    {"Delete"}
                </div>
                <ButtonControl label={"Load warband"} command={async () => {
                    if (selectedWarband) {
                        const warband: IWarband = JSON.parse(selectedWarband?.WarbandJson);
                        const DatabaseProviderInstance = await DataBaseProvider.getInstance();
                        await DatabaseProviderInstance.getWarbandMetadata(warband.faction);
                        dispatch(loadWarband(warband));
                        navigate("/overview");
                    }
                }} enabled={!!selectedWarband} />
                </div>
            </React.Fragment>
            : <div className="button-container-right">
                <ButtonControl label={"Search warband"} command={onButtonClickHandler} enabled={!!user?.email} />
                </div>}

    </React.Fragment>;
};

export const GeneratePdfButton = () => {
    const warband = useAppSelector((state) => state.warband);
    const onClickHandler = () => {
        exportPdf(`${warband.name}-${warband.id}.pdf`);
    };
    return <ButtonControl label={"Create PDF"} command={onClickHandler} enabled={true} />;
};

export const ButtonControl = ({ label, command, enabled }: { label: string; command: (_e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; enabled?: boolean }) => {
    return <div className={enabled ? "button" : "button disabled"} onClick={() => enabled ? command() : undefined}>{label}</div>;
};

export const SaveButton = () => {
    const warband = useAppSelector((state) => state.warband);
    const { user } = useAuth0();
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const onClickHandler = async () => {
        const DatabaseProviderInstance = await DataBaseProvider.getInstance();
        const response = await DatabaseProviderInstance.saveWarband(warband, user?.email || "");
        if (response.success) {
            setShowSuccess(true);
        }
    };
    return <>
    <ButtonControl label={"Save"} command={onClickHandler} enabled={true} />
    {showSuccess ? <div style={{display: "flex"}}><FontAwesomeIcon className="input-icon-ok" icon={faCircleCheck} /><div style={{paddingLeft: "1em"}}>Warband saved successfully.</div></div> : null}
    </>;
};

export const ExportWarbandButton = () => {
    const warband = useAppSelector((state) => state.warband);
    const onClickHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
        saveWarbandToFile(e, warband);
    };
    return <ButtonControl label={"Export"} command={(e) => onClickHandler(e)} enabled={true} />;
};