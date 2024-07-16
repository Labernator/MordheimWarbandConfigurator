import { faFileArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { WarbandNameInput, WarbandSelector } from "../components/render/Warband";
import { LocalStorageContainer, WarbandLoader } from "../utilities/fileOperations";

export const LandingPage = () => {
    return <React.Fragment >
        <div id="load-warbands" className="new-warbands">
        <h2>Load from local storage</h2>
            <LocalStorageContainer />
        </div>
        <div id="new-warbands" className="new-warbands">
            <h2>Create new warband</h2>
            <WarbandNameInput />
            <div className="warband-selections">
                <WarbandSelector faction="Cult of the Possessed" />
                <WarbandSelector faction="Middenheim" />
                <WarbandSelector faction="Skaven" />
            </div>
        </div>
        <div id="load-warbands" className="new-warbands">
            <h2 style={{ float: "left" }}>Load from file</h2>
            <label htmlFor="file-uploader">
                <WarbandLoader />
                <FontAwesomeIcon icon={faFileArchive} className="file-uploader-icon" onClick={() => document.getElementById("file-uploader")?.click()}></FontAwesomeIcon>
            </label>
        </div>
    </React.Fragment>;
};
