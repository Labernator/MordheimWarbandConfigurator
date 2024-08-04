import { useNavigate } from "react-router-dom";
import { loadWarband } from "../redux/slices/warbandSlice";
import { useAppDispatch } from "../redux/store";
import { IWarband, isMordheimConfigWarband } from "../types/warband";
import { getWarbandRating } from "../utilities/warbandProvider";
import React, { useState } from "react";
import { ButtonControl } from "./Button";

export const LocalStorageControl = () => {
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
    const handleOnClick = () => {
        if (selectedStorage) {
            dispatch(loadWarband(selectedStorage));
            navigate("/overview");
        }
    }
    const [selectedStorage, setSelectedStorage] = useState<IWarband>();
    return <React.Fragment><table className="table">
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
                            const className = selectedStorage?.name === state.name && rating === getWarbandRating(selectedStorage.warriors) ? "focused" : "";
                            return <tr onClick={() => setSelectedStorage(state)} key={`${state.name}${rating}`}>
                                <td className={className}>{state.name}</td>
                                <td className={className}>{state.faction || ""}</td>
                                <td className={className}>{rating}</td>
                            </tr>;
                        }) :
                        <tr><td colSpan={3}>Nothing has been stored yet or you have cleared your cache</td></tr>
                    }
                </tbody>
            </table>
            <ButtonControl label={"Load selected warband"} command={handleOnClick} enabled={!!selectedStorage}/>
            </React.Fragment>
}