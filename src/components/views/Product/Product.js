import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchProductById } from '../../../redux/productsRedux.js';

import styles from './Product.module.scss';

const Component = ({className, children, product, id, fetchById}) => {

  useEffect(() => {
    fetchById(id);
  }, [fetchById, id]);

  const {name, price } = product;
  
  return (
    <div className={clsx(className, styles.root)}>
      <h2>Product</h2>
      <h2>{name}</h2>
      <h2>{price}</h2>
      
      
      {children}
    </div>
  );
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  product: PropTypes.object,
  id: PropTypes.string,
  fetchById: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  product: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchById: id => dispatch(fetchProductById(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Product,
  Container as Product,
  Component as ProductComponent,
};
