import { faChartBar, faMagicWandSparkles, faMedkit, faSackDollar, faUserGroup, faUserShield, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addInjury } from "../redux/slices";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IDatabaseInjury } from "../types/database";
import { DataBaseProvider } from "../utilities/DatabaseProvider";


export const InjuriesSelection = () => {
    const dispatch = useAppDispatch();

    const onChangeHandler = (input: string) => {
        setSelectedInjury(input);
        dispatch(addInjury(input));
    };
    const [injuries, setInjuries] = useState<IDatabaseInjury[]>([]);
    useEffect(() => {
        async function fetchWarbands() {
            const DatabaseProviderInstance = await DataBaseProvider.getInstance();
            setInjuries(DatabaseProviderInstance.injuries);
        }
        fetchWarbands();
    }, []);
    const [selectedInjury, setSelectedInjury] = useState<string>();
    return <div className="section-container">
        <h2>Lasting Injuries</h2>
        <div className="tooltip">Select one injury from the list below</div>
        {injuries.map((injury) => <div key="dummy-key"
            className={selectedInjury === injury.Injury ? "list-item focused" : "list-item"}
            onClick={() => onChangeHandler(injury.Injury)}>
            <FontAwesomeIcon icon={faMagicWandSparkles} className={selectedInjury === injury.Injury ? "list-item-icon focused" : "list-item-icon"} />
            {`${injury.Injury}`}
        </div>)}
    </div>;
};

export const WarriorActions = ({ actionHandler }: { actionHandler: (_selection: string) => void }) => {
    const warrior = useAppSelector((state) => state.tempwarrior);
    const rules = warrior.Rules;
    const isWizard = !!rules?.find((rule) => rule.RuleName === "Wizard");
    const isPriest = !!rules?.find((rule) => rule.RuleName === "Priest");
    const onChangeHandler = (input: string) => {
        setSelectedSection(input);
        actionHandler(input);
    };
    const [selectedSection, setSelectedSection] = useState<string>();
    return <React.Fragment>
        {warrior.EquipmentList ? <div className={`list-item ${selectedSection === "Purchase Equipment" ? "focused" : ""}`}
            onClick={() => onChangeHandler("Purchase Equipment")}>
            <FontAwesomeIcon icon={faSackDollar} className={selectedSection === "Purchase Equipment" ? "list-item-icon focused" : "list-item-icon"} />
            Purchase Equipment
        </div> : null}
        {warrior.Hero ? <div className={selectedSection === "Maintain Skills" ? "list-item focused" : "list-item"}
            onClick={() => onChangeHandler("Maintain Skills")}>
            <FontAwesomeIcon icon={faMagicWandSparkles} className={selectedSection === "Maintain Skills" ? "list-item-icon focused" : "list-item-icon"} />
            Maintain Skills
        </div> : null}
        {warrior.Hero ? <div className={selectedSection === "Add Injuries" ? "list-item focused" : "list-item"}
            onClick={() => onChangeHandler("Add Injuries")}>
            <FontAwesomeIcon icon={faMedkit} className={selectedSection === "Add Injuries" ? "list-item-icon focused" : "list-item-icon"} />
            Add Injuries
        </div> : null}
        <div className={selectedSection === "Change Stats" ? "list-item focused" : "list-item"}
            onClick={() => onChangeHandler("Change Stats")}>
            <FontAwesomeIcon icon={faChartBar} className={selectedSection === "Change Stats" ? "list-item-icon focused" : "list-item-icon"} />
            Change Stats
        </div>
        {isWizard || isPriest ? <div className={selectedSection === "Spell Selection" ? "list-item focused" : "list-item"}
            onClick={() => onChangeHandler("Spell Selection")}>
            <FontAwesomeIcon icon={faChartBar} className={selectedSection === "Spell Selection" ? "list-item-icon focused" : "list-item-icon"} />
            {isWizard ? "Spell Selection" : isPriest ? "Prayer Selection" : ""}
        </div> : null}
    </React.Fragment>;
};

export const WarbandControls = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return <div className="section-container">
        <div className="header-1">Warrior Controls</div>
        <div className="list-item" onClick={() => navigate("/add-warrior")}><FontAwesomeIcon icon={faUserGroup} className="list-item-icon" /> Add Warrior</div>
        {/* <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faUserShield} className="list-item-icon" /> Add Hired Sword</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faUserTag} className="list-item-icon" /> Add Dramatis Personae</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faSackDollar} className="list-item-icon" /> Trading Post</div> */}
    </div>;
};