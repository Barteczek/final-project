import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { changeCart, removeProduct } from '../../../redux/cartRedux.js';

import styles from './CartProduct.module.scss';

const Component = ({className, children, img, name, price, count, _id, updateCart, removeProduct}) => {

  const valueAlert = 'The value should be a number between 1-9';

  const [stateCount, setCount] = useState(count);
  const [showComment, setVisibility] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    updateCart(_id, stateCount, comment)
  }, [updateCart, _id, stateCount, comment]);

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

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const type = target.type;
    if(type === 'text') {
      const newValue = parseInt(value);
      if(typeof(newValue) === 'number' && newValue <= 9 && newValue >= 1) {
        setCount(newValue);
      } else alert(valueAlert);
    } else if(type === 'checkbox'){
      setVisibility(value);
    } else if(type === 'textarea'){
      setComment(value);
    }
  }

  const handleRemove = () => {
    updateCart(_id, 0)
    removeProduct(_id);
  }

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.miniature}>
        <img src={img} alt={name} />
      </div>
      <h5>{name}</h5>
      <div className={styles.countWrapper}>
        <button onClick={handleIncrease}><i className='fas fa-plus'></i></button>
        <input type='text' value={stateCount} onChange={(e) => handleChange(e)}/>
        <button onClick={handleDecrease}><i className='fas fa-minus'></i></button>
      </div>
      <div className={styles.priceWrapper}>
        <h5>${price * stateCount}</h5>
        {stateCount > 1 ?
        <span>${price} per piece</span> : 
        null}
      </div>
      <button onClick={handleRemove}>
        <i className='fas fa-trash-alt'></i>
      </button>
      <div className={styles.commentWrapper}>
        <label>
          Add a comment:
          <input 
            name='showComment'
            type='checkbox' 
            onChange={(e) => handleChange(e)}/>
        </label>
        <textarea className={showComment ? '' : styles.hide}
          value={comment}
          onChange={(e) => handleChange(e)}
          rows={2}
          placeholder='Write Your comment here...'
          maxLength='500'
        />

      </div>
      
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
  removeProduct: PropTypes.func,
};

// const mapStateToProps = state => ({
//   cart: getAll(state),
// });

const mapDispatchToProps = dispatch => ({
  updateCart: (id, count, comment) => dispatch(changeCart(id, count, comment)),
  removeProduct: id => dispatch(removeProduct(id)),
});

const Container = connect(null, mapDispatchToProps)(Component);

export {
  // Component as CartProduct,
  Container as CartProduct,
  Component as CartProductComponent,
};
