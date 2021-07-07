import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/styles/App.scss';

/*** Layout ***/
import Header from './Components/Layout/Header';
import Sidebar from './Components/Layout/Sidebar';
/*** Clients ***/
import Clients from './Components/Clients/Clients';
import NewClient from './Components/Clients/NewClient';
import EditClient from './Components/Clients/EditClient';

/*** Products ****/
import Products from './Components/Products/Products';
import NewProduct from './Components/Products/NewProduct';
import EditProduct from './Components/Products/EditProduct';

/*** Orders ****/
import Orders from './Components/Orders/Orders';
import NewOrder from './Components/Orders/NewOrder';

/*** Auth ***/
import Login from './Components/Auth/Login';
import { CRMContext, CRMProvider } from './context/CRMContext';
function App() {
  const [auth, setAuth] = useContext(CRMContext);
  return (
    <Router>
      <>
        <CRMProvider value={[auth, setAuth]}>
          <Header />
          <div className='d-flex container'>
            <Sidebar />
            <main className='main-content col-9 bg-white mt-5 mx-auto'>
              <Switch>
                <Route exact path='/' component={Clients} />
                <Route exact path='/clients/new' component={NewClient} />
                <Route
                  exact
                  path='/clients/edit/:idClient'
                  component={EditClient}
                />
                <Route exact path='/products' component={Products} />
                <Route exact path='/products/new' component={NewProduct} />
                <Route
                  exact
                  path='/products/edit/:idProduct'
                  component={EditProduct}
                />
                <Route exact path='/orders' component={Orders} />
                <Route
                  exact
                  path='/orders/new/:idClient'
                  component={NewOrder}
                />

                <Route exact path='/login' component={Login} />
              </Switch>
            </main>
          </div>
        </CRMProvider>
      </>
    </Router>
  );
}

export default App;
