import { connect } from 'react-redux';
import { fetchProducts } from './redux/productsRedux';
import App from './App';

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
});

export default connect(null, mapDispatchToProps)(App);