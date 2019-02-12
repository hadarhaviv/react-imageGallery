import { all } from "redux-saga/effects";
import ImagesSagas from "./images";

export default function* rootSaga() {
  yield all([...ImagesSagas]);
}
