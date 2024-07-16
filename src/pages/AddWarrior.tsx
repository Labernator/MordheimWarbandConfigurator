import React from "react";
import { useAppSelector } from "../redux/store";
import { WarriorDropdown, WarriorHeadCount, WarriorNameInput } from "../components/render/Warrior";
import { WarbandFunds, WarriorSheet } from "../components/render/WarriorSheet";
import { DialogHeader } from "../components/render/DialogHeader";
export const AddWarriorPage = () => {
    const warband = useAppSelector((state) => state.warband);
    const warrior = useAppSelector((state) => state.warrior);
    const delta = useAppSelector((state) => state.funds);
    return <React.Fragment>
        <div id="new-warbands" className="new-warbands">
            <h2>Add Warrior</h2>
            <div className="warband-overview dialog-page">
                <div className="content-container">
                    <WarriorNameInput />
                    <WarbandFunds cash={warband.cash - (delta)} />
                    <WarriorDropdown />
                    <WarriorSheet warrior={warrior} />
                    <WarriorHeadCount />
                </div>
                <DialogHeader />
            </div>
        </div>
    </React.Fragment>;
};


