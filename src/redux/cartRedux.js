/* selectors */
export const getAll = ({ cart }) => cart.data;
export const getCount = ({ cart }) => cart.count;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');

/* action creators */
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });

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

/* INITIAL STATE */

const initialState = {
  data: [],
  count: 0,
};

/* reducer */
export const reducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        data: action.payload.data,
        count: action.payload.count,
      };
    }
    default:
      return statePart;
  }
};

