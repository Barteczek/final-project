import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Footer.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <div>
      <a href='/'>BACK TO TOP</a>
    </div>
    <div className={styles.socialMedia}>
      <a href='/'><i className="fab fa-facebook-f"></i></a>
      <a href='/'><i className="fab fa-instagram"></i></a>
      <a href='/'><i className="fab fa-youtube"></i></a>
      <a href='/'><i className="fab fa-twitter"></i></a>
    </div>
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
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
