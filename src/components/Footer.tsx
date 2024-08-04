import { faCheckSquare, faFilePdf, faFloppyDisk, faHome, faRectangleList, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { saveWarbandToFile } from "../utilities/fileOperations";
import { loadWarrior , resetDelta } from "../redux/slices";
import { initialWarrior } from "../types/warrior";

export const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    const isHomeScreen = location.pathname === "/";
    const isOverview = location.pathname === "/overview";
    const isPdf = location.pathname === "/print-pdf";
    return <div className="footer">
        <div className="footer-section">
            <FontAwesomeIcon icon={faHome} className={isHomeScreen ? "footer-icon disabled" : "footer-icon"} onClick={() => isHomeScreen ? undefined : navigate("/")} />
            <div>Home</div>
        </div>
        <div className="footer-section">
            <FontAwesomeIcon icon={faRectangleList} className={isHomeScreen || isOverview ? "footer-icon disabled" : "footer-icon"} onClick={() => isHomeScreen || isOverview ? undefined : navigate("/overview")} />
            <div>Overview</div>
        </div>
        <div className="footer-section">
            <FontAwesomeIcon icon={faFilePdf} className={isHomeScreen || isPdf ? "footer-icon disabled" : "footer-icon"} onClick={() => isHomeScreen || isPdf ? undefined : navigate("/print-pdf")} />
            <div>Print roster</div>
        </div>
        <div className="footer-section">
            <FontAwesomeIcon icon={faFloppyDisk} className={isHomeScreen ? "footer-icon disabled" : "footer-icon"} onClick={(e) => isHomeScreen ? undefined : saveWarbandToFile(e, warband)} />
            <div>Save</div>
        </div>
    </div>
}

export const MaintainFooter = ({submitAction, isEnabled}: {submitAction: () => void; isEnabled: boolean}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cancelAction = () => {
        dispatch(loadWarrior(initialWarrior));
        dispatch(resetDelta())
        navigate("/overview");
    }
    return <div className="footer">
        <div className="footer-section">
            <FontAwesomeIcon icon={faX} className={"footer-icon"} onClick={() => cancelAction()} />
            <div>Cancel</div>
        </div>
        <div className="footer-section">
            <FontAwesomeIcon icon={faCheckSquare} className={isEnabled ? "footer-icon": "footer-icon disabled"} onClick={() => isEnabled ? submitAction() : undefined } />
            <div>Submit</div>
        </div>
    </div>
}