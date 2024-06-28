import React, { useEffect, useState } from "react";
import { NavHeader } from "../../components/navheader";
import './roster.css';
import * as Sample from "../../staticData/sampleRoster.json";
import { UnitCard } from "../../components/unitCard";
import { WarbandCard } from "../../components/warbandCard";
import { IWarband } from "../../staticData";

export const RosterPage = () => {
    const [warbandList, setWarbandList] = useState<IWarband>(Sample);
    useEffect(() => undefined, [warbandList]);
    if (!warbandList) {
        return <React.Fragment></React.Fragment>;
    }
    const createContainer = (units: JSX.Element[]) => <div className="pdf-container">{units}</div>;
    const liste = warbandList.units.map((unit) => <UnitCard unit={unit} />)
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
        <NavHeader  />
        <h2>Create new warband</h2>
        <div className="gangTile_xHBb"><div className="gangTile_xHBb middenheim"></div><h2>Middenheim</h2></div>
        <div className="gangTile_xHBb"><div className="gangTile_xHBb skaven"></div><h2>Skaven</h2></div>
        <div className="gangTile_xHBb"><div className="gangTile_xHBb possessed"></div><h2>The Possessed</h2></div>
        <label htmlFor="file-uploader" className="flex-container">
            <input
                id="file-uploader"
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={() => {
                    const reader = new FileReader();
                    reader.onload = (ev: ProgressEvent<FileReader>) => {
                        setWarbandList(JSON.parse(ev.target?.result as string));
                    };
                    reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
                }}
            />
            <button className="page-btn" onClick={() => document.getElementById("file-uploader")?.click()}>Load crew from file</button>
        </label>
        <div className="pdf-container"><WarbandCard warband={warbandList} /></div>
        {/* <div className="pdf-container"><PlotCard warband={warbandList} /></div> */}
        {collectContainers()}
    </React.Fragment>;
};


