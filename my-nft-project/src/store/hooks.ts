// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './index';

// `useAppDispatch` hook provides the correctly typed dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>();

// `useAppSelector` hook provides the correctly typed selector function
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
