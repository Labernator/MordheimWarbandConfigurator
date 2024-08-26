import { addDelta, setHeadCount } from "../../redux/slices";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { IWarrior } from "../../types/warrior";

export const WarriorHeadCountSelection = ({givenWarrior}: {givenWarrior?: IWarrior}) => {
    const warrior = givenWarrior || useAppSelector((state) => state.tempwarrior);
    const dispatch = useAppDispatch();
    const onChangeHandler = (input: number) => {
        const oldHeadCount = warrior.HeadCount;
        dispatch(setHeadCount(input));
        dispatch(addDelta({ command: "addHeadcount", value: warrior.TotalCost * (input - oldHeadCount) }));
    };
    const options = Array.from(Array(Math.min(warrior.Maximum, 5))).map((e, i) => i + 1);
    return <>
        <div className="header-1">Select # warriors</div>
        <div className="number-selection-container">
            {options.map((option) => <div key="dummy.key"
                onClick={() => onChangeHandler(option)}
                className={option === warrior.HeadCount ? "number-selection focused" : "number-selection"}>
                {option}
            </div>)}
        </div>
    </>;
};

