import React from "react";
import { IWarband } from "../staticData";
export const WarbandCard = ({ warband }: { warband: IWarband | undefined }) => {
    if (!warband) {
        return <React.Fragment></React.Fragment>;
    }
    return <React.Fragment>
        <div className="warband-card" style={{height: "100%", width: "100%"}}>
            <div className="warband-name-bg">
                <div className="warband-name">
                    <h5 className="d-md-inline-block"><span className="badge badge-light mr-2" id="warband-label"></span>{warband.name}<small className="ml-2">-</small><small className="ml-2">{warband.faction}</small></h5>
                </div>
            </div>
            <div className="button button--primary button--lg" >Warband Rating : {warband.rating}</div>
            <div className="button button--primary button--lg" >Body Count : {warband.bodycount}</div>
            <div className="button button--primary button--lg" >Rout Limit : {warband.routlimit}</div>
            <div className="button button--primary button--lg" >Campaign Points : {warband.campaignpoints}</div>
            <div className="button button--primary button--lg" >Stashed Gold : {warband.cash}</div>
            <div className="button button--primary button--lg" >Treasures : {warband.treasure}</div>

            {warband.stash ?<table className="warband-table warband-stats warband-table-sm mt-2" style={{fontSize: "1rem"}}>
                <thead>
                    <tr>
                        <th style={{width: "25%", textAlign: "left"}}>Stash</th>
                    </tr>
                </thead>
                <tbody>
                    {warband.stash.map((item) => {
                        return <tr><td style={{ textAlign: "left"}}>{item}</td></tr>
})}
                </tbody>
            </table>     : undefined}
        </div>
    </React.Fragment>;
};
