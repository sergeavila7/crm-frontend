import React, { useEffect, useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clientAxios from '../../config/Axios';
import Client from './Client';
import Spinner from '../Layout/Spinner';

import { FaPlusCircle } from 'react-icons/fa';
import { CRMContext } from '../../context/CRMContext';

function Clients({ history }) {
  const [clients, setClients] = useState([]);
  const [auth, setAuth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== '') {
      const getClients = async () => {
        try {
          const response = await clientAxios.get('/clients', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setClients(response.data);
        } catch (error) {
          if ((error.response.status = 500)) {
            history.push('/login');
          }
        }
      };
      getClients();
    } else {
      history.push('/login');
    }
  }, [clients]);

  if (!auth.auth) {
    history.push('/login');
  }

  // Spinner
  // if (!clients.length) return <Spinner />;
  return (
    <>
      <div>
        <h2 className='pb-4'>Clientes</h2>
        <Link to='/clients/new' className='btn btn-success btn-new'>
          <i>
            <FaPlusCircle />
          </i>
          Nuevo Cliente
        </Link>
        <ul className='list-clients'>
          {clients.map((client) => (
            <Client key={client._id} client={client} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default withRouter(Clients);
