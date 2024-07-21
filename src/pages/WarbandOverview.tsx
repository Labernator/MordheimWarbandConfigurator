import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFloppyDisk, faHome, faPrint, faSackDollar, faUserGroup, faUserShield, faUserTag } from "@fortawesome/free-solid-svg-icons";

import { saveWarbandToFile } from "../utilities/fileOperations";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { OverviewWarriorSheets } from "../components/render/WarriorSheet";
import { useNavigate } from "react-router-dom";
import { MessageToast } from "../components/MessageToast";
import { setMessage } from "../redux/slices/messageSlice";
import { MetaSection } from "../components/overview/metaSection";

export const WarbandControls = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return <React.Fragment><h4>Warband Controls</h4>
        <div className="modern-container" style={{ marginTop: "1em" }}>
            <div className="content-container">
                <div className="warband-control" onClick={() => navigate("/add-warrior")}><FontAwesomeIcon icon={faUserGroup} className="warband-control-icon" /> Add Warrior</div>
                <div className="warband-control" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faUserShield} className="warband-control-icon" /> Add Hired Sword</div>
                <div className="warband-control" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faUserTag} className="warband-control-icon" /> Add Dramatis Personae</div>
                <div className="warband-control" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faSackDollar} className="warband-control-icon" /> Trading Post</div>
                <div className="warband-control" onClick={() => navigate("/print-pdf")}><FontAwesomeIcon icon={faPrint} className="warband-control-icon" /> Print Roster</div>
            </div>
        </div>
    </React.Fragment>
};

export const WarbandOverviewPage = () => {
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    if (!warband.name) {
        navigate("/");
    }
    return <React.Fragment>
        <h2>
            {warband.name}
            <FontAwesomeIcon icon={faHome} style={{ width: "2em", float: "right", paddingTop: "0.25em" }} onClick={() => navigate("/")} />
            <FontAwesomeIcon icon={faFilePdf} style={{ width: "2em", float: "right", paddingTop: "0.25em" }} onClick={() => navigate("/print-pdf")} />
            <FontAwesomeIcon icon={faFloppyDisk} style={{ width: "2em", float: "right", paddingTop: "0.25em" }} onClick={(e) => saveWarbandToFile(e, warband)} />

        </h2>
            <MetaSection />
        <WarbandControls />
        <h4>Fighter List</h4>
        <OverviewWarriorSheets />
        <MessageToast/>
    </React.Fragment>;
};


