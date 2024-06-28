import React from "react";
import { Link } from "react-router-dom";
import fs from 'fs';
import csv from 'csv-parser';

const results: string[] = [];

fs.createReadStream('../staticData/Units.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // Output: Array of objects, each representing a row in the CSV
  });
export const LandingPage = () => {
    return <React.Fragment>
        <h2>Create new warband</h2>
        <Link to="/creator" state="Middenheim"><div className="gangTile_xHBb"><div className="gangTile_xHBb middenheim"></div><h2>Middenheim</h2></div></Link>
        <Link to="/creator" state="Skaven"><div className="gangTile_xHBb"><div className="gangTile_xHBb skaven"></div><h2>Skaven</h2></div></Link>
        <Link to="/creator" state="The Possessed"><div className="gangTile_xHBb"><div className="gangTile_xHBb possessed"></div><h2>The Possessed</h2></div></Link>
        <label htmlFor="file-uploader" className="flex-container">
            <input
                id="file-uploader"
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={() => {
                    const reader = new FileReader();
                    reader.onload = (ev: ProgressEvent<FileReader>) => {
                        // setWarbandList(JSON.parse(ev.target?.result as string));
                    };
                    reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
                }}
            />
            <button className="page-btn" onClick={() => document.getElementById("file-uploader")?.click()}>Load crew from file</button>
        </label>
    </React.Fragment>;
};


