import { IWarrior } from "../types/warrior";

export const getWarbandSize = (warriors: IWarrior[]): number => {
    return warriors.reduce((acc, warrior) => {
        acc += warrior.headCount;
        return acc;
    }, 0);
}

export const getRoutLimit = (warriors: IWarrior[]): number => {
    return Math.floor((getWarbandSize(warriors) - 1) / 4) + 1;
}

export const getWarbandRating = (warriors: IWarrior[]): number => {
    return warriors.reduce((acc, warrior) => {
        acc += (warrior.xp + warrior.rating) * warrior.headCount;
        return acc;
    }, 0);
};

export const groupByFighterType = (warriors: IWarrior[]): JSX.Element[] => {
    const mappedUnitTypes = warriors.reduce((acc, warrior) => {
        if (acc.has(warrior.type)) {
            acc.set(warrior.type, (acc.get(warrior.type) || 0) + warrior.headCount);
        } else {
            acc.set(warrior.type, warrior.headCount);
        }
        return acc;
    }, new Map<string, number>());
    const rows = [];
    for (const [key, value] of mappedUnitTypes) {
        rows.push(<tr>
            <td>{key}</td>
            <td>{value}x</td>
        </tr>);
    }
    rows.push(<tr className="table-sumline">
        <td>
            <strong>Total:</strong>
        </td>
        <td>
            <strong>{getWarbandSize(warriors)}</strong>
        </td>
    </tr>)
    return rows;
};
