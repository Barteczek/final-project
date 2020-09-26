import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({className, children}) => (
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
        <i class="fas fa-shopping-basket"></i>
      </a>
    </nav>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
