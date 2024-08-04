import { faFilePdf, faFloppyDisk, faHome, faSackDollar, faUserGroup, faUserShield, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { MessageToast } from "../components/MessageToast";
import { OverviewWarriorSheets } from "../components/render/WarriorSheet";
import { WarbandMetadata } from "../components/Tabstrip";
import { setMessage } from "../redux/slices/messageSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const WarbandControls = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return <div className="section-container">
        <div className="header-1">Warband Controls</div>
        <div className="list-item" onClick={() => navigate("/add-warrior")}><FontAwesomeIcon icon={faUserGroup} className="list-item-icon" /> Add Warrior</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faUserShield} className="list-item-icon" /> Add Hired Sword</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faUserTag} className="list-item-icon" /> Add Dramatis Personae</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faSackDollar} className="list-item-icon" /> Trading Post</div>
        {/* <div className="list-item" onClick={() => navigate("/print-pdf")}><FontAwesomeIcon icon={faPrint} className="list-item-icon" /> Print Roster</div> */}
    </div>
};

export const WarbandOverviewPage = () => {
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    if (!warband.name) {
        navigate("/");
    }
    return <React.Fragment>
        <h2>{warband.name}</h2>
        <WarbandControls />
        <WarbandMetadata/>

        <OverviewWarriorSheets />
        <MessageToast/>
        <Footer/>
    </React.Fragment>;
};


