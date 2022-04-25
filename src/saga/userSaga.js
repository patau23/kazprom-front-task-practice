import { put, call, takeEvery } from "redux-saga/effects";
import { useSnackbar } from "notistack";

import { FETCH_USERS, setUsers } from "../store/userReducer";
import { usersQuery } from "../requests/getUsers";

const fetchUsers = () =>
  fetch("https://graphqlzero.almansi.me/api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: usersQuery, // тело запроса, в котором лежит graphql query
  });

function* fetchUserWorker() {
  const response = yield call(fetchUsers); // Получили ответ (response)
  const parsedJson = yield call(
    () => new Promise((res) => res(response.json())) // распарсили его через промис
  );
  const usersListOnly = parsedJson.data.users.data; // взяли только массив с юзерами
  usersListOnly.forEach((item) => {
    item.id = Number(item.id);
  });
  yield put(setUsers(usersListOnly)); // отправили в редюсер
}

export function* userWatcher() {
  yield takeEvery(FETCH_USERS, fetchUserWorker);
}
