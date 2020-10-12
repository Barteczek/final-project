import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAll = ({ cart }) => cart.data;
export const getCount = ({ cart }) => cart.count;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */

export const saveCart = (payload) => {
  return (dispatch, getState) => {

    const newState = getState().cart;
    const foundIndex = newState.data.findIndex(element => element._id === payload._id);

    if(foundIndex >= 0){
      newState.data[foundIndex].count += payload.count;
    } else newState.data.push(payload);

    newState.count += payload.count;
  
    localStorage.setItem('cart', JSON.stringify(newState));
    dispatch(fetchSuccess(newState));
  }
}
  
export const getCart = () => {
  return (dispatch) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if(cart) dispatch(fetchSuccess(cart));
  }
}

export const changeCart = (id, count, comment) => {
  
  return (dispatch, getState) => {
  
    const newState = getState().cart;
    const foundIndex = newState.data.findIndex(element => element._id === id);

    newState.count -= newState.data[foundIndex].count
    newState.count += count;

    newState.data[foundIndex].count = count;
    newState.data[foundIndex].comment = comment;

    localStorage.setItem('cart', JSON.stringify(newState));
    dispatch(fetchSuccess(newState));
  }
}

export const removeProduct = (id) => {
  
  return (dispatch, getState) => {
    const newState = getState().cart;
    
    newState.data = newState.data.filter(element => element._id !== id);

    localStorage.setItem('cart', JSON.stringify(newState));
    
    dispatch(fetchSuccess(newState));
  }
}

export const addOrderRequest = (order) => {
  return async dispatch => {

    try {
      await axios.post(`${API_URL}/orders`, order);
      alert('Thank you for your order. Our Customer Service will contact shortly')
      localStorage.removeItem('cart');
      dispatch(fetchSuccess(initialState));
    } catch(e) {
      dispatch(fetchError(e.message || true));
    }
  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  count: 0,
};

/* reducer */
export const reducer = (statePart = initialState, action = {}) => {
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
        data: action.payload.data,
        count: action.payload.count,
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
    default:
      return statePart;
  }
};

