import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './ProductBox.module.scss';

const Component = ({className, children, name, price, images, _id}) => {

  const history = useHistory();

  return (
    <div className={clsx(className, styles.root)} onClick={() => history.push(`/products/${_id}`)}>
      <img src={images[0]} alt={name}></img>
      <h3>{name}</h3>
      <h5>from ${price}</h5>
      {children}
    </div>
  )
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  images: PropTypes.array,
  _id: PropTypes.string,
  };

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as ProductBox,
  // Container as ProductBox,
  Component as ProductBoxComponent,
};
