import React from "react";

import { WarbandNameInput } from "../components/Input";
import { WarbandSelection } from "../components/Dropdown";
import { CreateWarbandButton, LoadFileButton } from "../components/Button";
import { LocalStorageControl } from "../components/Table";
import { Footer } from "../components/Footer";
import { WarbandLoader } from "../components/Miscellaneous";

export const LandingPage = () => {
    return <React.Fragment>
        <div id="inner-container" className="inner-container">
            <div>
                <div className="dialog-headerer">
                    <h2>Create new Warband</h2>
                </div>
                <WarbandNameInput />
                <WarbandSelection/>
                <CreateWarbandButton/>
            </div>
            <div>
                <div className="dialog-headerer">
                    <h2>Load existing Warband</h2>
                </div>
                    <label htmlFor="file-uploader">
                        <WarbandLoader />
                        <LoadFileButton />
                    </label>
            </div>
            <div>
                <div className="dialog-headerer">
                    <h2>Load from local storage</h2>
                </div>
                <LocalStorageControl />
            </div>
        </div>
        <Footer/>

    </React.Fragment>;
};


