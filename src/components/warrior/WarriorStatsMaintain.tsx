import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { addDelta, increaseXP, increaseStat } from "../../redux/slices";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IDatabaseEthnicMaximums } from "../../types/database";
import { DataBaseProvider } from "../../utilities/DatabaseProvider";
import { initialWarrior, IWarrior, Stats } from "../../types/warrior";

export const StatsMaintenanceSection = ({givenWarrior}: {givenWarrior?: IWarrior}) => {
    const warrior = givenWarrior || useAppSelector((state) => state.tempwarrior);
    const dispatch = useAppDispatch();
    const getWarriorStat = (input: string) => {
        switch (input) {
            case Stats.M:
                return { warriorStat: warrior.M, max: warrior.Hero ? maximums.M : Math.min(maximums.M, baseline.M + 1) };
            case Stats.W:
                return { warriorStat: warrior.W, max: warrior.Hero ? maximums.W : Math.min(maximums.W, baseline.W + 1) };
            case Stats.WS:
                return { warriorStat: warrior.WS, max: warrior.Hero ? maximums.WS : Math.min(maximums.WS, baseline.WS + 1) };
            case Stats.I:
                return { warriorStat: warrior.I, max: warrior.Hero ? maximums.I : Math.min(maximums.I, baseline.I + 1) };
            case Stats.BS:
                return { warriorStat: warrior.BS, max: warrior.Hero ? maximums.BS : Math.min(maximums.BS, baseline.BS + 1) };
            case Stats.A:
                return { warriorStat: warrior.A, max: warrior.Hero ? maximums.A : Math.min(maximums.A, baseline.A + 1) };
            case Stats.S:
                return { warriorStat: warrior.S, max: warrior.Hero ? maximums.S : Math.min(maximums.S, baseline.S + 1) };
            case Stats.Ld:
                return { warriorStat: warrior.LD, max: warrior.Hero ? maximums.LD : Math.min(maximums.LD, baseline.LD + 1) };
            case Stats.T:
                return { warriorStat: warrior.T, max: warrior.Hero ? maximums.T : Math.min(maximums.T, baseline.T + 1) };
            default:
                throw new Error("Stat not found");
        }
    };
    const [maximums, setMaximums] = useState<IDatabaseEthnicMaximums>({ M: 0, WS: 0, BS: 0, S: 0, T: 0, W: 0, I: 0, A: 0, LD: 0, Ethnicity: warrior.Ethnicity });
    const [baseline, setBaseline] = useState<IWarrior>(initialWarrior);
    useEffect(() => {
        async function fetchMaximums() {
            const DatabaseProviderInstance = await DataBaseProvider.getInstance();
            setMaximums(DatabaseProviderInstance.getEthnicMaximum(warrior.Ethnicity));
            setBaseline(DatabaseProviderInstance.warriors.find((w) => w.WarriorType === warrior.WarriorType) || initialWarrior);
        }
        fetchMaximums();
    }, []);
    return <table className="stats-maintain-table">
            <tbody>
                <tr style={{ fontWeight: "bold" }}>
                    <td>Experience</td>
                    <td style={{ fontWeight: "bold" }}>{warrior.Experience}</td>
                    <td>
                        <FontAwesomeIcon
                            icon={faPlusSquare}
                            className={"stats-icon"}
                            onClick={() => {
                                dispatch(addDelta({ command: "addXP" }));
                                dispatch(increaseXP());
                            }
                            } />
                    </td>
                    <td style={{ fontSize: "0.8em" }}></td>
                </tr>
                {Object.values(Stats).map((stat) => {
                    const stats = getWarriorStat(stat);
                    return <tr key="" >
                        <td>{stat}</td>
                        <td style={{ fontWeight: "bold" }}>{stats.warriorStat}</td>
                        {stats.warriorStat < stats.max ? <><td>
                            <FontAwesomeIcon
                                icon={faPlusSquare}
                                className="stats-icon"
                                onClick={() => {
                                    if (stats.warriorStat < stats.max) {
                                        dispatch(increaseStat(stat));
                                    }
                                }
                                } />
                        </td>
                            <td style={{ fontSize: "0.8em" }}>max. {stats.max}</td>
                        </> : <td colSpan={2} style={{ fontSize: "0.8em" }}>maximized</td>}

                    </tr>;
                })}
            </tbody>
        </table>;
};