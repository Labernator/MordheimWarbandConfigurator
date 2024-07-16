import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPrint } from "@fortawesome/free-solid-svg-icons";

import { exportPdf } from "../utilities/pdfProvider";
import { useAppSelector } from "../redux/store";
import { getWarbandRating, WarbandInfo, WarriorSummary } from "../utilities/warbandProvider";
import { useNavigate } from "react-router-dom";
import { HeaderSection, RulesSection, ShortWargearSection, SkillListsSection, StatsSection, WeaponsSection } from "../components/render/UnitCard";
import { IWarrior } from "../types/warrior";


export const PdfControls = () => {
    const warband = useAppSelector((state) => state.warband);
    const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
    const initName = `${warband.name} - ${warband.faction} (${getWarbandRating(warband.warriors)})`;
    const [pdfName, setPdfName] = useState<string>(initName);
    const onChangeHandler = (input: string) => {
        const name = `${input}.pdf`;
        setIsIncorrect(input.length < 3 ? true : false);
        setPdfName(name);
    };
    return <React.Fragment><h4>Pdf Controls</h4>
        <div className="warband-overview" style={{ marginTop: "1em" }}>
            <div className="content-container">
                <input
                    onChange={(e: any) => onChangeHandler(e.target.value)}
                    placeholder={`${warband.name} - ${warband.faction} (${getWarbandRating(warband.warriors)})`}
                    className={"modal-input"} />
                {isIncorrect ? <div className="tooltip">Enter a file name (min. 3 characters)</div> : null}
                <button className={isIncorrect ? "pdf-button pdf-button-wrong" : "pdf-button pdf-button-correct"} onClick={() => exportPdf(warband, pdfName)}><FontAwesomeIcon icon={faPrint} style={{ width: "1.5em", marginRight: "0.5em" }} />Create Pdf</button>
            </div>
        </div>
    </React.Fragment>
};

export const PdfPage = () => {
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    return <React.Fragment>
        <h2>
            {warband.name}
            <FontAwesomeIcon icon={faHome} style={{ width: "2em", float:"right", paddingTop: "0.25em" }} onClick={() => navigate("/")} />
            </h2>
        <div className="warband-overview">
            <div className="content-container">
                <WarbandInfo />
                <WarriorSummary />
            </div>
        </div>
        <PdfControls />
        <PrintPage/>
    </React.Fragment>;
};

export const PrintPage = () => {
    const warband = useAppSelector((state) => state.warband);
    const createContainer = (warrior: JSX.Element[]) => <div className="pdf-container">{warrior}</div>;
    const liste = warband.warriors.map((warrior) => <PdfUnitCard warrior={warrior}/>)
    const collectContainers = () => {
        const containers = [];
        for (let i = 0; i < liste.length; i++) {
            if ((i + 1) % 4 === 0 && i !== 0) {
                containers.push(createContainer(liste.filter((_val, idx) => idx <= i && idx >= (i - 3))));
            }
            else if (i === liste.length - 1) {
                containers.push(createContainer(liste.filter((_val, idx) => idx <= i && idx > i - ((i + 1) % 4))));
            }
        }
        return containers;
    }
    return <React.Fragment>
        {/* <div className="pdf-container"><WarbandCard warband={warbandList} /></div> */}
        {collectContainers()}
    </React.Fragment>;
};


export const PdfUnitCard = ({ warrior }: { warrior: IWarrior }) => {
    return <React.Fragment>
        <div className="pdf-unit-card">
            <HeaderSection unit={warrior} isPdf={true}/>
            <StatsSection unit={warrior} />
            <WeaponsSection warrior={warrior} />
            <table className="unit-table">
                <tbody>
                    <ShortWargearSection unit={warrior} />
                    <SkillListsSection unit={warrior} />
                    <RulesSection unit={warrior} />
                </tbody>
            </table>

        </div>
    </React.Fragment>;
};
