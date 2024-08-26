import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonControl, LoadFileButton, LookForButton } from "../components/Button";
import { DropdownControl } from "../components/Dropdown";
import { Footer } from "../components/Footer";
import { TextInputControl } from "../components/Input";
import { WarbandLoader } from "../components/Miscellaneous";
import { loadWarband, setWarbandFaction, setWarbandName } from "../redux/slices";
import { addWarbandLog, initialWarband } from "../redux/slices/warbandSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IDatabaseWarband } from "../types/database";
import { DataBaseProvider } from "../utilities/DatabaseProvider";
import { useAuth0 } from "@auth0/auth0-react";

const nameRegex = new RegExp("[a-zA-Z0-9]{3,}");
export const LandingPage = () => {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoading) {
            // do nothing
            return;
        }
        if (!isAuthenticated || !user) {
            navigate("/");
            return;
        }
    }, []);
    return <React.Fragment>
        <h2>Create new Warband</h2>
        <div className="section-container">
            <TextInputControl label="Warband name (min. 3 characters)" dispatchCommand={setWarbandName} regex={new RegExp(nameRegex)} />
            <WarbandSelection />
            <div className="button-container-right"><CreateWarbandButton /></div>
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
                <div className="button-container-right"><LoadFileButton /></div>
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
        dispatch(addWarbandLog([{ command: "Set warband name", value: name }, { command: "Set warband faction", value: warbandMetadata.Id }]));
        navigate("/overview");
    };
    return <ButtonControl label={"Create warband"} command={handleCreateButtonClick} enabled={enabled} />;
};



