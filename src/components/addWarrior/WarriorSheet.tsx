import React from "react";
import { IWarrior } from "../../types/warrior";
import { useNavigate } from "react-router-dom";
import { loadWarrior } from "../../redux/slices/warriorSlice";
import { useAppDispatch } from "../../redux/store";
import { EditIcon } from "../render/Icons";

export const HeaderSectionWithEdit = ({ warrior, editEnabled }: { warrior: IWarrior; editEnabled?: boolean }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return <div className="warrior-name-background ">
        <div className="warrior-name">
            <div>{warrior.headCount > 1 ? `${warrior.headCount}x ` : null}{warrior.name}</div>
            <div className="warrior-type">{warrior.type}</div>
        </div>
        {editEnabled !== undefined ?
            <EditIcon onClickHandler={() => {
                dispatch(loadWarrior(warrior));
                navigate("/maintain-warrior");
            }} /> :
            null}
        <div className="unit-cost-bg">
            <div className="unit-cost">{warrior.headCount * warrior.totalCost}<br /><div style={{ fontSize: "0.7em" }}>gc</div></div>
        </div>
    </div>
};

export const WeaponsSection = ({ warrior }: { warrior: IWarrior }) => {
    return warrior.weapons && warrior.weapons.length > 0 ?
            <table className="weapon-table">
                <thead>
                    <tr>
                        <th rowSpan={2} className="text-left">Weapon</th>
                        <th className="text-center">Strength</th>
                        <th colSpan={2} className="text-center">Traits</th>
                    </tr>
                </thead>
                <tbody>
                    {warrior.weapons.map((weapon) => <tr>
                        <td className="text-left">{weapon.quantity > 1 ? `${weapon.quantity}x `: ''} {weapon.weapon}</td>
                        <td>{weapon.strength}</td>
                        <td colSpan={2} className="text-left">{weapon.traits}</td>
                    </tr>)}
                </tbody>
            </table> : null
};

export const StatsSection = ({ unit }: { unit:  IWarrior }) => {
    return <React.Fragment>
        <table className="warrior-stats-table">
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

export const ShortWargearSection = ({ unit }: { unit: IWarrior }) => {
    return unit.wargear && unit.wargear.length > 0 ?
            <tr>
                <td className="unit-card-header">WARGEAR</td>
                <td className="unit-card-text">{unit.wargear.join(", ")}</td>
            </tr> : null
};

export const SkillListsSection = ({ unit }: { unit: IWarrior }) => {
    return <React.Fragment>
        {unit.skills && unit.skills.length > 0 ?
            <tr>
                <td className="unit-card-header">SKILLS</td>
                <td className="unit-card-text">{unit.skills.join(", ")}</td>
            </tr>
            : undefined
        }
    </React.Fragment>
};

export const ShortRulesSection = ({ unit }: { unit: IWarrior }) => {
    return <React.Fragment>
        {unit.rules && unit.rules.length > 0 ?
            <tr>
                <td className="unit-card-header">RULES</td>
                <td className="unit-card-text">{unit.rules.map((rule) => rule.rule).join(", ")}</td>
            </tr> :
            undefined}
    </React.Fragment>
};
export const WarriorTableEntry = ({ list, title }: { list: string[]; title: string }) => {
    return list.length > 0 && title ? <tr>
        <td className="unit-card-header">{title}</td>
        <td className="unit-card-text">{list.join(", ")}</td>
    </tr> : null
}
const getEquipment = (warrior: IWarrior) : string[]=> {
    const weapons = warrior.weapons?.map((weapon) => weapon.quantity > 1 ? `${weapon.quantity}x ${weapon.weapon}` : weapon.weapon) || [];
    const wargear = warrior.wargear || [];
    return weapons.concat(wargear);
}
export const WarriorSheet = ({ warrior, isEditable }: { warrior: IWarrior; isEditable?: boolean }) => {
    return <React.Fragment>
        <div className="dialog-warrior-sheet">
            <HeaderSectionWithEdit warrior={warrior} editEnabled={isEditable} />
            <StatsSection unit={warrior} />
            <table className="warrior-list-section">
                <tbody>
                    <WarriorTableEntry list={warrior.skills || []} title="Skills" />
                    <WarriorTableEntry list={(warrior.rules?.map((rule) => rule.rule) || []).concat(warrior.spells?.map((spell) => spell.name) || [])} title="Rules" />
                    <WarriorTableEntry list={getEquipment(warrior)} title="Equipment" />
                </tbody>
            </table>
        </div>
    </React.Fragment>;
};