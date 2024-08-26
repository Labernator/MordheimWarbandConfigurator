import { faPen, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { loadWarrior } from "../../redux/slices";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IWarrior } from "../../types/warrior";

export const WarriorHeaderSection = ({ givenWarrior, editEnabled }: { givenWarrior?: IWarrior; editEnabled?: boolean }) => {
    const warrior = givenWarrior || useAppSelector((state) => state.tempwarrior);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return <div className="warrior-name-container">
        <div className="warrior-name">
            <div>{warrior.Name}</div>
            <div className="warrior-type">{warrior.HeadCount > 1 ? `${warrior.HeadCount}x ` : null}{warrior.WarriorType}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
            {editEnabled !== undefined ?
                <FontAwesomeIcon style={{ color: "color-mix(in srgb, var(--color-emphasis) 70%, white)" }} icon={faPen} onClick={() => {
                    dispatch(loadWarrior(warrior));
                    navigate("/warrior-main", { state: "maintain" });
                }} /> :
                null}
            <div className="warrior-cost">
                <div style={{ padding: "0em 0.2em 0em 0.5em" }}>{warrior.HeadCount * warrior.TotalCost}</div>
                <FontAwesomeIcon icon={faCoins} style={{ height: "0.7em" }} />
            </div>
        </div>
    </div>;
};