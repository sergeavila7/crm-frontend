import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';

import { CRMContext } from '../../context/CRMContext';
import { withRouter } from 'react-router-dom';

const Header = (props) => {
  const [auth, setAuth] = useContext(CRMContext);

  const logout = () => {
    setAuth({
      token: '',
      auth: false,
    });
    localStorage.setItem('token', '');

    // Redirect
    props.history.push('/login');
  };
  return (
    <>
      <header className='header text-white'>
        <div className='container'>
          <div className='d-flex justify-content-between'>
            <h1>CRM - Administrador de Clientes</h1>
            {auth.auth ? (
              <Button className='btn btn-red' onClick={logout}>
                <i>
                  <BiLogOut />
                </i>
                Cerrar Sesión
              </Button>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
};

export default withRouter(Header);
