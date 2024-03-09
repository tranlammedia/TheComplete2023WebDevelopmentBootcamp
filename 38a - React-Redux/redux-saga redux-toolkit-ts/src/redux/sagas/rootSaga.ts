import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { getUsersSuccess, getUsersFailure } from "../modules/userSlice";

function* workGetUserFetch() {
    try {
        const users: Response = yield call(
            fetch,
            "https://jsonplaceholder.typicode.com/users"
        );
        const formatedUsers: any[] = yield users.json();
        const formatedUsersShortened = formatedUsers.slice(0, 10);
        yield put(getUsersSuccess(formatedUsersShortened));
    } catch (error) {
        yield put(getUsersFailure());
    }
}

function* userSaga() {
    yield takeEvery("user/getUsersFetch", workGetUserFetch);
}
function* rootSaga() {
    yield all([fork(userSaga)]);
}

export default rootSaga;
