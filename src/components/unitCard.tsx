import React from "react";
import { IWarrior } from "../types/warrior";
import { WeaponsSection } from "./render/UnitCard";
export const UnitCard = ({ unit }: { unit: IWarrior | undefined }) => {
    if (!unit) {
        return <React.Fragment></React.Fragment>;
    }
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
                        <td>{unit.M}"</td>
                        <td>{unit.WS}</td>
                        <td>{unit.BS}</td>
                        <td>{unit.S}</td>
                        <td>{unit.T}</td>
                        <td>{unit.W}</td>
                        <td>{unit.I}</td>
                        <td>{unit.A}</td>
                        <td className="bg-underhive-light">{unit.Ld}</td>
                        <td className="bg-underhive-light">{/*unit.armour*/ 0}</td>
                        <td className="bg-underhive-dark" style={{ fontWeight: "bold" }}>{unit.xp}</td>
                    </tr>
                </tbody>
            </table>

            {/* <WeaponsSection warrior={unit} /> */}
            <table className="warband-table warband-table-sm mb-2">
                <tbody>
                    {unit.wargear && unit.wargear.length > 0 ?
                        <tr>
                            <td style={{ fontWeight: "bold", width: "20%" }}>WARGEAR</td>
                            <td>{unit.wargear.join(", ")}</td>
                        </tr> : undefined
                    }
                    {unit.skills && unit.skills.length > 0 ?
                        <tr>
                            <td style={{ fontWeight: "bold", width: "20%" }}>SKILL LISTS</td>
                            <td>{unit.skills.join(", ")}</td>
                        </tr>
                        : undefined
                    }
                    {unit.rules && unit.rules.length > 0 ?
                        <tr>
                            <td style={{ fontWeight: "bold", width: "20%" }}>RULES</td>
                            {/* <td>{unit.rules.map((rule) => <div className="warband-rules-section"><strong>{rule.name}</strong>: {rule.text}</div>)}</td> */}
                        </tr> : undefined
                    }
                </tbody>
            </table>

        </div>
    </React.Fragment>;
};
