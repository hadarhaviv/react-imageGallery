import Types from "../actions/actionsTypes";

const INITIAL_STATE = {
  images: [],
  uploadImage: { success: false }
};

export default function images(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_IMAGES_DONE: {
      return {
        ...state,
        images: action.images
      };
    }
    case Types.UPLOAD_IMAGE_DONE: {
      let uploadDetails = {};
      uploadDetails.success = true;
      return {
        ...state,
        uploadImage: uploadDetails
      };
    }
    case Types.UPLOAD_IMAGE_INIT: {
      let uploadImage = {};
      uploadImage.success = false;
      return {
        ...state,
        uploadImage
      };
    }
    default: {
      return state;
    }
  }
}
