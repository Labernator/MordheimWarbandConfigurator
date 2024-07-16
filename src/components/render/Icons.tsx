import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faPencil, faSquareXmark, } from "@fortawesome/free-solid-svg-icons";
export const SubmitIcon = ({ onClickHandler, disabled }: { onClickHandler: () => void, disabled?: boolean }) => {
    return <div
        className="dialog-ok"
        onClick={onClickHandler}
    >
        <FontAwesomeIcon
            icon={faSquareCheck}
            className={disabled ? "dialog-ok-disabled" : "dialog-ok-active"}
        />
    </div>;
};

export const CloseIcon = ({ onClickHandler }: { onClickHandler: () => void }) => {
    return <FontAwesomeIcon icon={faSquareXmark} onClick={() => onClickHandler()} className="modal-close-icon" />;
};

export const EditIcon = ({ onClickHandler }: { onClickHandler: any }) => {
    return <FontAwesomeIcon icon={faPencil} onClick={onClickHandler} className="unit-card-edit" />;
};
