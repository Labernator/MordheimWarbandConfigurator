import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { MessageToast } from "../components/MessageToast";
import { AddWarriorCloseButton } from "../components/addWarrior/WarriorControls";
import { DeleteWarriorButton, MaintainWarriorSheet, MetaSection, UpdateWarriorButton } from "../components/maintainWarrior/MaintainControls";
import { MaintainFooter } from "../components/Footer";
import { loadWarrior, removeFunds, resetDelta, updateWarrior } from "../redux/slices";
import { initialWarrior } from "../types/warrior";
import { WarriorHeadCountSelection } from "../components/NumberSelector";
import { WarriorSheet } from "../components/addWarrior/WarriorSheet";
import { PurchaseWeapons } from "../components/Tabstrip";
import { SpellSelection, WarriorActions } from "../components/List";
import { faUserGroup, faUserShield, faUserTag, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setMessage } from "../redux/slices/messageSlice";
export const MaintainWarriorPageOLD = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const warband = useAppSelector((state) => state.warband);
    const delta = useAppSelector((state) => state.delta);
    const deltaFunds = delta.reduce((acc, curr) => acc + (curr.value || 0), 0);
    useEffect(() => { if (!warband.name) {
        navigate("/");
    }}, [navigate, warband]);
    const changeWarriorSaga = () => {
        dispatch(updateWarrior(warrior));
        dispatch(loadWarrior(initialWarrior))
        dispatch(removeFunds(deltaFunds))
        dispatch(resetDelta())
        navigate("/overview");
    }
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

            <MaintainFooter submitAction={changeWarriorSaga} isEnabled={true}/>
        </div>
        <MessageToast/>
        
    </React.Fragment>;
};

export const WarbandControls = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return <div className="section-container">
        <div className="header-1">Warrior Controls</div>
        <div className="list-item" onClick={() => navigate("/add-warrior")}><FontAwesomeIcon icon={faUserGroup} className="list-item-icon" /> Add Warrior</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faUserShield} className="list-item-icon" /> Add Hired Sword</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faUserTag} className="list-item-icon" /> Add Dramatis Personae</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faSackDollar} className="list-item-icon" /> Trading Post</div>
        {/* <div className="list-item" onClick={() => navigate("/print-pdf")}><FontAwesomeIcon icon={faPrint} className="list-item-icon" /> Print Roster</div> */}
    </div>
};

export const MaintainWarriorPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    useEffect(() => {
        if (!warband.name) {
            navigate("/");
        }
    }, [navigate, warband]);
    const warrior = useAppSelector((state) => state.warrior);
    const delta = useAppSelector((state) => state.delta);
    const deltaFunds = delta.reduce((acc, curr) => acc + (curr.value || 0), 0);
    const enabled = !!warrior.name &&
        warrior.name.length >= 3 &&
        !!(!warrior.rules?.find((rule) => rule.rule === "Wizard" || rule.rule === "Priest") || warrior.spells?.length) &&
        deltaFunds < warband.cash;
    const addWarriorSaga = () => {
        dispatch(updateWarrior(warrior));
        dispatch(loadWarrior(initialWarrior))
        dispatch(removeFunds(deltaFunds))
        dispatch(resetDelta())
        navigate("/overview");
    }
    const actionHandler = (selection: string) => {
        setSelectedSection(selection);
    }
    const [selectedSection, setSelectedSection] = useState<string>();
    return <React.Fragment>
        <div>
            <h2>Maintain Warrior</h2>

            <div className="section-container">
                {/* <WarriorNameInput />
                <WarriorSelection /> */}
                <WarriorActions actionHandler={actionHandler}/>
                {!!warrior.type ?
                    <React.Fragment>
                        {warrior.hero ? null : <WarriorHeadCountSelection />}
                        <WarriorSheet warrior={warrior} />
                        {selectedSection === "Purchase Equipment" ? <PurchaseWeapons /> : null}
                    </React.Fragment> :
                    null}

                {warrior.rules?.find((rule) => rule.rule === "Wizard" || rule.rule === "Priest") ? <SpellSelection /> : null}
            </div>
        </div>
        <MaintainFooter submitAction={addWarriorSaga} isEnabled={enabled} />

    </React.Fragment>;
};


