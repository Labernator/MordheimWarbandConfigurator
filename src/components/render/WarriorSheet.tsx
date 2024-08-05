import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar, } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../redux/store";
import { IWarrior } from "../../types/warrior";
import { WarriorSheet } from "../addWarrior/WarriorSheet";


export const OverviewWarriorSheets = () => {
    const warriors = useAppSelector((state) => state.warband.warriors);
    const sortedWarriors = [...warriors].sort((a: IWarrior, b: IWarrior) => a.position - b.position);
    return <div className="section-container">
        <div className="header-1">Fighter List</div>
        {sortedWarriors.map((warrior, index) => <WarriorSheet warrior={warrior} isEditable={true}/>)}
    </div>;
}