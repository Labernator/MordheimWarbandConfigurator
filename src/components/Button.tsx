import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserName } from "../redux/slices/userSlice";
import { loadWarband } from "../redux/slices/warbandSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IUserWarband } from "../types/database";
import { IWarband } from "../types/warband";
import { DataBaseProvider } from "../utilities/DatabaseProvider";
import { exportPdf } from "../utilities/pdfProvider";
import { getWarbandRating } from "../utilities/warbandProvider";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const nameRegex = new RegExp("[a-zA-Z0-9]{3,}");
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
    const userName = useAppSelector((state) => state.user.username);
    const [databaseWarbands, setDatabaseWarbands] = useState<IUserWarband[]>([]);
    const [selectedWarband, setSelectedWarband] = useState<IUserWarband>();
    const myStorage = localStorage;
    const onButtonClickHandler = async () => {
        const DatabaseProviderInstance = await DataBaseProvider.getInstance();
        const response = await DatabaseProviderInstance.searchWarbands(userName || text);
        myStorage.setItem("mordheim-companion-user-id", userName || text);
        dispatch(setUserName(userName || text));
        setDatabaseWarbands(response);
    };
        const [text, setText] = useState<string>("");
        const onChangeHandler = (txt: string) => {
            setText(txt);
        };
    return <React.Fragment>
        {userName ? null : <div className="input-container">
            <label className="input-label">{"Username"}</label>
            <input
                onChange={(e: any) => onChangeHandler(e.target.value)}
                placeholder={"Start typing..." }
                className="input-field" />
                <FontAwesomeIcon icon={nameRegex.test(text) ? faCircleCheck : faCircleXmark} className={nameRegex.test(text) ? "input-icon input-icon-ok" : "input-icon input-icon-not-ok"} />
            </div> }
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
        <ButtonControl label={"Load warband"} command={async () => {
            if (selectedWarband) {
                const warband: IWarband = JSON.parse(selectedWarband?.WarbandJson);
                dispatch(setUserName(selectedWarband.UserId));
                const DatabaseProviderInstance = await DataBaseProvider.getInstance();
                await DatabaseProviderInstance.getWarbandMetadata(warband.faction);
                dispatch(loadWarband(warband));
                navigate("/overview");
            }
            }} enabled={!!selectedWarband} />
        </React.Fragment>
        : <ButtonControl label={"Search warband"} command={onButtonClickHandler} enabled={!!userName || !!text} />}
        
        </React.Fragment>;
};

export const GeneratePdfButton = () => {
    const warband = useAppSelector((state) => state.warband);
    const onClickHandler = () => {
        exportPdf(`${warband.name}-${warband.id}.pdf`);
    };
    return <ButtonControl label={"Create PDF"} command={onClickHandler} enabled={true}/>;
};

export const ButtonControl = ({ label, command, enabled }: { label: string; command: (_e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; enabled?: boolean }) => {
    return <div className={enabled ? "button" : "button disabled"} onClick={() => enabled ? command() : undefined}>{label}</div>;
};

export const SaveButton = () => {
    const warband = useAppSelector((state) => state.warband);
    const user = useAppSelector((state) => state.user);
    const onClickHandler = async () => {
        const DatabaseProviderInstance = await DataBaseProvider.getInstance();
        const warbands = await DatabaseProviderInstance.saveWarband(warband, user);
        console.log(warbands);
    };
    return <ButtonControl label={"Save"} command={onClickHandler} enabled={true} />;
};