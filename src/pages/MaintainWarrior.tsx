import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { MaintainFooter } from "../components/Footer";
import { loadWarrior, removeFunds, resetDelta, updateWarrior } from "../redux/slices";
import { initialWarrior } from "../types/warrior";
import { WarriorHeadCountSelection } from "../components/NumberSelector";
import { WarriorSheet } from "../components/addWarrior/WarriorSheet";
import { PurchaseWeapons } from "../components/Tabstrip";
import { InjuriesSelection, SpellSelection, WarriorActions } from "../components/List";

export const MaintainWarriorPage = () => {
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
        dispatch(updateWarrior(warrior));
        dispatch(loadWarrior(initialWarrior))
        dispatch(removeFunds(deltaFunds))
        dispatch(resetDelta())
        navigate("/overview");
    }
    const actionHandler = (selection: string) => {
        setSelectedSection(selection);
    }
    const [selectedSection, setSelectedSection] = useState<string>();
    return <React.Fragment>
        <div>
            <h2>Maintain Warrior</h2>

            <div className="section-container">
                <WarriorActions actionHandler={actionHandler} />
                {!!warrior.type ?
                    <React.Fragment>
                        {warrior.hero ? null : <WarriorHeadCountSelection />}
                        <WarriorSheet warrior={warrior} />
                        {selectedSection === "Purchase Equipment" ? <PurchaseWeapons /> : null}
                        {selectedSection === "Spell Selection" ? <SpellSelection /> : null}
                        {selectedSection === "Add Injuries" ? <InjuriesSelection /> : null}
                    </React.Fragment> :
                    null}
            </div>
        </div>
        <MaintainFooter submitAction={addWarriorSaga} isEnabled={enabled} />

    </React.Fragment>;
};


