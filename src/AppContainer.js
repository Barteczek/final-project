import { connect } from 'react-redux';
import { fetchProducts } from './redux/productsRedux';
import { getCart } from './redux/cartRedux';
import App from './App';

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  getCart: () => dispatch(getCart()),
});

export default connect(null, mapDispatchToProps)(App);