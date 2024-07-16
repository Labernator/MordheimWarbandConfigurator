import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { IWarrior } from "../types/warrior";

export const WarbandInfo = () => {
    const warband = useAppSelector((state) => state.warband);
    return <table className="table-striped">
        <thead>
            <tr>
                <td colSpan={2}>Warband Information</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Warband Type</td>
                <td>{warband.faction}</td>
            </tr>
            <tr>
                <td>Warchest</td>
                <td>{warband.cash}</td>
            </tr>
            <tr>
                <td>Warband Rating</td>
                <td>{getWarbandRating(warband.warriors)}</td>
            </tr>
            <tr>
                <td>Treasures</td>
                <td>{warband.treasure}</td>
            </tr>
            <tr>
                <td>Rout Limit</td>
                <td>{getRoutLimit(warband.warriors)}</td>
            </tr>
            <tr>
                <td>Campaign Link</td>
                <td><Link to={warband.campaignLink || "/"}>Link</Link></td>
            </tr>
        </tbody>
    </table>
};

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

const groupByFighterType = (warriors: IWarrior[]): JSX.Element[] => {
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
    rows.push(<tr style={{ backgroundColor: "rgba(0, 0, 0, .00)", borderTop: "2px solid #a05236" }}>
        <td>
            <strong>Total:</strong>
        </td>
        <td>
            <strong>{getWarbandSize(warriors)}</strong>
        </td>
    </tr>)
    return rows;
};

export const WarriorSummary = () => {
    const warband = useAppSelector((state) => state.warband);
    return <React.Fragment>
        {warband.warriors.length > 0 ?
            <table className="table-striped" style={{ marginTop: "1em" }}>
                <thead>
                    <td colSpan={2}>Fighters</td>
                </thead>
                <tbody>
                    {groupByFighterType(warband.warriors)}
                </tbody>
            </table> :
            null}
    </React.Fragment>
};
