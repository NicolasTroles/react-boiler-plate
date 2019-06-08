/* Modules */
import { call, put, takeEvery } from 'redux-saga/effects';

/* Services */
import DispatcherService from '../../services/dispatcher';

/* Types */
import {
    FETCH_COMPANIES,
} from './types';

function* fetchCompanies(action) {
    try {
        const response = yield call(DispatcherService.getCompanies);

        if (response.status === 200) {
            yield put({ type: FETCH_COMPANIES.SUCCESS, data: response.data });
        }
    } catch (e) {
        yield put({ type: FETCH_COMPANIES.FAILURE, error: e.response });
    }
}

export const dispatcherSaga = [
    takeEvery(FETCH_COMPANIES.REQUEST, fetchCompanies),
];