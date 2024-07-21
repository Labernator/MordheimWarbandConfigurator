import React, { useEffect } from "react";
import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { AddWarriorButton, AddWarriorCloseButton, SpellSelectionDropdown, WarriorDropdown, WarriorHeadCount, WarriorNameInput } from "../components/addWarrior/WarriorControls";
import { WarriorSheet } from "../components/addWarrior/WarriorSheet";
export const AddWarriorPage = () => {
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    useEffect(() => {
        if (!warband.name) {
            navigate("/");
        }
    }, [navigate, warband]);
    const warrior = useAppSelector((state) => state.warrior);
    console.log(warrior.rules)
    return <React.Fragment>
        <div id="new-warbands" className="new-warbands">
            <div>
                <div className="dialog-headerer">
                    <h2>Add Warrior</h2>
                    <AddWarriorCloseButton />
                </div>

                <div className="content-container warband-overview">
                    <WarriorNameInput />
                    <WarriorDropdown />
                    <WarriorSheet warrior={warrior} />
                    <WarriorHeadCount />
                    {warrior.rules?.find((rule) => rule.rule === "Wizard") ? <SpellSelectionDropdown/> : null}
                </div>
            </div>
            <AddWarriorButton />

        </div>

    </React.Fragment>;
};


