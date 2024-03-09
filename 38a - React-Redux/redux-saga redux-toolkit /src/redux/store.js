import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counterSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import userReducer from "./modules/userSlice";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
