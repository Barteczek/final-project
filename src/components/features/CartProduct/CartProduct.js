import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { changeCart } from '../../../redux/cartRedux.js';

import styles from './CartProduct.module.scss';

const Component = ({className, children, img, name, price, count, _id, updateCart}) => {

  const valueAlert = 'The value should be a number between 1-9';

  const [stateCount, setCount] = useState(count);

  useEffect(() => {
    updateCart(_id, stateCount)
  }, [updateCart, _id, stateCount]);

  const handleIncrease = () => {
    if(stateCount < 9 ) {
      setCount(stateCount + 1);
    }
    else alert(valueAlert);
  }

  const handleDecrease = () => {
    if(stateCount > 1 ) {
      setCount(stateCount - 1);
    }
    else alert(valueAlert);
  }

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    if(typeof(newValue) === 'number' && newValue <= 9 && newValue >= 1) {
      setCount(newValue);
    } else alert(valueAlert);
  }

  return (
    <div className={clsx(className, styles.root, 'container')}>
      <div className={styles.miniature}>
        <img src={img} alt={name} />
      </div>
      <h5>{name}</h5>
      <div>
        <button onClick={handleIncrease}><i class="fas fa-plus"></i></button>
        <input type='text' value={stateCount} onChange={(e) => handleChange(e)}/>
        <button onClick={handleDecrease}><i class="fas fa-minus"></i></button>
      </div>
      <div>
        <h5>${price * stateCount}</h5>
        {stateCount > 1 ?
        <span>${price} per piece</span> : 
        null}
      </div>
      <button>
        <i class="fas fa-trash-alt"></i>
      </button>
      {children}
    </div>
  )
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
  updateCart: PropTypes.func,
  _id: PropTypes.string,
};

// const mapStateToProps = state => ({
//   cart: getAll(state),
// });

const mapDispatchToProps = dispatch => ({
  updateCart: (id, count) => dispatch(changeCart(id, count)),
});

const Container = connect(null, mapDispatchToProps)(Component);

export {
  // Component as CartProduct,
  Container as CartProduct,
  Component as CartProductComponent,
};
