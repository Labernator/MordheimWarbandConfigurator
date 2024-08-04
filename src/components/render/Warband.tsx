import { Link } from "react-router-dom";
import { initialWarband, loadWarband } from "../../redux/slices/warbandSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";


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
    return <Link className="warband-selection" to="/overview" onClick={onClickHandler}>
        <div className="warband-tile-xhBb">
            <div className={`warband-tile-xhBb ${getCSSClass()}`} />
            <h3>{faction}</h3>
        </div>
    </Link>
};
