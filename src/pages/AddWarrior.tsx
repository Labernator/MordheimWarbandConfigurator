import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { WarriorSheet } from "../components/WarriorSheet";
import { loadWarrior, resetDelta, addWarrior, removeFunds, updateWarrior, addWarbandLog, resetLog } from "../redux/slices";
import { WarriorSelection } from "../components/Dropdown";
import { WarriorHeadCountSelection } from "../components/warrior/WarriorHeadcount";
import { initialWarrior } from "../types/warrior";
import { StatsMaintenanceSection } from "../components/warrior/WarriorStatsMaintain";
import { WarriorNameInput } from "../components/warrior/WarriorName";
export const AddWarriorPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isMaintenance = location.state === "maintain";
    const warband = useAppSelector((state) => state.warband);
    useEffect(() => {
        if (!warband.name) {
            navigate("/");
        }
    }, [navigate, warband]);
    const warrior = useAppSelector((state) => state.tempwarrior);
    const delta = useAppSelector((state) => state.delta);
    const templog = useAppSelector((state) => state.templog);
    const deltaFunds = delta.reduce((acc, curr) => acc + (curr.value || 0), 0);
    const enabled = !!warrior.Name &&
        warrior.Name.length >= 3 &&
        !!(!warrior.Rules?.find((rule) => rule.RuleName === "Wizard" || rule.RuleName === "Priest") || warrior.Spells?.length) &&
        deltaFunds < warband.cash;
    const addWarriorSaga = () => {

        if (isMaintenance) {
            dispatch(addWarbandLog(templog));
            dispatch(updateWarrior(warrior));
        } else {
            dispatch(addWarbandLog([...templog, {command: "Add warrior", value: `${warrior.Name} | ${warrior.HeadCount > 1 ? `${warrior.HeadCount}x ` : ""}${warrior.WarriorType}`, cost: warrior.Cost}]));
            dispatch(addWarrior(warrior));
            dispatch(resetLog());
        }
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
    return <React.Fragment>
        <div>
            <h2>{isMaintenance ? "Maintain Warrior" :"Add Warrior"}</h2>

            <div className="section-container">
                {location.state === "maintain" ?
                    <StatsMaintenanceSection/> :
                    <React.Fragment>
                        <WarriorNameInput />
                        <WarriorSelection />
                    </React.Fragment>}
                {warrior.WarriorType ?
                    <React.Fragment>
                        {warrior.Hero ? null : <WarriorHeadCountSelection />}
                        <WarriorSheet warrior={warrior} showShop={true} />
                    </React.Fragment> :
                    null}


            </div>
        </div>
        <div className="footer">
            <div style={{ width: "30%" }} className={"dialog-button"} onClick={(_e) => cancelAction()}>{"Cancel"}</div>
            <div style={{ width: "30%", background: "var(--color-ok)", color: "var(--color-ok-font)" }} className={enabled ? "dialog-button" : "dialog-button disabled"} onClick={(_e) => enabled ? addWarriorSaga() : undefined}>{"Confirm"}</div>
        </div>

    </React.Fragment>;
};


