import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { MaintainFooter } from "../components/Footer";
import { loadWarrior, removeFunds, resetDelta, updateWarrior } from "../redux/slices";
import { initialWarrior } from "../types/warrior";
import { WarriorHeadCountSelection } from "../components/warrior/WarriorHeadcount";
import { WarriorSheet } from "../components/WarriorSheet";
// import { PurchaseWeapons } from "../components/Tabstrip";
// import { SpellSelection } from "../components/List";

export const MaintainWarriorPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
        dispatch(updateWarrior(warrior));
        dispatch(loadWarrior(initialWarrior));
        dispatch(removeFunds(deltaFunds));
        dispatch(resetDelta());
        navigate("/overview");
    };
    // const actionHandler = (selection: string) => {
    //     setSelectedSection(selection);
    // };
    // const [selectedSection, setSelectedSection] = useState<string>();
    return <React.Fragment>
        <div>
            <h2>Maintain Warrior</h2>

            <div className="section-container">
                {warrior.WarriorType ?
                    <React.Fragment>
                        {warrior.Hero ? null : <WarriorHeadCountSelection />}
                        <WarriorSheet warrior={warrior} />
                        {/* {selectedSection === "Purchase Equipment" ? <PurchaseWeapons /> : null}
                        {selectedSection === "Spell Selection" ? <SpellSelection /> : null} */}
                    </React.Fragment> :
                    null}
            </div>
        </div>
        <MaintainFooter submitAction={addWarriorSaga} isEnabled={enabled} />

    </React.Fragment>;
};


