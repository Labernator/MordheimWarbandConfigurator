import { useState } from "react";
import { Link } from "react-router-dom";
import { initialWarband, loadWarband, setWarbandName } from "../../redux/slices/warbandSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

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
    return <input
        onChange={(e: any) => onChangeHandler(e.target.value)}
        placeholder="Add Warband Name (min 3 characters)"
        className={isIncorrect ? "warband-input wrong" : "warband-input correct"} />
};

export const WarbandSelector = ({ faction }: { faction: string }) => {
    const dispatch = useAppDispatch();
    const warbandName = useAppSelector((state) => state.warband.name);
    const warband = { ...initialWarband, faction: faction, name: warbandName };
    const getCSSClass = () => {
        switch (faction) {
            case "Cult of the Possessed":
                return "possessed";
            case "Middenheim":
                return "middenheim";
            case "Skaven":
                return "skaven";
            default: return "";
        }
    };
    const onClickHandler = () => {
        dispatch(loadWarband(warband));
    };
    return <Link className="warband-selection" to="/warband-overview" onClick={onClickHandler}>
        <div className="warband-tile-xhBb">
            <div className={`warband-tile-xhBb ${getCSSClass()}`} />
            <h3>{faction}</h3>
        </div>
    </Link>
};
