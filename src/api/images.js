import axios from "axios";

export const getAllImagesService = () => {
  return axios.get(`/images/`);
};

export const getImagesByHashtagService = hashtag => {
  return axios.get(`/images/${hashtag}`);
};

export const UploadImageService = action => {
  return axios.post("images/uploadimage", action.file, action.config);
};
