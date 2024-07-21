import React from "react";
import { EditIcon } from "./Icons";
import { MaintainWeaponsSection, ShortRulesSection, ShortWargearSection, SkillListsSection, StatsSection, WeaponsSection } from "./UnitCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar, } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IWarrior } from "../../types/warrior";
import { loadWarrior } from "../../redux/slices/warriorSlice";
import { useNavigate } from "react-router-dom";
import { HeaderSectionWithEdit, WarriorSheet } from "../addWarrior/WarriorSheet";
// export const WarriorSheets = ({ isEditable }: { isEditable?: boolean }) => {
//     const warriors = useAppSelector((state) => state.warband.warriors);
//     return <div className="warrior-sheets">
//         {warriors.map((warrior, index) => <WarriorSheet key={index} warrior={warrior} isEditable={isEditable} />)}
//     </div>;
// }

export const OverviewWarriorSheets = () => {
    const warriors = useAppSelector((state) => state.warband.warriors);
    const sortedWarriors = [...warriors].sort((a: IWarrior, b: IWarrior) => a.position - b.position);
    return <div className="warrior-sheets">
        {sortedWarriors.map((warrior, index) => <div className="warrior-card"><WarriorSheet warrior={warrior} isEditable={true}/></div>)}
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

// export const WarriorSheet = ({ warrior, isEditable }: { warrior: IWarrior; isEditable?: boolean }) => {
//     return <React.Fragment>
//         <div className="dialog-warrior-sheet">
//             <HeaderSectionWithEdit warrior={warrior} editEnabled={isEditable} />
//             <StatsSection unit={warrior} />
//             {isEditable ? <MaintainWeaponsSection warrior={warrior} /> : <WeaponsSection warrior={warrior} />}
//             <table className="unit-table">
//                 <tbody>
//                     <ShortWargearSection unit={warrior} />
//                     <SkillListsSection unit={warrior} />
//                     <ShortRulesSection unit={warrior} />
//                 </tbody>
//             </table>
//         </div>
//     </React.Fragment>;
// };





export const WarbandFunds = ({ cash }: { cash: number }) => {
    return <div className="funds-header">
        <div className="funds-header-item">Bank account</div>
        <FontAwesomeIcon className="funds-header-item" icon={faSackDollar} />
        <div className="funds-header-item">{cash}</div>
    </div>;
};