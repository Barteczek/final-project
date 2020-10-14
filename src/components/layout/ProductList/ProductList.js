import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux.js';

import { ProductBox } from '../../features/ProductBox/ProductBox'

import styles from './ProductList.module.scss';

const Component = ({className, children, products}) => (
  <div className={clsx(className, styles.root, 'container')}>
    <h2>Featured Collections</h2>
    <div className={styles.productsWrapper}>
      {products.length > 0 ? products.map(product => (
        <div key={product._id}>
          <ProductBox {...product}/>
        </div>
        
      )) : <h1>Loading</h1>}
    </div>  
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  products: PropTypes.array,
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
