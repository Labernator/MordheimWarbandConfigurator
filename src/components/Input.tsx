import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useState } from "react";
import { setCampaignUrl } from "../redux/slices/warbandSlice";
import { setWarriorName } from "../redux/slices/warriorSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const urlRegex = new RegExp("/^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$/");

export const UrlInput = () => {
    return <TextInputControl label= "Campaign Url" dispatchCommand={setCampaignUrl} regex={new RegExp(urlRegex)} />;
};

export const TextInputControl = ({label, dispatchCommand, regex, placeholder, prefilled} : {label: string; dispatchCommand: ActionCreatorWithPayload<string, string>; regex: RegExp; placeholder?: string; prefilled?: string}) => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>(prefilled || "");
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
