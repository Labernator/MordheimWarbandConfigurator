import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import messageReducer from './slices/messageSlice';
import warriorReducer from './slices/warriorSlice';
import warbandReducer from './slices/warbandSlice';
import fundsReducer from './slices/fundsSlice';

const reducer = {
    message: messageReducer,
    warrior: warriorReducer,
    warband: warbandReducer,
    funds: fundsReducer,
};

export const store = configureStore({reducer});
export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()