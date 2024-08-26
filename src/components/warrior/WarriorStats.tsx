import { useAppSelector } from "../../redux/store";
import { IWarrior, Stats } from "../../types/warrior";

export const WarriorStats = ({givenWarrior}: {givenWarrior?: IWarrior}) => {
    const warrior = givenWarrior || useAppSelector((state) => state.tempwarrior);
    return <table className="table stats-table">
            <thead>
                <tr>
                    {Object.keys(Stats).map((stat) => <td key={stat}>{stat}</td>)}
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
        </table>;
};