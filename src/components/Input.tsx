import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { setCampaignUrl, setWarbandName } from "../redux/slices/warbandSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { setWarriorName } from "../redux/slices/warriorSlice";
import { setPdfName } from "../redux/slices/pdfSlice";

const nameRegex = new RegExp("[a-zA-Z0-9]{3,}");
const urlRegex = new RegExp("/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/");

export const WarbandNameInput = () => {
    return <TextInputControl label= "Warband name (min. 3 characters)" dispatchCommand={setWarbandName} regex={new RegExp(nameRegex)} />
};

export const UrlInput = () => {
    return <TextInputControl label= "Campaign Url" dispatchCommand={setCampaignUrl} regex={new RegExp(urlRegex)} />
};

export const WarriorNameInput = () => {
    return <TextInputControl label= "Warrior name (min. 3 characters)" dispatchCommand={setWarriorName} regex={new RegExp(nameRegex)} />
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
        </div>
};

export const PdfInput = () => {
    const nameSelector = useAppSelector((state) => state.pdf.name)
    return <TextInputControl label= "PDF name (min. 3 characters)" dispatchCommand={setPdfName} regex={new RegExp(nameRegex)} placeholder={nameSelector}/>
};
