import React from "react";

import { SelectWarbandButton, WarbandDropdown, WarbandNameInput, LocalStorageContainer, WarbandLoader } from "../components/addWarband/warbandControls";

export const LandingPage = () => {
    return <React.Fragment>
        <div id="create-warbands" className="reate-warbands">
            <div>
                <div className="dialog-headerer">
                    <h2>Create new Warband</h2>
                </div>
                <WarbandNameInput />
                    <WarbandDropdown />
                    <SelectWarbandButton />
            </div>
            <div>
                <div className="dialog-headerer">
                    <h2>Load existing Warband</h2>
                </div>

                    <label htmlFor="file-uploader">
                        <WarbandLoader />

                        <select
                            value={"Load from file"}
                            onClick={() => document.getElementById("file-uploader")?.click()}
                            onChange={() => document.getElementById("file-uploader")?.click()}
                            style={{ width: "100%", borderLeft: "solid 1em #33925d", borderBottom: "solid 3px #33925d"}}
                            className="input input-dropdown ">
                            <option key={"load"} label={`Select a local file`} value={"select"}></option>
                        </select>

                    </label>

            </div>
            <div>
                <div className="dialog-headerer">
                    <h2>Load from local storage</h2>
                </div>

                    <LocalStorageContainer />

            </div>
        </div>


    </React.Fragment>;
};


