import React from "react";
import { IWarrior } from "../../types/warrior";
import { useNavigate } from "react-router-dom";
import { loadWarrior } from "../../redux/slices/warriorSlice";
import { useAppDispatch } from "../../redux/store";
import { EditIcon } from "../render/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMedal } from "@fortawesome/free-solid-svg-icons";

export const HeaderSectionWithEdit = ({ warrior, editEnabled }: { warrior: IWarrior; editEnabled?: boolean }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return <div className="warrior-name-container ">
        <div className="warrior-name">
            <div>{warrior.name}</div>
            <div className="warrior-type">{warrior.headCount > 1 ? `${warrior.headCount}x ` : null}{warrior.type}</div>
        </div>
        <div style={{    display: "flex", alignItems: "center"}}>
        {editEnabled !== undefined ?
            <EditIcon onClickHandler={() => {
                dispatch(loadWarrior(warrior));
                navigate("/maintain-warrior");
            }} /> :
            null}
        <div className="warrior-cost">
                <div style={{ padding: "0em 0.2em 0em 0.5em"}}>{warrior.headCount * warrior.totalCost}</div>
                <FontAwesomeIcon icon={faCoins} style={{height: "0.7em"}}/>
        </div>
        </div>
    </div>
};

export const StatsSection = ({ unit }: { unit: IWarrior }) => {
    return <React.Fragment>
        <table className="table">
            <thead>
                <tr>
                    <th>M</th>
                    <th>WS</th>
                    <th>BS</th>
                    <th>S</th>
                    <th>T</th>
                    <th>W</th>
                    <th>I</th>
                    <th>A</th>
                    <th className="bg-underhive-light">Ld</th>
                    <th className="bg-underhive-light">AS</th>
                    <th className="bg-underhive-dark">XP</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{unit.M}"</td>
                    <td>{unit.WS}</td>
                    <td>{unit.BS}</td>
                    <td>{unit.S}</td>
                    <td>{unit.T}</td>
                    <td>{unit.W}</td>
                    <td>{unit.I}</td>
                    <td>{unit.A}</td>
                    <td className="bg-underhive-light">{unit.Ld}</td>
                    <td className="bg-underhive-light">{/*unit.armour ||*/ "-"}</td>
                    <td className="bg-underhive-dark" style={{ fontWeight: "bold" }}>{unit.xp}</td>
                </tr>
            </tbody>
        </table>
    </React.Fragment>
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
                    <td className="focused">XP</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{warrior.M}"</td>
                    <td>{warrior.WS}</td>
                    <td>{warrior.BS}</td>
                    <td>{warrior.S}</td>
                    <td>{warrior.T}</td>
                    <td>{warrior.W}</td>
                    <td>{warrior.I}</td>
                    <td>{warrior.A}</td>
                    <td>{warrior.Ld}</td>
                    <td className="focused" style={{ fontWeight: "bold" }}>{warrior.xp}</td>
                </tr>
            </tbody>
        </table>
    </React.Fragment>
};


export const ShortWargearSection = ({ unit }: { unit: IWarrior }) => {
    return unit.wargear && unit.wargear.length > 0 ?
        <tr>
            <td>WARGEAR</td>
            <td>{unit.wargear.join(", ")}</td>
        </tr> : null
};

export const SkillListsSection = ({ unit }: { unit: IWarrior }) => {
    return <React.Fragment>
        {unit.skills && unit.skills.length > 0 ?
            <tr>
                <td>SKILLS</td>
                <td>{unit.skills.join(", ")}</td>
            </tr>
            : undefined
        }
    </React.Fragment>
};

export const ShortRulesSection = ({ unit }: { unit: IWarrior }) => {
    return <React.Fragment>
        {unit.rules && unit.rules.length > 0 ?
            <tr>
                <td>RULES</td>
                <td>{unit.rules.map((rule) => rule.rule).join(", ")}</td>
            </tr> :
            undefined}
    </React.Fragment>
};
export const WarriorTableEntry = ({ list, title }: { list: string[]; title: string }) => {
    return list.length > 0 && title ? <tr>
        <td>{title}</td>
        <td >{list.join(", ")}</td>
    </tr> : null
}
const getEquipment = (warrior: IWarrior): string[] => {
    const weapons = warrior.weapons?.map((weapon) => weapon.quantity > 1 ? `${weapon.quantity}x ${weapon.weapon}` : weapon.weapon) || [];
    const wargear = warrior.wargear || [];
    return weapons.concat(wargear);
}
export const WarriorSheet = ({ warrior, isEditable }: { warrior: IWarrior; isEditable?: boolean }) => {
    return <div className="warrior-card">
            <HeaderSectionWithEdit warrior={warrior} editEnabled={isEditable} />
            {/* <StatsSection unit={warrior} /> */}
            <NewStatsSection warrior={warrior}/>
            <table className="warrior-list-section">
                <tbody>
                    {/* <WarriorTableEntry list={warrior.skills || []} title="Skills" /> */}
                    <WarriorTableEntry list={(warrior.rules?.map((rule) => {
                        if (rule.rule === "Wizard" || rule.rule === "Priest") {
                            return `${rule.rule} [${warrior.spells?.map((spell) => `${spell.name} (${spell.difficulty})`)}]`
                        } else {
                            return rule.rule
                        }
                    }) || [])} title="Rules" />
                    <WarriorTableEntry list={getEquipment(warrior)} title="Equipment" />
                </tbody>
            </table>
            {warrior.hero ? <FontAwesomeIcon icon={faMedal} className="warrior-hero-icon"/> : null}
    </div>;
};