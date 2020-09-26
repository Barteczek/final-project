import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux.js';

import { ProductBox } from '../../features/ProductBox/ProductBox'

import styles from './ProductList.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>ProductList</h2>
    <ProductBox />
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as ProductList,
  Container as ProductList,
  Component as ProductListComponent,
};
