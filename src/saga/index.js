import { fork, all } from 'redux-saga/effects';
import login from './login/LoginRequest';
import refresh from './refreshtoken/RefreshRequest';

const sagas = [login, refresh];
console.log('sagas', sagas);
function* rootSaga() {
  const globalSagasForks = sagas.map(saga => fork(saga));
  yield all([...globalSagasForks]);
}
export default rootSaga;
