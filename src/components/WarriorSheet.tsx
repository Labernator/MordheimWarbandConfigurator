import { faCoins, faCross, faHatWizard, faMedal, faPen, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { } from "react";
import { useNavigate } from "react-router-dom";
import { loadWarrior } from "../redux/slices/warriorSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IWarrior, Stats } from "../types/warrior";
import { EquipmentControl } from "./Equipment";
import { SpellSelection } from "./ControlList";
import { WarriorIcons } from "./warrior/WarriorIcons";
import { WarriorStats } from "./warrior/WarriorStats";
import { WarriorHeaderSection } from "./warrior/WarriorHeader";

export const OverviewWarriorSheets = () => {
    const warriors = useAppSelector((state) => state.warband.warriors);
    const sortedWarriors = [...warriors].sort((a: IWarrior, b: IWarrior) => a.Position - b.Position);
    return <div className="section-container">
        <div className="header-1">Fighter List</div>
        {sortedWarriors.map((warrior, _index) => <WarriorSheet key="dummy-key" warrior={warrior} isEditable={true} />)}
    </div>;
};


export const WarriorSheet = ({ warrior, isEditable, showShop }: { warrior: IWarrior; isEditable?: boolean; showShop?: boolean }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return <div className="warrior-card">
        <WarriorHeaderSection givenWarrior={warrior} editEnabled={isEditable} />
        <WarriorStats givenWarrior={warrior} />
        <WarriorRules warrior={warrior} />
        {warrior.Rules?.find((rule) => rule.RuleName === "Wizard" || rule.RuleName === "Priest") ? <SpellSelection /> : null}
        <EquipmentControl currentWarrior={warrior} showShop={showShop} />
        <FontAwesomeIcon style={{ color: "color-mix(in srgb, var(--color-emphasis) 70%, white)" }} icon={faPen} onClick={() => {
            dispatch(loadWarrior(warrior));
            navigate("/add-warrior", { state: "maintain" });
        }} />
        <WarriorIcons givenWarrior={warrior} />
    </div>;
};

export const WarriorRules = ({ warrior }: { warrior: IWarrior }) => {
    return <React.Fragment>
        {warrior.Rules?.length ? <div style={{ width: "100%", margin: "0.2em 0.0em", padding: "0em 0em 0.5em 0em", display: "flex", justifyContent: "space-evenly", borderRadius: "0.5em", flexDirection: "column" }}>
            <div style={{ fontSize: "0.75em" }}>Rules</div>
            {(warrior.Rules?.map((rule) => {
                if (rule.RuleName === "Wizard" || rule.RuleName === "Priest") {
                    if (!warrior.Spells || warrior.Spells?.length === 0) {
                        return <div key="dummy-key" style={{ fontWeight: "bold", padding: "0em 0em 0.5em 0em" }}>{`${rule.RuleName}`}</div>;
                    }
                    return <div key="dummy-key" style={{ fontWeight: "bold", padding: "0em 0em 0.5em 0em" }}>{`${rule.RuleName} [${warrior.Spells?.map((spell) => `${spell.SpellName} (${spell.Difficulty})`)}]`}</div>;
                } else {
                    return <div key="dummy-key" style={{ fontWeight: "bold", padding: "0em 0em 0.5em 0em" }}>{`${rule.RuleName}`}</div>;
                }
            }) || [])}
        </div> : null}
    </React.Fragment>;
};
