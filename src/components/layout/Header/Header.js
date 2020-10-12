import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCount } from '../../../redux/cartRedux.js';

import styles from './Header.module.scss';

const Component = ({className, children, cartCount}) => {
  
  useEffect(() => {
    console.log('update')
  }, []);


  return (
    <div className={clsx(className, styles.root)}>
      <nav>
        <div className={styles.links}>
          <a href='/'>Home</a>
          <a href='/about'>About</a>
          <a href='/contact'>Contact</a>
        </div>
        <a href='/' className={styles.logo}>
          <h3>Personalised Watches</h3>
        </a>
        <a href='/cart' className={styles.cart}>
          <i className="fas fa-shopping-basket"></i>
          <span className={cartCount === 0 ? styles.hide : null}>{cartCount}</span>
        </a>
      </nav>
      {children}
    </div>
  );
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cartCount: PropTypes.number,
};

const mapStateToProps = state => ({
  cartCount: getCount(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
