import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { FaBoxes, FaBook, FaUsers } from 'react-icons/fa';
import { CRMContext } from '../../context/CRMContext';
const Sidebar = () => {
  const [auth, setAuth] = useContext(CRMContext);

  if (!auth.auth) return null;
  return (
    <aside className='sidebar col-3'>
      <h2 className='text-center'>Administración</h2>
      <Nav
        defaultActiveKey='/'
        className='navbar flex-column align-items-start'
      >
        <NavLink to='/'>
          <i className='icon'>
            <FaUsers />
          </i>
          Clientes
        </NavLink>
        <NavLink to='/products'>
          <i className='icon'>
            <FaBoxes />
          </i>
          Productos
        </NavLink>
        <NavLink to='/orders'>
          <i className='icon'>
            <FaBook />
          </i>
          Pedidos
        </NavLink>
      </Nav>
    </aside>
  );
};

export default Sidebar;
