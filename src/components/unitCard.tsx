import React from "react";
import { IUnit } from "../staticData";
export const UnitCard = ({ unit }: { unit: IUnit | undefined }) => {
    if (!unit) {
        return <React.Fragment></React.Fragment>;
    }
    const weaponsRenderer = () => {
        return <React.Fragment>
            {unit.weapons ? unit.weapons.map((weapon) => <tr>
                <td className="text-left">{weapon.name}</td>
                <td className="border-left-black">{weapon.range}</td>
                <td>{weapon.strength}</td>
                <td colSpan={2} className="border-left-black text-left">{weapon.traits.join(", ")}</td>
            </tr>) : undefined}
        </React.Fragment>
    };
    return <React.Fragment>
        <div className="warband-card">
            <div className="warband-name-bg">
                <div className="warband-name">
                    <h5 className="d-md-inline-block"><span className="badge badge-light mr-2" id="warband-label"></span>{unit.name}<small className="ml-2">-</small><small className="ml-2">{unit.type}</small> </h5>
                </div>
                <div className="warband-cost-bg">
                    <div className="warband-cost">{unit.cost}<br /><div>gc</div></div>
                </div>
            </div>
            <table className="warband-table warband-stats warband-table-sm mt-2">
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
                        <td>{unit.stats.movement}"</td>
                        <td>{unit.stats.weaponskill}</td>
                        <td>{unit.stats.ballisticskill}</td>
                        <td>{unit.stats.strength}</td>
                        <td>{unit.stats.toughness}</td>
                        <td>{unit.stats.wounds}</td>
                        <td>{unit.stats.initiative}</td>
                        <td>{unit.stats.attacks}</td>
                        <td className="bg-underhive-light">{unit.stats.leadership}</td>
                        <td className="bg-underhive-light">{unit.armour}</td>
                        <td className="bg-underhive-dark" style={{ fontWeight: "bold" }}>{unit.xp}</td>
                    </tr>
                </tbody>
            </table>


            {unit.weapons ?
                <table className="warband-table warband-table-sm warband-table-striped warband-weapons">
                    <thead>
                        <tr>
                            <th rowSpan={2} className="text-left">Weapon</th>
                            <th className="text-center">Range</th>
                            <th className="text-center">Strength</th>
                            <th colSpan={2} className="text-center">Traits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weaponsRenderer()}
                    </tbody>
                </table> : undefined
            }
            <table className="warband-table warband-table-sm mb-2">
                <tbody>
                    {unit.wargear && unit.wargear.length > 0 ?
                        <tr>
                            <td style={{ fontWeight: "bold", width: "20%" }}>WARGEAR</td>
                            <td>{unit.wargear.join(", ")}</td>
                        </tr> : undefined
                    }
                    {unit.skilllists && unit.skilllists.length > 0 ?
                        <tr>
                            <td style={{ fontWeight: "bold", width: "20%" }}>SKILL LISTS</td>
                            <td>{unit.skilllists.join(", ")}</td>
                        </tr>
                        : undefined
                    }
                    {unit.rules && unit.rules.length > 0 ?
                        <tr>
                            <td style={{ fontWeight: "bold", width: "20%" }}>RULES</td>
                            <td>{unit.rules.map((rule) => <div className="warband-rules-section"><strong>{rule.name}</strong>: {rule.text}</div>)}</td>
                        </tr> : undefined
                    }
                </tbody>
            </table>

        </div>
    </React.Fragment>;
};
