import React, { useEffect } from "react";
import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { MessageToast } from "../components/MessageToast";
import { AddWarriorCloseButton, WarriorHeadCount } from "../components/addWarrior/WarriorControls";
import { MaintainControls, MaintainWarriorSheet, SubmitMaintainWarriorButton } from "../components/maintainWarrior/MaintainControls";
export const MaintainWarriorPage = () => {
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    useEffect(() => { if (!warband.name) {
        navigate("/");
    }}, [navigate, warband]);
   
    const warrior = useAppSelector((state) => state.warrior);
    return <React.Fragment>
        <div id="new-warbands" className="new-warbands">
            <div>
                <div className="dialog-headerer">
                    <h2>Maintain Warrior</h2>
                    <AddWarriorCloseButton />
                </div>

                <div className="modern-container">
                <MaintainWarriorSheet warrior={warrior} />
                    <MaintainControls />

                </div>
            </div>
            <SubmitMaintainWarriorButton />
               

        </div>
        <MessageToast/>
    </React.Fragment>;
};

