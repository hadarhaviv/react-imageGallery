import Types from "./actionsTypes";

export const getAllImages = () => ({
  type: Types.GET_ALL_IMAGES
});

export const getImagesByHashtag = hashtag => ({
  type: Types.GET_IMAGES_BY_HASHTAG,
  payload: hashtag
});

export const getImagesDone = images => ({
  type: Types.GET_IMAGES_DONE,
  images
});

export const uploadImage = (file, config) => ({
  type: Types.UPLOAD_IMAGE,
  file,
  config
});

export const uploadImageDone = () => ({
  type: Types.UPLOAD_IMAGE_DONE
});

export const uploadImageInit = () => ({
  type: Types.UPLOAD_IMAGE_INIT
});
