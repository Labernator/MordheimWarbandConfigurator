import { faCoins, faCross, faHatWizard, faMedal, faPen, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {  } from "react";
import { useNavigate } from "react-router-dom";
import { loadWarrior } from "../redux/slices/warriorSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IWarrior } from "../types/warrior";
import { EquipmentControl } from "./Table";
import { SpellSelection } from "./ControlList";

export const OverviewWarriorSheets = () => {
    const warriors = useAppSelector((state) => state.warband.warriors);
    const sortedWarriors = [...warriors].sort((a: IWarrior, b: IWarrior) => a.Position - b.Position);
    return <div className="section-container">
        <div className="header-1">Fighter List</div>
        {sortedWarriors.map((warrior, _index) => <WarriorSheet key="dummy-key" warrior={warrior} isEditable={true}/>)}
    </div>;
};

export const HeaderSectionWithEdit = ({ warrior, editEnabled }: { warrior: IWarrior; editEnabled?: boolean }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return <div className="warrior-name-container ">
        <div className="warrior-name">
            <div>{warrior.Name}</div>
            <div className="warrior-type">{warrior.HeadCount > 1 ? `${warrior.HeadCount}x ` : null}{warrior.WarriorType}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
            {editEnabled !== undefined ?
                <FontAwesomeIcon style={{color: "color-mix(in srgb, var(--color-emphasis) 70%, white)"}} icon={faPen} onClick={() => {
                    dispatch(loadWarrior(warrior));
                    navigate("/add-warrior", { state: "maintain" });
                }} /> :
                null}
            <div className="warrior-cost">
                <div style={{ padding: "0em 0.2em 0em 0.5em" }}>{warrior.HeadCount * warrior.TotalCost}</div>
                <FontAwesomeIcon icon={faCoins} style={{ height: "0.7em" }} />
            </div>
        </div>
    </div>;
};

export const NewStatsSection = ({ warrior }: { warrior: IWarrior }) => {
    return <React.Fragment>
        <table className="table stats-table">
            <thead>
                <tr>
                    <td>M</td>
                    <td>WS</td>
                    <td>BS</td>
                    <td>S</td>
                    <td>T</td>
                    <td>W</td>
                    <td>I</td>
                    <td>A</td>
                    <td>Ld</td>
                    <td className="focused" style={{ fontWeight: "bold", borderBottom: "0.1em solid white" }}>XP</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{warrior.M}&quot;</td>
                    <td>{warrior.WS}</td>
                    <td>{warrior.BS}</td>
                    <td>{warrior.S}</td>
                    <td>{warrior.T}</td>
                    <td>{warrior.W}</td>
                    <td>{warrior.I}</td>
                    <td>{warrior.A}</td>
                    <td>{warrior.LD}</td>
                    <td className="focused" style={{ fontWeight: "bold", borderBottom: "0.1em solid white" }}>{warrior.Experience}</td>
                </tr>
            </tbody>
        </table>
    </React.Fragment>;
};

export const WarriorSheet = ({ warrior, isEditable }: { warrior: IWarrior; isEditable?: boolean }) => {
    const isLeader = warrior.Rules?.find((rule) => rule.RuleName === "Leader");
    const isPriest = warrior.Rules?.find((rule) => rule.RuleName === "Priest");
    const isWizard = warrior.Rules?.find((rule) => rule.RuleName === "Wizard");
    return <div className="warrior-card">
        <HeaderSectionWithEdit warrior={warrior} editEnabled={isEditable} />
        <NewStatsSection warrior={warrior} />
        <WarriorRules warrior={warrior} />
        {warrior.Rules?.find((rule) => rule.RuleName === "Wizard" || rule.RuleName === "Priest") ? <SpellSelection /> : null}
        <EquipmentControl currentWarrior={warrior} />
        {warrior.Hero ? 
        <div className="warrior-hero-icon">
            {isLeader ? <FontAwesomeIcon icon={faMedal} style={{width:"1.5em"}}  /> : null} 
            {isPriest ? <FontAwesomeIcon icon={faCross} style={{width:"1.5em"}}  /> : null} 
            {isWizard ? <FontAwesomeIcon icon={faHatWizard} style={{width:"1.5em"}}  /> : null} 
            <FontAwesomeIcon icon={faStar} style={{width:"1.5em"}}/>
            </div> : 
            null}
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
                    return <div key="dummy-key"style={{ fontWeight: "bold", padding: "0em 0em 0.5em 0em" }}>{`${rule.RuleName} [${warrior.Spells?.map((spell) => `${spell.SpellName} (${spell.Difficulty})`)}]`}</div>;
                } else {
                    return <div key="dummy-key" style={{ fontWeight: "bold", padding: "0em 0em 0.5em 0em" }}>{`${rule.RuleName}`}</div>;
                }
            }) || [])}
        </div> : null}
    </React.Fragment>;
};
