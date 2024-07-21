import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { setMessage } from "../redux/slices/messageSlice";

export const MessageToast = () => {
    const message = useAppSelector((state) => state.message);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (message) {
            const interval = setInterval(() => {
                dispatch(setMessage(""));
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [dispatch, message]);

    return message ? <div className="message-toast">
        <FontAwesomeIcon  className="message-icon"
            icon={faX}
        /> <div>{message}</div>
    </div> : null;
};
