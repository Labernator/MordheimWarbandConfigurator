import { useLocation, useNavigate } from "react-router-dom";
import { loadWarband } from "../redux/slices/warbandSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IWarband, isMordheimConfigWarband } from "../types/warband";
import { getWarbandRating } from "../utilities/warbandProvider";
import React, { useState } from "react";
import { ButtonControl } from "./Button";
import { IWarrior } from "../types/warrior";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { PurchaseWeapons } from "./Tabstrip";
import { loadWarrior } from "../redux/slices";

export const LocalStorageControl = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const myStorage: string[] = Object.values(localStorage);
    const actualMordheimStorage = myStorage.filter((stateString) => {
        const state: IWarband = JSON.parse(stateString);
        if (!isMordheimConfigWarband(state)) {
            return false;
        }
        return true;
    });
    const handleOnClick = () => {
        if (selectedStorage) {
            dispatch(loadWarband(selectedStorage));
            navigate("/overview");
        }
    };
    const [selectedStorage, setSelectedStorage] = useState<IWarband>();
    return <React.Fragment><table className="table">
        <thead>
            <tr>
                <td>Warband</td>
                <td>Faction</td>
                <td>Rating</td>
            </tr>
        </thead>
        <tbody>
            {actualMordheimStorage.length > 0 ?
                actualMordheimStorage.map((stateString) => {
                    const state: IWarband = JSON.parse(stateString);
                    const rating = getWarbandRating(state.warriors);
                    const className = selectedStorage?.name === state.name && rating === getWarbandRating(selectedStorage.warriors) ? "focused" : "";
                    return <tr onClick={() => setSelectedStorage(state)} key={`${state.name}${rating}`}>
                        <td className={className}>{state.name}</td>
                        <td className={className}>{state.faction || ""}</td>
                        <td className={className}>{rating}</td>
                    </tr>;
                }) :
                <tr><td colSpan={3}>Nothing has been stored yet or you have cleared your cache</td></tr>
            }
        </tbody>
    </table>
        <ButtonControl label={"Load selected warband"} command={handleOnClick} enabled={!!selectedStorage} />
    </React.Fragment>;
};

export const EquipmentControl = ({ currentWarrior }: { currentWarrior?: IWarrior }) => {
    let warrior = useAppSelector((state) => state.tempwarrior);
    const location = useLocation();
    const dispatch = useAppDispatch();
    if (currentWarrior) {
        warrior = currentWarrior;
    }
    const currentEquipment = warrior.Equipment || [];
    const toggleShop = () => setShowShop(!showShop);
    const [showShop, setShowShop] = useState<boolean>(false);

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
                {location.pathname === "/overview" || currentWarrior?.FixedEquipment ? null : <div style={{ paddingTop: "0.5em" }} onClick={() => { dispatch(loadWarrior(warrior)); toggleShop(); }} ><FontAwesomeIcon className={"equipment-icon"} icon={showShop ? faMinusSquare : faSquarePlus} /></div>}
            </div>
            : null
        }
        {showShop ? <PurchaseWeapons></PurchaseWeapons> : undefined}
    </React.Fragment>;

    // return <React.Fragment>
    //     {warrior.EquipmentList ?
    //         <table className="table">
    //             <colgroup>
    //                 <col style={{ width: "55%", textAlign: "left" }} />
    //                 <col style={{ width: "15%", textAlign: "center" }} />
    //                 <col style={{ width: "15%" }} />
    //                 <col style={{ width: "15%" }} />
    //             </colgroup>
    //             <thead>
    //                 <tr>
    //                     <td>Equipment</td>
    //                     <td></td>
    //                     <td></td>
    //                     <td></td>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {warrior.HasFreeDagger ? <tr><td colSpan={4}>Dagger (free)</td></tr> : undefined}
    //                 {currentEquipment.map((equi) => {
    //                         return <tr key={`${equi}${equi.Price}`}>
    //                             <td >{equi.Quantity > 1 ? `${equi.Quantity}x `: ""}{equi.EquipmentName}</td>
    //                             <td className="equipmentAction"><FontAwesomeIcon className={"equipment-icon"} icon={faDollarSign}/></td>
    //                             <td className="equipmentAction"><FontAwesomeIcon className={"equipment-icon"} icon={faSuitcase}/></td>
    //                             <td className="equipmentAction"> <FontAwesomeIcon className={"equipment-icon"} icon={faX}  onClick={() => dispatch(removeWeapon(equi)) }/></td>
    //                         </tr>;
    //                     }) 
    //                 }
    //                 <tr onClick={() => toggleShop()}><td colSpan={4} ><FontAwesomeIcon style={{float: "left"}}className={"equipment-icon"} icon={showShop ? faMinusSquare : faPlusSquare}/><div className="equipment-purchase-more">purchase more equipment</div></td></tr>
    //             </tbody>
    //         </table> :
    //         undefined}
    //         {showShop ? <PurchaseWeapons></PurchaseWeapons>: undefined}
    // </React.Fragment>

};