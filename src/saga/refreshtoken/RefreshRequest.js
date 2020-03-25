import { takeLatest, call, put, all } from 'redux-saga/effects';
import refreshActions, { refreshTypes } from '../../redux/loginRequest/RefreshRequestRedux';
import { useHistory } from 'react-router-dom';
import { refreshRequest, setAuthorizationBearer } from '../../requests';

function* login(action) {
  try {
    const response = yield call(refreshRequest, action.data);

    if (response.status >= 200 && response.status < 400) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setAuthorizationBearer(response.data.token);

      yield put(refreshActions.refreshSuccess(response.data));
    } else {
      yield put(refreshActions.refreshFailure(response.data));
    }
  } catch (e) {
    yield put(refreshActions.refreshFailure(e && e.response && e.response.data));
    console.log(e);
  }
}

export default function*() {
  yield takeLatest(refreshTypes.REFRESH_REQUEST, login);
}
