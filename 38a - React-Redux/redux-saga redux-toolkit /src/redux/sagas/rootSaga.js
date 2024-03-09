import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getUsersFailure, getUsersSuccess } from "../modules/userSlice";

function* workGetCatsFetch() {
    try {
        const users = yield call(() =>
            fetch("https://jsonplaceholder.typicode.com/users")
        );
        const formatedUsers = yield users.json();
        const formatedUsersShortened = formatedUsers.slice(0, 10);
        yield put(getUsersSuccess(formatedUsersShortened));
    } catch (error) {
        yield put(getUsersFailure());
    }
}

function* userSaga() {
    yield takeEvery("user/getUsersFetch", workGetCatsFetch);
}

function* rootSaga() {
    yield all([
        fork(userSaga)
    ])
}

export default rootSaga;
