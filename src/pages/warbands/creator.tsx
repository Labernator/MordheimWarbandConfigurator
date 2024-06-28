import React, { useEffect, useState } from "react";
import { NavHeader } from "../../components/navheader";
import './roster.css';
import { ITempWarband, tempWarband } from "../../staticData";
import { useLocation } from "react-router-dom";
import { WarbandCardCreator } from "../../components/warbandCardCreator";

export const CreatorPage = () => {
    const params = useLocation();
    const [warbandList, setWarbandList] = useState<ITempWarband>({...tempWarband, faction: params.state as string});

    useEffect(() => undefined, [warbandList]);
    if (!warbandList) {
        return <React.Fragment></React.Fragment>;
    }
    return <React.Fragment>
        <NavHeader  />
        <WarbandCardCreator warband={warbandList}></WarbandCardCreator>
    </React.Fragment>;
};


