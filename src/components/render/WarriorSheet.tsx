import React from "react";
import { EditIcon } from "./Icons";
import { MaintainWeaponsSection, ShortRulesSection, ShortWargearSection, SkillListsSection, StatsSection, WeaponsSection } from "./UnitCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar, } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IWarrior } from "../../types/warrior";
import { loadWarrior } from "../../redux/slices/warriorSlice";
import { useNavigate } from "react-router-dom";
export const WarriorSheets = ({isEditable}: {isEditable?: boolean}) => {
    const warriors = useAppSelector((state) => state.warband.warriors);
    return <div className="warrior-sheets">
        {warriors.map((warrior, index) => <WarriorSheet key={index} warrior={warrior} isEditable={isEditable}/>)}
    </div>;
}

export const OverviewWarriorSheets = () => {
    const warriors = useAppSelector((state) => state.warband.warriors);
    const sortedWarriors = [...warriors].sort((a: IWarrior, b: IWarrior) => a.position - b.position);
    return <div className="warrior-sheets">
        {sortedWarriors.map((warrior, index) => <OverviewWarriorSheet key={index} warrior={warrior} />)}
    </div>;
}

export const OverviewWarriorSheet = ({ warrior }: { warrior: IWarrior }) => {
    return <React.Fragment>
        <div className="unit-card">
            <HeaderSectionWithEdit warrior={warrior} editEnabled={true} />
            <StatsSection unit={warrior} />
            <WeaponsSection warrior={warrior} />
            <table className="unit-table">
                <tbody>
                    <ShortWargearSection unit={warrior} />
                    <SkillListsSection unit={warrior} />
                    <ShortRulesSection unit={warrior} />
                </tbody>
            </table>
        </div>
    </React.Fragment>;
};

export const WarriorSheet = ({ warrior, isEditable }: { warrior: IWarrior; isEditable?: boolean }) => {
    return <React.Fragment>
        <div className="unit-card">
            <HeaderSectionWithEdit warrior={warrior} editEnabled={isEditable} />
            <StatsSection unit={warrior} />
            {isEditable ? <MaintainWeaponsSection warrior={warrior} /> : <WeaponsSection warrior={warrior} />}
            <table className="unit-table">
                <tbody>
                    <ShortWargearSection unit={warrior} />
                    <SkillListsSection unit={warrior} />
                    <ShortRulesSection unit={warrior} />
                </tbody>
            </table>
        </div>
    </React.Fragment>;
};

export const MaintainWarriorSheet = ({warrior}:{warrior: IWarrior}) => {
    return <React.Fragment>
        <div className="unit-card">
            <HeaderSectionWithEdit warrior={warrior}/>
            <StatsSection unit={warrior} />
            <MaintainWeaponsSection warrior={warrior} />
            <table className="unit-table">
                <tbody>
                    <ShortWargearSection unit={warrior} />
                    <SkillListsSection unit={warrior} />
                    <ShortRulesSection unit={warrior} />
                </tbody>
            </table>
        </div>
    </React.Fragment>;
};


export const HeaderSectionWithEdit = ({warrior, editEnabled}: {warrior: IWarrior; editEnabled?: boolean}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return <div className="unit-name-bg">
        <div className="unit-name">{warrior.headCount > 1 ? `${warrior.headCount}x ` : null}{warrior.name} - <small>{warrior.type}</small></div>
        {editEnabled !== undefined ?
            <EditIcon onClickHandler={() => {
                dispatch(loadWarrior(warrior));
                navigate("/maintain-warrior");
            }} /> :
            null}
        <div className="unit-cost-bg">
            <div className="unit-cost">{warrior.headCount * warrior.totalCost}<br /><div style={{ fontSize: "0.7em" }}>gc</div></div>
        </div>
    </div>
};


export const WarbandFunds = ({ cash }: { cash: number }) => {
    return <div className="funds-header">
        <div className="funds-header-item">Warband Funds</div>
        <FontAwesomeIcon className="funds-header-item" icon={faSackDollar} />
        <div className="funds-header-item">{cash}</div>
    </div>;
};