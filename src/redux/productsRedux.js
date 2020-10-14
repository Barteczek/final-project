import axios from 'axios';
import { API_URL } from '../config';
import { initialState } from './initialState';

/* selectors */
export const getAll = ({ products }) => products.data;
export const getCount = ({ products }) => products.length;

/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const CHANGE_POST = createActionName('CHANGE_POST');
const ADD_POST = createActionName('ADD_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const changePost = payload => ({ payload, type: CHANGE_POST });
export const addPost = payload => ({ payload, type: ADD_POST });

/* thunk creators */
export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchStarted());

    try {
      let res = await axios.get(`${API_URL}/products`);
      dispatch(fetchSuccess(res.data));
    }
    catch(err) {
      dispatch(fetchError(err.message || true));
    }
  }
};

export const fetchProductById = (id) => {
  return async dispatch => {
    dispatch(fetchStarted());

    try {
      let res = await axios.get(`${API_URL}/products/${id}`);

      dispatch(fetchSuccess(res.data));
    }
    catch(err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

/* reducer */
export const reducer = (statePart = initialState.products, action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case CHANGE_POST: {
      const {id, title, price, description} = action.payload;
    
      const newState = {...statePart};
      const index = newState.data.findIndex(post => post._id === id);
      
      newState.data[index].title = title;
      newState.data[index].price = price;
      newState.data[index].description = description;
      
      return newState;
    }
    case ADD_POST: {
      const newState = {...statePart};
      newState.data.push(action.payload);
      
      return newState;
    }
    default:
      return statePart;
  }
};

