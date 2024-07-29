import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { getWarbandSize, getRoutLimit, getWarbandRating, groupByFighterType } from "../../utilities/warbandProvider";
import React from "react";

enum IOverviewTabs {
    Metadata = "Metadata",
    Fighters = "Fighters",
    Stash = "Stash"
}
export const MetaSection = () => {
    const [focusedTab, setFocusedTab] = useState<IOverviewTabs>(IOverviewTabs.Metadata);
    return <div className="modern-container">
        <div className="content-container">
            <div className="tabstrip">
                <div className={`tab ${focusedTab === IOverviewTabs.Metadata ? "focused" : ""}`} onClick={() => setFocusedTab(IOverviewTabs.Metadata)}>{IOverviewTabs.Metadata}</div>
                <div className={`tab ${focusedTab === IOverviewTabs.Fighters ? "focused" : ""}`} onClick={() => setFocusedTab(IOverviewTabs.Fighters)}>{IOverviewTabs.Fighters}</div>
                <div className={`tab ${focusedTab === IOverviewTabs.Stash ? "focused" : ""}`} onClick={() => setFocusedTab(IOverviewTabs.Stash)}>{IOverviewTabs.Stash}</div>
            </div>
            {focusedTab === IOverviewTabs.Metadata ? <WarbandInfo /> : null}
            {focusedTab === IOverviewTabs.Fighters ? <WarriorSummary /> : null}
            {focusedTab === IOverviewTabs.Stash ? <StashList /> : null}
        </div>
    </div>
}

export const StashList = () => {
    const warband = useAppSelector((state) => state.warband);
    return <table className="modern-table">
        <tbody>
            {warband.stash.length > 0 ?
            warband.stash.map((item) => <tr>{item}</tr>) : <tr><td>You have no items in your stash</td></tr>}
        </tbody>
    </table>
}

export const WarbandInfo = () => {
    const warband = useAppSelector((state) => state.warband);
    return <table className="modern-table">
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
    return <table className="modern-table">
        <tbody>
            {warband.warriors.length > 0 ?
                groupByFighterType(warband.warriors) :
                <tr><td>You have no warriors in your warband</td></tr>}
        </tbody>
    </table>
};
