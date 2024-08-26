import { faMedal, faCross, faHatWizard, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IWarrior } from "../../types/warrior";
import { useAppSelector } from "../../redux/store";

export const WarriorIcons = ({givenWarrior}: {givenWarrior?: IWarrior}) => {
    const warrior = givenWarrior || useAppSelector((state) => state.tempwarrior);
    const isLeader = warrior.Rules?.find((rule) => rule.RuleName === "Leader");
    const isPriest = warrior.Rules?.find((rule) => rule.RuleName === "Priest");
    const isWizard = warrior.Rules?.find((rule) => rule.RuleName === "Wizard");
    return warrior.Hero ?
        <div className="warrior-hero-icon">
            {isLeader ? <FontAwesomeIcon icon={faMedal} style={{ width: "1.5em" }} /> : null}
            {isPriest ? <FontAwesomeIcon icon={faCross} style={{ width: "1.5em" }} /> : null}
            {isWizard ? <FontAwesomeIcon icon={faHatWizard} style={{ width: "1.5em" }} /> : null}
            <FontAwesomeIcon icon={faStar} style={{ width: "1.5em" }} />
        </div> :
        null;
};

