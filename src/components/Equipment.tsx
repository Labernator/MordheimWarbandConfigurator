import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import React, { useState } from "react";
import { IWarrior } from "../types/warrior";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { PurchaseWeapons } from "./Tabstrip";
import { loadWarrior } from "../redux/slices";

export const EquipmentControl = ({ currentWarrior, showShop }: { currentWarrior?: IWarrior;  showShop?: boolean }) => {
    let warrior = useAppSelector((state) => state.tempwarrior);
    const location = useLocation();
    const dispatch = useAppDispatch();
    if (currentWarrior) {
        warrior = currentWarrior;
    }
    const currentEquipment = warrior.Equipment || [];

    return <React.Fragment>
        {warrior.EquipmentList?.length ?
            <div style={{ width: "100%", margin: "0.2em 0.0em", padding: "0em 0em 0.5em 0em", display: "flex", flexDirection: "row", borderTop: "0.1em solid color-mix(in srgb, var(--color-emphasis) 50%, white)" }}>
                <div style={{ width: "100%", margin: "0.2em 0.0em", padding: "0em 0em 0.5em 0em", display: "flex", justifyContent: "space-evenly", borderRadius: "0.5em", flexDirection: "column" }}>
                    <div style={{ fontSize: "0.75em" }}>Equipment </div>
                    {warrior.HasFreeDagger ? <div style={{ fontWeight: "bold", padding: "0em 0em 0.5em 0em" }}>Dagger</div> : null}
                    {currentEquipment.map((equi) => {
                        return <div key={"dummy-key"} style={{ fontWeight: "bold", padding: "0em 0em 0.5em 0em" }}>
                            {equi.Quantity > 1 ? `${equi.Quantity}x ` : ""}{equi.EquipmentName}
                            </div>;

                    })
                    }
                </div>
                {/* {location.pathname === "/overview" || currentWarrior?.FixedEquipment ? null : <div style={{ paddingTop: "0.5em" }} onClick={() => { dispatch(loadWarrior(warrior)); toggleShop(); }} ><FontAwesomeIcon className={"equipment-icon"} icon={showShop ? faMinusSquare : faSquarePlus} /></div>} */}
            </div>
            : null
        }
        {showShop && !currentWarrior?.FixedEquipment ? <PurchaseWeapons/>: null }
    </React.Fragment>;

};