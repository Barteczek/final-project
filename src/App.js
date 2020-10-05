import React from 'react';
import { Switch, Route } from 'react-router-dom';


import MainLayout from './components/layout/MainLayout/MainLayout';

// import routes
import { Homepage } from './components/views/Homepage/Homepage';
import { NotFound } from './components/views/NotFound/NotFound';
import { Product } from './components/views/Product/Product';

class App extends React.Component {

  componentDidMount() {
    const { loadProducts } = this.props;
    loadProducts();
    console.log(this)
  }

  render() {
    return (
      <MainLayout>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/products/:id" exact component={Product} />
            {/* <Route path="/terms-of-use" exact component={TermsOfUse} />
            <Route path="/privacy-policy" exact component={PrivacyPolicy} />
            <Route path="/submit" exact component={Submit} /> */}
            <Route component={NotFound} />
          </Switch>
      </MainLayout>
    );
  }
}

export default App;
