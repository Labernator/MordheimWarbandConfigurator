import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFloppyDisk, faHome, faPlus, faPrint, faSackDollar } from "@fortawesome/free-solid-svg-icons";

import { saveWarbandToFile } from "../utilities/fileOperations";
import { useAppSelector } from "../redux/store";
import { WarbandInfo, WarriorSummary } from "../utilities/warbandProvider";
import { OverviewWarriorSheets } from "../components/render/WarriorSheet";
import { useNavigate } from "react-router-dom";

export const WarbandControls = () => {
    const navigate = useNavigate();
    return <React.Fragment><h4>Warband Controls</h4>
        <div className="warband-overview" style={{ marginTop: "1em" }}>
            <div className="content-container">
                <div className="warband-control" onClick={() => navigate("/add-warrior")}><FontAwesomeIcon icon={faPlus} style={{ width: "1.5em" }} /> Add Warrior</div>
                <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faPlus} style={{ width: "1.5em" }} /> Add Hired Sword</div>
                <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faPlus} style={{ width: "1.5em" }} /> Add Dramatis Personae</div>
                <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faSackDollar} style={{ width: "1.5em" }} /> Trading Post</div>
                <div className="warband-control" onClick={() => navigate("/print-pdf")}><FontAwesomeIcon icon={faPrint} style={{ width: "1.5em" }} /> Print Roster</div>
            </div>
        </div>
    </React.Fragment>
};

export const WarbandOverviewPage = () => {
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    return <React.Fragment>
        <h2>
            {warband.name}
            <FontAwesomeIcon icon={faHome} style={{ width: "2em", float:"right", paddingTop: "0.25em" }} onClick={() => navigate("/")} />
            <FontAwesomeIcon icon={faFilePdf} style={{ width: "2em", float:"right", paddingTop: "0.25em" }} onClick={() => navigate("/print-pdf")} />
            <FontAwesomeIcon icon={faFloppyDisk} style={{ width: "2em", float:"right", paddingTop: "0.25em" }} onClick={(e) => saveWarbandToFile(e, warband)} />

            </h2>
        <div className="warband-overview">
            <div className="content-container">
                <WarbandInfo />
                <WarriorSummary />
            </div>
        </div>
        <WarbandControls />
        <h4>Fighter List</h4>
        <OverviewWarriorSheets />
    </React.Fragment>;
};


