import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ButtonControl, LoadFileButton, LookForButton } from "../components/Button";
import { DropdownControl } from "../components/Dropdown";
import { Footer } from "../components/Footer";
import { TextInputControl } from "../components/Input";
import { WarbandLoader } from "../components/Miscellaneous";
import { loadWarband, setWarbandFaction, setWarbandName } from "../redux/slices";
import { setUserName } from "../redux/slices/userSlice";
import { initialWarband } from "../redux/slices/warbandSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IDatabaseWarband } from "../types/database";
import { DataBaseProvider } from "../utilities/DatabaseProvider";

const nameRegex = new RegExp("[a-zA-Z0-9]{3,}");

export const LandingPage = () => {
    const dispatch = useAppDispatch();
    const userName = useAppSelector((state) => state.user.username);
    const myStorage = localStorage;
    const userId = myStorage.getItem("mordheim-companion-user-id");
    if (!userName && userId) {
        dispatch(setUserName(userId));
    }
    return <React.Fragment>
        <h2>Create new Warband</h2>
        <div className="section-container">
            <TextInputControl label="Warband name (min. 3 characters)" dispatchCommand={setWarbandName} regex={new RegExp(nameRegex)} />
            <WarbandSelection />
            <CreateWarbandButton />
        </div>
        <h2>Load existing Warband</h2>
        <div className="section-container">
            {/* {userName ? null : <TextInputControl label= "Email adress" dispatchCommand={setUserName} regex={new RegExp(nameRegex)} />} */}
            <LookForButton />
        </div>
        <h2>Import Warband</h2>
        <div className="section-container">
            <label htmlFor="file-uploader">
                <WarbandLoader />
                <LoadFileButton />
            </label>
        </div>
        <Footer />
    </React.Fragment>;
};

export const WarbandSelection = () => {
    const dispatch = useAppDispatch();
    const [warbandOptions, setWarbandOptions] = useState<IDatabaseWarband[]>([]);
    useEffect(() => {
        async function fetchWarbands() {
            const DatabaseProviderInstance = await DataBaseProvider.getInstance();
            setWarbandOptions(DatabaseProviderInstance.warbands);
        }
        fetchWarbands();
    }, []);
    return <DropdownControl
        label="Select a faction"
        options={warbandOptions.map((warband) => ({ value: warband.Id, label: `${warband.ShortName} (max. ${warband.Maximum} warriors)` }))}
        command={(input: string) => dispatch(setWarbandFaction(input))} />;
};


export const CreateWarbandButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    const faction = warband.faction;
    const name = warband.name;
    const enabled = !!name && name.length >= 3 && !!faction;
    const handleCreateButtonClick = async () => {
        const DatabaseProviderInstance = await DataBaseProvider.getInstance();
        const warbandMetadata = await DatabaseProviderInstance.getWarbandMetadata(faction);
        dispatch(loadWarband({ 
            ...initialWarband, 
            faction: warbandMetadata.Id, 
            name: name, 
            limit: warbandMetadata.Maximum, 
            cash: warbandMetadata.Gold 
        }));
        navigate("/overview");
    };
    return <ButtonControl label={"Create warband"} command={handleCreateButtonClick} enabled={enabled} />;
};



