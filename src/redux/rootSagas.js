
// Modules
import { all } from 'redux-saga/effects';

// Saga
import { dispatcherSaga } from './dispatcher/saga';

function* rootSagas() {
    // here we initialize all the saga from different files
    yield all([
        ...dispatcherSaga,
    ]);
}

export default rootSagas;