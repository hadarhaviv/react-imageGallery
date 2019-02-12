import { takeEvery, call, fork, put } from "redux-saga/effects";
import Types from "../actions/actionsTypes";
import * as actions from "../actions/images";
import * as api from "../api/images";

function* getAllImages() {
  try {
    const result = yield call(api.getAllImagesService);
    yield put(actions.getImagesDone(result.data));
  } catch (e) {
    console.log(e);
  }
}

function* getImagesByHashTag(action) {
  try {
    const result = yield call(api.getImagesByHashtagService, action.payload);
    yield put(actions.getImagesDone(result.data));
  } catch (e) {
    console.log(e);
  }
}

function* uploadImage(action) {
  try {
    const result = yield call(api.UploadImageService, action);
    yield put(actions.uploadImageDone(result.data));
  } catch (e) {
    console.log(e);
  }
}

function* watchGetAllImages() {
  yield takeEvery(Types.GET_ALL_IMAGES, getAllImages);
}
function* watchGetImagesByHashtag() {
  yield takeEvery(Types.GET_IMAGES_BY_HASHTAG, getImagesByHashTag);
}

function* watchUploadImage() {
  yield takeEvery(Types.UPLOAD_IMAGE, uploadImage);
}

const imagesSagas = [
  fork(watchGetAllImages),
  fork(watchGetImagesByHashtag),
  fork(watchUploadImage)
];

export default imagesSagas;
