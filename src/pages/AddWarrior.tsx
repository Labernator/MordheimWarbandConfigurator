import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { WarriorSheet } from "../components/WarriorSheet";
import { WarriorNameInput } from "../components/Input";
import { loadWarrior, resetDelta, addWarrior, removeFunds, updateWarrior } from "../redux/slices";
import { WarriorSelection } from "../components/Dropdown";
import { WarriorHeadCountSelection } from "../components/NumberSelector";
import { initialWarrior } from "../types/warrior";
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
    const deltaFunds = delta.reduce((acc, curr) => acc + (curr.value || 0), 0);
    const enabled = !!warrior.Name &&
        warrior.Name.length >= 3 &&
        !!(!warrior.Rules?.find((rule) => rule.RuleName === "Wizard" || rule.RuleName === "Priest") || warrior.Spells?.length) &&
        deltaFunds < warband.cash;
    const addWarriorSaga = () => {
        dispatch(isMaintenance ? updateWarrior(warrior) : addWarrior(warrior));
        dispatch(loadWarrior(initialWarrior));
        dispatch(removeFunds(deltaFunds));
        dispatch(resetDelta());
        navigate("/overview");
    };
    const cancelAction = () => {
        dispatch(loadWarrior(initialWarrior));
        dispatch(resetDelta());
        navigate("/overview");
    };
    return <React.Fragment>
        <div>
            <h2>{isMaintenance ? "Maintain Warrior" :"Add Warrior"}</h2>

            <div className="section-container">
                {location.state === "maintain" ?
                    null :
                    <React.Fragment>
                        <WarriorNameInput />
                        <WarriorSelection />
                    </React.Fragment>}
                {warrior.WarriorType ?
                    <React.Fragment>
                        {warrior.Hero ? null : <WarriorHeadCountSelection />}
                        <WarriorSheet warrior={warrior} />
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


