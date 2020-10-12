import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, addOrderRequest, removeProduct } from '../../../redux/cartRedux.js';

import styles from './Checkout.module.scss';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subtotal: 0,
      name: '',
      surname: '',
      email: '',
      mobile: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.calculateSubtotal(this.props.cart);
    }
  }

  calculateSubtotal = (cart) => {
    let value = 0;
    cart.forEach(product => {
      value += product.count * product.price;
    })
    this.setState({subtotal: value});
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { cart, saveOrder, history } = this.props;
    const { subtotal, name, surname, email, mobile } = this.state;

    const order = {
      name,
      surname,
      email,
      mobile,
      subtotal,
      cart,
    }
    await saveOrder(order);
    history.push('/');
  }

  render() {
    const { className, children, cart } = this.props;
    const { subtotal, name, surname, email, mobile } = this.state;
    
    return (
      <div className={clsx(className, styles.root, 'container')}>
        <h2>Checkout</h2>
        <div className={styles.wrapper}>
          <div className={styles.productsWrapper}>
            {cart.map(product => (
              <div key={product._id} className={styles.product}>
                <img src={product.img} alt={product.name}/>
                <div>
                  <h5>{product.name}</h5>
                  <span>{product.count} x ${product.price}</span>
                </div>
                <h6>${product.count * product.price}</h6>
                {product.comment ?
                <div className={styles.commentSection}>
                  <span>Comment:</span>
                  <p>{product.comment}</p>
                </div>
                :
                null
                }
              </div>  
            ))}
            <h4>Subtotal: ${subtotal}</h4>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" name='name' value={name} onChange={this.handleChange} required/>
            </label>
            <label>
              Surname:
              <input type="text" name='surname' value={surname} onChange={this.handleChange} required/>
            </label>
            <label>
              Email:
              <input type="email" name='email' value={email} onChange={this.handleChange} required/>
            </label>
            <label>
              Mobile:
              <input type="text" name='mobile' value={mobile} onChange={this.handleChange} required/>
            </label>
            {cart.length > 0 ? 
              <input type="submit" value="ORDER" /> : 
              null
            }
          </form>
        </div>
        {children}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.array,
  saveOrder: PropTypes.func,
  getCart: PropTypes.func,
};

const mapStateToProps = state => ({
  cart: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  saveOrder: order => dispatch(addOrderRequest(order)),
  removeProduct: id => dispatch(removeProduct(id))
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Checkout,
  Container as Checkout,
  Component as CheckoutComponent,
};
