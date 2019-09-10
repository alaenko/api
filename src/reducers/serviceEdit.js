import {
  EDIT_SERVICE_SUCCESS,
  EDIT_SERVICE_CANCEL,
  EDIT_SERVICE_FAILURE,
  EDIT_CHANGE_SERVICE_FIELD,
  FETCH_EDIT_SERVICE_REQUEST,
  FETCH_EDIT_SERVICE_SUCCESS,
  EDIT_SERVICE_REDIRECTED
} from '../actions/actionTypes'

const initialState = {
  item: null,
  loading: false,
  error: null,
  redirect: false
};

export default function serviceEditReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_SERVICE_REDIRECTED:
      return {
        ...state,
        redirect: false
      }
    case FETCH_EDIT_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_EDIT_SERVICE_SUCCESS:
      const {editableItem} = action.payload;
      return {
        ...state,
        item: editableItem,
        loading: false,
        error: null
      };
    case EDIT_SERVICE_CANCEL:
      return {...initialState};
    case EDIT_SERVICE_SUCCESS:
      return {...initialState,
        redirect: true
      };
    case EDIT_SERVICE_FAILURE:
        const error = action.payload;
      return error;
    case EDIT_CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      const {item} = state;
      return {
        ...state,
        item: {
          ...item,
          [name]: value,
        }
      }
    default:
      return state;
  }
}
