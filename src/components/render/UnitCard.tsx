import { faBoxArchive, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { addFunds, addWeaponToStash } from "../../redux/slices/warbandSlice";
import { removeWeapon } from "../../redux/slices/warriorSlice";
import { useAppDispatch } from "../../redux/store";
import { IFullEquipment, IWarrior } from "../../types/warrior";

export const HeaderSection = ({ unit, isPdf }: { unit: IWarrior; isPdf?: boolean }) => {
    return <div className="unit-name-bg">
        <div className={isPdf ? "pdf-unit-name" : "unit-name"}>{unit.name} - <small>{unit.type}</small></div>
        <div className={isPdf ? "pdf-unit-cost-bg" : "unit-cost-bg"}>
            <div className={isPdf ? "pdf-unit-cost" : "unit-cost"}>{unit.cost}<br /><div style={{ fontSize: isPdf ? "0.7em" : "0.7em" }}>gc</div></div>
        </div>
    </div>
};

export const WeaponsSection = ({ warrior }: { warrior: IWarrior }) => {
    const weapons = warrior.weapons?.filter((weapon) => weapon.type !== "Wargear");
    return <React.Fragment>
        {weapons && weapons.length > 0 ?
            <table className="unit-table unit-table-striped unit-weapons">
                <thead>
                    <tr>
                        <th rowSpan={2} className="text-left">Weapon</th>
                        <th className="text-center">Range</th>
                        <th className="text-center">Strength</th>
                        <th colSpan={2} className="text-center">Traits</th>
                    </tr>
                </thead>
                <tbody>
                    {weapons.map((weapon) => <tr>
                        <td className="text-left">{weapon.quantity > 1 ? `${weapon.quantity}x `: ''} {weapon.weapon}</td>
                        <td>{weapon.range || "Melee"}</td>
                        <td>{weapon.strength}</td>
                        <td colSpan={2} className="text-left">{weapon.traits}</td>
                    </tr>)}
                </tbody>
            </table> : undefined
        }
    </React.Fragment>
};

export const MaintainWeaponsSection = ({ warrior }: { warrior: IWarrior }) => {
    const dispatch = useAppDispatch();
    const sellWeaponHandler = (weapon: IFullEquipment) => {
        dispatch(removeWeapon(weapon));
        dispatch(addFunds(Math.floor(weapon.price / 2)));
    };
    const moveWeaponHandler = (weapon: IFullEquipment) => {
        dispatch(removeWeapon(weapon));
        dispatch(addWeaponToStash(weapon));
    };
    return <React.Fragment>
        {warrior.weapons && warrior.weapons.length > 0 ?
            <table className="unit-table unit-table-striped unit-weapons">
                <thead>
                    <tr>
                        <th rowSpan={2} className="text-left">Weapon</th>
                        <th className="text-center">Commands</th>
                    </tr>
                </thead>
                <tbody>
                    {warrior.weapons.map((weapon) => <tr>
                        <td className="text-left">{weapon.quantity > 1 ? `${weapon.quantity}x `: ''} {weapon.weapon}</td>
                        <td >
                            <FontAwesomeIcon icon={faDollarSign} className="weapon-maintain-command-icon" onClick={() => sellWeaponHandler(weapon)}/>
                            <FontAwesomeIcon icon={faBoxArchive} className="weapon-maintain-command-icon" onClick={() => moveWeaponHandler(weapon)}/>
                        </td>
                    </tr>)}
                </tbody>
            </table> : undefined
        }
    </React.Fragment>
};

export const StatsSection = ({ unit }: { unit:  IWarrior }) => {
    return <React.Fragment>
        <table className="unit-table unit-stats">
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
    const wargear = unit.weapons?.filter((weapon) => weapon.type === "Wargear");
    return wargear && wargear?.length > 0 ?
            <tr>
                <td className="unit-card-header">WARGEAR</td>
                <td className="unit-card-text">{wargear.map((gear) => gear.weapon).join(", ")}</td>
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

export const DetailedRulesSection = ({ unit }: { unit: IWarrior }) => {
    return <React.Fragment>
        {unit.rules && unit.rules.length > 0 ?
            <tr>
                <td className="unit-card-header">RULES</td>
                <td className="unit-card-text">{unit.rules.map((rule) => <div className="unit-rules-section"><strong>{rule.rule}</strong>: {rule.effect}</div>)}</td>
            </tr> :
            undefined}
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

export const RulesSection = ({ unit }: { unit: IWarrior }) => {
    return <React.Fragment>
        {unit.rules && unit.rules.length > 0 ?
            <tr>
                <td className="unit-card-header">RULES</td>
                <td className="unit-card-text">{unit.rules.map((rule) => <div className="warband-rules-section">
                    <strong>{rule.rule}</strong>: {rule.rule === "Wizard" || rule.rule === "Priest" ? `${unit.spells?.map((spell) => `${spell.name} (Difficulty ${spell.difficulty}) - ${spell.effect}`)}` : rule.effect}</div>)}</td>
            </tr> :
            undefined}
    </React.Fragment>
};