import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  EDIT_SERVICE_CANCEL,
  EDIT_SERVICE_SUCCESS,
  EDIT_CHANGE_SERVICE_FIELD,
  REMOVE_SERVICE_FAILURE,
  EDIT_SERVICE_FAILURE,
  FETCH_EDIT_SERVICE_REQUEST,
  FETCH_EDIT_SERVICE_SUCCESS,
  EDIT_SERVICE_REDIRECTED
} from './actionTypes';

export const editServcieRedirected = () => ({
  type: EDIT_SERVICE_REDIRECTED
})
export const fetchEditServiceRequest = () => ({
  type: FETCH_EDIT_SERVICE_REQUEST,
});

export const fetchEditServiceSuccess = editableItem => ({
  type: FETCH_EDIT_SERVICE_SUCCESS,
  payload: {
    editableItem
  }
});

export const editServiceSuccess = () => ({
  type: EDIT_SERVICE_SUCCESS
});

export const editServiceCancel = () => ({
  type: EDIT_SERVICE_CANCEL
}); 

export const editServiceFailure = error => ({
  type: EDIT_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const editChangeServiceField = (name, value) => ({
  type: EDIT_CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const fetchServicesRequest =() => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const removeServiceFailure = message => ({
  type: REMOVE_SERVICE_FAILURE,
  payload: {
    message,
  },
});

export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());

  try {
    const response = await fetch(process.env.REACT_APP_API_URL);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    dispatch(fetchServicesSuccess(data));
  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }
};

export const removeService = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (e) {
    dispatch(removeServiceFailure(e.message));
  } finally {
    dispatch(fetchServices());
  }
};

export const fetchEditService = (id) => async (dispatch) => {
  dispatch(fetchEditServiceRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    dispatch(fetchEditServiceSuccess(data));
  } catch (error) {
    dispatch(editServiceFailure(error.message));
  }
};

export const EditService = () => async (dispatch, getState) => {
  dispatch(fetchEditServiceRequest());

  const {serviceEdit: {item: {id, name, price, content}}} = getState();
  const data = {
    "id": Number(id),
    "name": name,
    "price": Number(price),
    "content": content
  }
 
  try {
    const response = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    await dispatch(editServiceSuccess());
    dispatch(removeService(id));
    dispatch(editServcieRedirected());
    dispatch(fetchServices());
  } catch (e) {
    dispatch(editServiceFailure(e.message));
  }
  
};
