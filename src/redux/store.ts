import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import warriorReducer from "./slices/warriorSlice";
import warbandReducer from "./slices/warbandSlice";
import deltaReducer from "./slices/deltaSlice";
import logReducer from "./slices/logSlice";
const reducer = {
    tempwarrior: warriorReducer,
    warband: warbandReducer,
    delta: deltaReducer,
    templog: logReducer,
};

export const store = configureStore({reducer, devTools: true});
export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();