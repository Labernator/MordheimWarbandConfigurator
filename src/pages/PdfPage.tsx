import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExportWarbandButton, GeneratePdfButton, SaveButton } from "../components/Button";
import { Footer } from "../components/Footer";
import { HeaderSection, RulesSection, ShortWargearSection, StatsSection, WeaponsSection } from "../components/render/UnitCard";
import { useAppSelector } from "../redux/store";
import { IWarrior } from "../types/warrior";

export const PdfControls = () => {
    return <React.Fragment>
        <div className="section-container">
            <div className="header-1">Pdf Export</div>
            <GeneratePdfButton />
        </div>
        <div className="section-container">
            <div className="header-1">Save Warband</div>
            <SaveButton />
            
        </div>
        <div className="section-container">
            <div className="header-1">Export Warband File</div>
            <ExportWarbandButton />
        </div>
    </React.Fragment>;
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
    const liste = warband.warriors.map((warrior) => <PdfUnitCard key="dummy-key" warrior={warrior} />);
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
    };
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
