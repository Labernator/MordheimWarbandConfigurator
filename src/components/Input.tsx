import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useState } from "react";
import { setPassword, setUserName } from "../redux/slices/userSlice";
import { setCampaignUrl } from "../redux/slices/warbandSlice";
import { setWarriorName } from "../redux/slices/warriorSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const nameRegex = new RegExp("[a-zA-Z0-9]{3,}");
// const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,20}$");
const urlRegex = new RegExp("/^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$/");

export const UserNameInput = () => {
    return <TextInputControl label= "Email adress" dispatchCommand={setUserName} regex={new RegExp(nameRegex)} />;
};
export const PasswordInput = () => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>("");
    const onChangeHandler = (txt: string) => {
        setText(txt);
        if (passwordRegex.test(txt)) {
            dispatch(setPassword(txt));
        } else {
            dispatch(setPassword(""));
        }
    };
    return <div className="input-container">
        <label className="input-label">Password</label>
        <input
            onChange={(e: any) => onChangeHandler(e.target.value)}
            placeholder={"Start typing..." }
            className="input-field" />
            <FontAwesomeIcon icon={passwordRegex.test(text) ? faCircleCheck : faCircleXmark} className={passwordRegex.test(text) ? "input-icon input-icon-ok" : "input-icon input-icon-not-ok"} />
        </div>;
};

export const UrlInput = () => {
    return <TextInputControl label= "Campaign Url" dispatchCommand={setCampaignUrl} regex={new RegExp(urlRegex)} />;
};

export const WarriorNameInput = () => {
    return <TextInputControl label= "Warrior name (min. 3 characters)" dispatchCommand={setWarriorName} regex={new RegExp(nameRegex)} />;
};

export const TextInputControl = ({label, dispatchCommand, regex, placeholder} : {label: string; dispatchCommand: ActionCreatorWithPayload<string, string>; regex: RegExp; placeholder?: string}) => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>("");
    const onChangeHandler = (txt: string) => {
        setText(txt);
        if (regex.test(txt)) {
            dispatch(dispatchCommand(txt));
        } else {
            dispatch(dispatchCommand(""));
        }
    };
    return <div className="input-container">
        <label className="input-label">{label}</label>
        <input
            onChange={(e: any) => onChangeHandler(e.target.value)}
            placeholder={placeholder || "Start typing..." }
            className="input-field" />
            <FontAwesomeIcon icon={regex.test(text) ? faCircleCheck : faCircleXmark} className={regex.test(text) ? "input-icon input-icon-ok" : "input-icon input-icon-not-ok"} />
        </div>;
};
