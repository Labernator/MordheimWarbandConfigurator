import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { WarriorSheet } from "../components/addWarrior/WarriorSheet";
import { WarriorNameInput } from "../components/Input";
import { MaintainFooter } from "../components/Footer";
import { loadWarrior, resetDelta, addWarrior, removeFunds } from "../redux/slices";
import { WarriorSelection } from "../components/Dropdown";
import { SpellSelection } from "../components/List";
import { PurchaseWeapons } from "../components/Tabstrip";
import { WarriorHeadCountSelection } from "../components/NumberSelector";
import { initialWarrior } from "../types/warrior";
export const AddWarriorPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    useEffect(() => {
        if (!warband.name) {
            navigate("/");
        }
    }, [navigate, warband]);
    const warrior = useAppSelector((state) => state.warrior);
    const delta = useAppSelector((state) => state.delta);
    const deltaFunds = delta.reduce((acc, curr) => acc + (curr.value || 0), 0);
    const enabled = !!warrior.name &&
        warrior.name.length >= 3 &&
        !!(!warrior.rules?.find((rule) => rule.rule === "Wizard" || rule.rule === "Priest") || warrior.spells?.length) &&
        deltaFunds < warband.cash;
    const addWarriorSaga = () => {
        dispatch(addWarrior(warrior));
        dispatch(loadWarrior(initialWarrior))
        dispatch(removeFunds(deltaFunds))
        dispatch(resetDelta())
        navigate("/overview");
    }
    return <React.Fragment>
        <div>
            <h2>Add Warrior</h2>

            <div className="section-container">
                <WarriorNameInput />
                <WarriorSelection />
                {!!warrior.type ?
                    <React.Fragment>
                        {warrior.hero ? null : <WarriorHeadCountSelection />}
                        <WarriorSheet warrior={warrior} />
                        {warrior.equipment ? <PurchaseWeapons /> : null}
                    </React.Fragment> :
                    null}

                {warrior.rules?.find((rule) => rule.rule === "Wizard" || rule.rule === "Priest") ? <SpellSelection /> : null}
            </div>
        </div>
        <MaintainFooter submitAction={addWarriorSaga} isEnabled={enabled} />

    </React.Fragment>;
};


