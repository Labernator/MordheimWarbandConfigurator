import { useEffect, useState } from "react";
import {  initialWarband, loadWarband, setWarbandFaction, setWarbandName } from "../../redux/slices/warbandSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getWarbandMetadata, getWarbands } from "../../utilities/dataBaseProvider";
import { IDatabaseWarband } from "../../types/database";
import { useNavigate } from "react-router-dom";
import { isMordheimConfigWarband, IWarband } from "../../types/warband";
import { getWarbandRating } from "../../utilities/warbandProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faArrowRight, faCircle, faCircleXmark, faX } from "@fortawesome/free-solid-svg-icons";

export const WarbandNameInput = () => {
    const dispatch = useAppDispatch();
    const [isIncorrect, setIsIncorrect] = useState<boolean>(true);
    const onChangeHandler = (txt: string) => {
        if (txt.length < 3) {
            setIsIncorrect(true);
            dispatch(setWarbandName(""));
        } else {
            setIsIncorrect(false);
            dispatch(setWarbandName(txt));
        }
    };
    return <div style={{paddingTop: "1em"}}className="name-input-container"><div style={{width: "100%"}}><input
        onChange={(e: any) => onChangeHandler(e.target.value)}
        placeholder="Warband Name *"
        className={`input input-dimensions ${isIncorrect ? "wrong" : "correct"}`} ></input><FontAwesomeIcon icon={faCircleXmark} className="input-icon" style={{color: "red"}}/></div>
        <div className="name-info-text">* required (min. 3 Characters)</div></div>
};

export const WarbandDropdown = () => {
    const dispatch = useAppDispatch();
    const warbandOptions = getWarbands();
    const onChangeHandler = (faction: string) => {
        setSelectedWarband(getWarbandMetadata(faction));
        dispatch(setWarbandFaction(faction));
    };
    useEffect(() => {
        dispatch(setWarbandFaction(warbandOptions[0].faction));
    }, []);
    const [selectedWarband, setSelectedWarband] = useState<IDatabaseWarband>(warbandOptions[0]);
    return <select
        value={selectedWarband.faction}
        onChange={(e) => onChangeHandler(e.target.value)}
        className="input input-dropdown">
        {warbandOptions.map((item) => <option key={item.faction} label={`${item.faction} (max. ${item.limit} warrior)`} value={item.faction}></option>)}
    </select>
};

export const SelectWarbandButton = () => {
    const warband = useAppSelector((state) => state.warband);
    const faction = warband.faction;
    const name = warband.name;
    const enabled = !!warband.name && warband.name.length >= 3 && !!warband.faction;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const submit = () => {
        dispatch(loadWarband({...initialWarband, faction, name, limit: getWarbandMetadata(faction || "").limit}));
        navigate("/overview");
    };
    return <div className={`create-button ${enabled ? "enabled" : "disabled"}`} onClick={submit}>
        <div>
            <div>Create warband</div>
            <div style={{fontSize: "0.7em"}}>{faction}</div>
            </div>
            <FontAwesomeIcon icon={faAngleRight}/>
    </div>
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
        navigate("/overview");
    }

    return <div className="modern-container" style={{ width: "100%" }}>
        <div className="content-container">
            <table className="modern-table">
                <thead>
                    <tr>
                        <td>Warband</td>
                        <td>Faction</td>
                        <td>Rating</td>
                    </tr>
                </thead>
                <tbody>
                    {actualMordheimStorage.length > 0 ?
                        actualMordheimStorage.map((stateString) => {
                            const state: IWarband = JSON.parse(stateString);
                            const rating = getWarbandRating(state.warriors);
                            return <tr onClick={() => handleOnClick(state)} key={`${state.name}${rating}`}>
                                <td>{state.name}</td>
                                <td>{state.faction || ""}</td>
                                <td>{rating}</td>
                            </tr>;
                        }) :
                        <tr><td colSpan={3}>Nothing has been stored yet or you have cleared your cache</td></tr>
                    }
                </tbody>
            </table>
        </div>
    </div>;
}

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
                navigate("/overview")
            };
            reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
        }}
    />
}