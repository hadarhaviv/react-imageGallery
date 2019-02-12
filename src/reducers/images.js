import Types from "../actions/actionsTypes";

const INITIAL_STATE = {
  images: []
};

export default function images(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_IMAGES_DONE: {
      return {
        ...state,
        images: action.images
      };
    }
    default: {
      return state;
    }
  }
}
