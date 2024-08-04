import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSquareCheck, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { loadWarrior, setWarriorName, addWarrior, removeFunds, updateWarrior, resetDelta } from "../../redux/slices";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { initialWarrior } from "../../types/warrior";

export const DialogHeader = () => {
    const warrior = useAppSelector((state) => state.warrior);
    const delta = useAppSelector((state) => state.delta);
    const deltaFunds = delta.reduce((acc, curr) => acc + (curr.value || 0), 0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navigateBack = () => {
        dispatch(loadWarrior(initialWarrior));
        dispatch(resetDelta())
        navigate("/overview");
    };
    const submit = () => {
        dispatch(addWarrior(warrior));
        dispatch(setWarriorName(""))
        dispatch(removeFunds(deltaFunds))
        dispatch(resetDelta())
        navigate("/overview");
    };
    const SubmitIcon = ({ onClickHandler }: { onClickHandler: any }) => {
        return <Icon icon={faSquareCheck} onClickHandler={onClickHandler} disabled={!warrior.name || !(warrior.name.length > 3)}/>
    };
    return <div className="dialog-header">
    <CloseIcon onClickHandler={navigateBack} />
    <SubmitIcon onClickHandler={submit} />
    </div>
};

export const MaintainWarriorControls = () => {
    const warrior = useAppSelector((state) => state.warrior);
    const delta = useAppSelector((state) => state.delta);
    const deltaFunds = delta.reduce((acc, curr) => acc + (curr.value || 0), 0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navigateBack = () => {
        dispatch(loadWarrior(initialWarrior));
        dispatch(resetDelta())
        navigate("/overview");
    };
    const submit = () => {
        dispatch(updateWarrior(warrior))
        dispatch(removeFunds(deltaFunds))
        dispatch(resetDelta())
        navigate("/overview");
    };
    const SubmitIcon = ({ onClickHandler }: { onClickHandler: any }) => {
        return <Icon icon={faSquareCheck} onClickHandler={onClickHandler} disabled={!warrior.name || !(warrior.name.length > 3)}/>
    };
    return <div className="dialog-header">
    <CloseIcon onClickHandler={navigateBack} />
    <SubmitIcon onClickHandler={submit} />
    </div>
};

export const CloseIcon = ({ onClickHandler }: { onClickHandler: any }) => {
    return <Icon icon={faSquareXmark} onClickHandler={onClickHandler}/>
};

export const Icon = ({ icon, onClickHandler, disabled }: { icon: IconProp; onClickHandler: any; disabled?: boolean }) => {
    return <FontAwesomeIcon icon={icon} onClick={disabled ? undefined : onClickHandler} className={disabled ? "dialog-header-icon disabled" : "dialog-header-icon"} />;
};
