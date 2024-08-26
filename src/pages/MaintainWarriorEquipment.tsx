import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { loadWarrior, resetDelta, removeFunds, updateWarrior, addWarbandLog, resetLog } from "../redux/slices";
import { WarriorHeadCountSelection } from "../components/warrior/WarriorHeadcount";
import { initialWarrior, IWarrior } from "../types/warrior";
import { useAuth0 } from "@auth0/auth0-react";
import { WarriorIcons } from "../components/warrior/WarriorIcons";
import { EquipmentControl } from "../components/Equipment";
import { WarriorStats } from "../components/warrior/WarriorStats";
import { WarriorHeaderSection } from "../components/warrior/WarriorHeader";
export const MaintaintWarriorEquipmentPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth0();
    const warband = useAppSelector((state) => state.warband);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [navigate, warband]);
    const warrior = useAppSelector((state) => state.tempwarrior);
    const delta = useAppSelector((state) => state.delta);
    const templog = useAppSelector((state) => state.templog);
    const deltaFunds = delta.reduce((acc, curr) => acc + (curr.value || 0), 0);
    const enabled = deltaFunds < warband.cash;
    const addWarriorSaga = () => {
        dispatch(addWarbandLog(templog));
        dispatch(updateWarrior(warrior));
        dispatch(resetLog());
        dispatch(loadWarrior(initialWarrior));
        dispatch(removeFunds(deltaFunds));
        dispatch(resetDelta());
        navigate("/overview");
    };
    const cancelAction = () => {
        dispatch(loadWarrior(initialWarrior));
        dispatch(resetDelta());
        dispatch(resetLog());
        navigate("/overview");
    };
    return <>
        <div>
            <h2>Warrior equipment</h2>

            <div className="section-container">
                    <>
                        {warrior.Hero ? null : <WarriorHeadCountSelection />}
                        <EquipmentWarriorSheet warrior={warrior} />
                    </> 


            </div>
        </div>
        <div className="footer">
            <div style={{ width: "30%" }} className={"dialog-button"} onClick={() => cancelAction()}>{"Cancel"}</div>
            <div style={{ width: "30%", background: "var(--color-ok)", color: "var(--color-ok-font)" }} className={enabled ? "dialog-button" : "dialog-button disabled"} onClick={() => enabled ? addWarriorSaga() : undefined}>{"Confirm"}</div>
        </div>

    </>;
};

export const EquipmentWarriorSheet = ({ warrior }: { warrior: IWarrior }) => {
    return <div className="warrior-card">
        <WarriorHeaderSection givenWarrior={warrior} editEnabled={false} />
        <WarriorStats givenWarrior={warrior} />
        <EquipmentControl currentWarrior={warrior} showShop={true} />
        <WarriorIcons givenWarrior={warrior} />
    </div>;
};
