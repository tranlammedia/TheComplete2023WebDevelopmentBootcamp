import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counterSlice";

export const store = configureStore({
    reducer: { counter: counterReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
