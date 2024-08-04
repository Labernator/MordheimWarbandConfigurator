import React, { useEffect } from "react";

import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { HeaderSection, RulesSection, ShortWargearSection, StatsSection, WeaponsSection } from "../components/render/UnitCard";
import { IWarrior } from "../types/warrior";
import { Footer } from "../components/Footer";
import { PdfInput } from "../components/Input";
import { GeneratePdfButton } from "../components/Button";


export const PdfControls = () => {
    return <div className="section-container">
        <div className="header-1">Pdf Export</div>
        <PdfInput/>
        <GeneratePdfButton/>
    </div>
};

export const PdfPage = () => {
    const navigate = useNavigate();
    const warband = useAppSelector((state) => state.warband);
    useEffect(() => {
        if (!warband.name) {
            navigate("/");
        }
    }, [navigate, warband]);
    return <React.Fragment>
        <h2>
            {warband.name}
        </h2>
        <PdfControls />
        <PrintPage />
        <Footer />
    </React.Fragment>;
};

export const PrintPage = () => {
    const warband = useAppSelector((state) => state.warband);
    const createContainer = (warrior: JSX.Element[]) => <div className="pdf-container">{warrior}</div>;
    const liste = warband.warriors.map((warrior) => <PdfUnitCard warrior={warrior} />)
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
            <HeaderSection unit={warrior} isPdf={true} />
            <StatsSection unit={warrior} />
            <WeaponsSection warrior={warrior} />
            <table className="unit-table">
                <tbody>
                    <ShortWargearSection unit={warrior} />
                    {/* <SkillListsSection unit={warrior} /> */}
                    <RulesSection unit={warrior} />
                </tbody>
            </table>

        </div>
    </React.Fragment>;
};
