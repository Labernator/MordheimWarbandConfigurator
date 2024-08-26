import { setWarriorName } from "../../redux/slices";
import { useAppSelector } from "../../redux/store";
import { IWarrior } from "../../types/warrior";
import { TextInputControl } from "../Input";

const nameRegex = new RegExp("[a-zA-Z0-9]{3,}");

export const WarriorNameInput = ({ givenWarrior }: { givenWarrior?: IWarrior }) => {
    const warrior = givenWarrior || useAppSelector((state) => state.tempwarrior);
    return <TextInputControl
        label="Warrior name (min. 3 characters)"
        dispatchCommand={setWarriorName}
        regex={new RegExp(nameRegex)}
        placeholder={warrior.Name}
        prefilled={warrior.Name}
    />;
};