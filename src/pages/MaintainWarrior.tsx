import React, { useEffect } from "react";
import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { MessageToast } from "../components/MessageToast";
import { AddWarriorCloseButton } from "../components/addWarrior/WarriorControls";
import { DeleteWarriorButton, MaintainWarriorSheet, MetaSection, UpdateWarriorButton } from "../components/maintainWarrior/MaintainControls";
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
                <MetaSection />
                <DeleteWarriorButton />
                </div>

            </div>
            <UpdateWarriorButton />


        </div>
        <MessageToast/>
    </React.Fragment>;
};

