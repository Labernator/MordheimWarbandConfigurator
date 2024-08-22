import { faSackDollar, faUserGroup, faUserShield, faUserTag, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { useAppSelector } from "../redux/store";
import { DataBaseProvider } from "../utilities/DatabaseProvider";
import { getRoutLimit, getWarbandRating, getWarbandSize } from "../utilities/warbandProvider";
import { OverviewWarriorSheets } from "../components/WarriorSheet";

export const WarbandControls = () => {
    const navigate = useNavigate();
    const MyDiv = ({ text, icon, clickHandler }: { text: string, icon: IconDefinition, clickHandler?: () => void }) =>
        <div className="control-group" onClick={clickHandler} >
            <FontAwesomeIcon
                icon={icon}
                style={{ height: "1.5em" }}
                className="" />
            <div style={{ width: "60%", fontWeight: "bold" }}>{text}</div>
        </div>;
    return <div className="section-container">
        <div className="control-container">
            <MyDiv text="Enlist Fighters" icon={faUserGroup} clickHandler={() => navigate("/add-warrior")}/>
            <MyDiv text="Recruit Hired Sword" icon={faUserShield} />
            <MyDiv text="Add Dramatis Personae" icon={faUserTag} />
            <MyDiv text="Visit Trading Post" icon={faSackDollar} />
        </div>
    </div>;
};

export const WarbandKPIs = () => {
    const warband = useAppSelector((state) => state.warband);
    const [warbandFullName, setWarbandFullName] = useState<string>("");
    useEffect(() => {
        async function fetchWarbands() {
            const DatabaseProviderInstance = await DataBaseProvider.getInstance();
            setWarbandFullName(DatabaseProviderInstance.getWarbandHumanReadableType(warband.faction));
        }
        fetchWarbands();
    }, []);
    const MyDiv = ({ title, text }: { title: string, text: string }) => <div className="kpi-entry">
        <div style={{ width: "60%", fontSize: "0.75em" }}>{title}</div>
        <div style={{ width: "60%", fontWeight: "bold" }}>{text}</div>
    </div>;
    return <div className="section-container">
        <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "4em", maxWidth: "calc(var(--ifm-container-width) + 1em + 2px)" }} className="">
            <MyDiv text={warbandFullName} title={"Warband Type"} />
            <MyDiv text={`${getWarbandRating(warband.warriors)}`} title={"Warband Rating"} />
        </div>

        <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "4em", maxWidth: "calc(var(--ifm-container-width) + 1em + 2px)" }} className="">


            <MyDiv text={`${getWarbandSize(warband.warriors)} / ${warband.limit}`} title={"Figher Limit"} />
            <MyDiv text={`${getRoutLimit(warband.warriors)}`} title={"Rout Limit"} />
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "4em", maxWidth: "calc(var(--ifm-container-width) + 1em + 2px)" }} className="">
            <MyDiv text={`${warband.cash} gc`} title={"Warchest"} />
            <MyDiv text={`${warband.treasure} pcs`} title={"Treasures"} />
        </div>
    </div>;
};


export const WarbandOverviewPage = () => {
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    if (!warband.name) {
        navigate("/");
    }
    return <React.Fragment>
        <h2>{warband.name}</h2>
        <WarbandKPIs />
        <WarbandControls />
        <OverviewWarriorSheets />
        <Footer />
    </React.Fragment>;
};


