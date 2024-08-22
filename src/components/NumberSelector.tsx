import React from "react";
import { addDelta, setHeadCount } from "../redux/slices";
import { useAppSelector, useAppDispatch } from "../redux/store";

export const WarriorHeadCountSelection = () => {
    const warrior = useAppSelector((state) => state.tempwarrior);
    const dispatch = useAppDispatch();
    const onChangeHandler = (input: number) => {
        const oldHeadCount = warrior.HeadCount;
        dispatch(setHeadCount(input));
        dispatch(addDelta({ command: "addHeadcount", value: warrior.TotalCost * (input - oldHeadCount) }));
    };
    return <NumberSelector max={warrior.Maximum} currentSelection={warrior.HeadCount} command={onChangeHandler} />;
};

export const NumberSelector = ({ max, currentSelection, command }: { max: number; currentSelection: number; command: (_input: number) => void}) => {
    const options = Array.from(Array(Math.min(max, 5))).map((e, i) => i + 1);
    return <React.Fragment>
        <div className="header-1">Select # warriors</div>
        <div className="number-selection-container">
            {options.map((option) => <div key="dummy.key" 
            onClick={() => command(option)}
            className={option === currentSelection ? "number-selection focused" : "number-selection"}>
                {option}
                </div>)}
        </div>
    </React.Fragment>;
};