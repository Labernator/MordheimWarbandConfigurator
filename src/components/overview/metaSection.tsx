import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { getWarbandSize, getRoutLimit, getWarbandRating, groupByFighterType } from "../../utilities/warbandProvider";

export const StashList = () => {
    const warband = useAppSelector((state) => state.warband);
    return <table className="table">
        <tbody>
            {warband.stash.length > 0 ?
            warband.stash.map((item) => <tr>{item}</tr>) : <tr><td>You have no items in your stash</td></tr>}
        </tbody>
    </table>
}

export const WarbandInfo = () => {
    const warband = useAppSelector((state) => state.warband);
    return <table className="table">
        <tbody>
            <tr>
                <td>Warband Type</td>
                <td>{warband.faction}</td>
            </tr>
            <tr>
                <td>Fighter Limit</td>
                <td>{getWarbandSize(warband.warriors)} / {warband.limit}</td>
            </tr>
            <tr>
                <td>Rout Limit</td>
                <td>{getRoutLimit(warband.warriors)}</td>
            </tr>
            <tr>
                <td>Warband Rating</td>
                <td>{getWarbandRating(warband.warriors)}</td>
            </tr>
            <tr>
                <td>Warchest</td>
                <td>{warband.cash} gc</td>
            </tr>

            <tr>
                <td># Treasures</td>
                <td>{warband.treasure}</td>
            </tr>
            <tr>
                <td>Campaign Link</td>
                <td><Link to={warband.campaignLink || "/"}>Link</Link></td>
            </tr>
        </tbody>
    </table>
};

export const WarriorSummary = () => {
    const warband = useAppSelector((state) => state.warband);
    return <table className="table">
        <tbody>
            {warband.warriors.length > 0 ?
                groupByFighterType(warband.warriors) :
                <tr><td>You have no warriors in your warband</td></tr>}
        </tbody>
    </table>
};
