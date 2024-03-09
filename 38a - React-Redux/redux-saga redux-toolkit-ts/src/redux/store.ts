import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counterSlice";
import createSagaMiddleware from "redux-saga";
import userReducer from "./modules/userSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: { 
        counter: counterReducer, 
        users: userReducer 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

sagaMiddleware.run(rootSaga);
export default store;
