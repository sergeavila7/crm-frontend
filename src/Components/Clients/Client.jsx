import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/Axios';
import { CRMContext } from '../../context/CRMContext';

import { Button } from 'react-bootstrap';
import { ImPencil, ImCancelCircle, ImList } from 'react-icons/im';
function Client({ client, history }) {
  const [auth, setAuth] = useContext(CRMContext);

  const { _id, name, lastname, company, email, phone } = client;

  // Delete Client
  const deleteClient = (idClient) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras recuperar la informacion del cliente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        clientAxios
          .delete(`/clients/${idClient}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((res) => {
            Swal.fire('¡Eliminado!', res.data.message, 'success');
          });
      }
    });
  };
  // Verify Auth
  if (!auth.auth && localStorage.getItem('token') === auth.token) {
    history.push('/login');
  }
  return (
    <li className='client'>
      <div className='info-client'>
        <p className='name'>
          {name} {lastname}
        </p>
        <p className='company'>{company}</p>
        <p className='company'>
          <strong>{email}</strong>
        </p>
        <p className='company'>{phone}</p>
      </div>
      <div className='actions'>
        <Link to={`/clients/edit/${_id}`} className='btn btn-blue btn-edit'>
          <i className='fas'>
            <ImPencil />
          </i>
          Editar cliente
        </Link>
        <Link to={`/orders/new/${_id}`} className='btn btn-yellow btn-new'>
          <i className='fas'>
            <ImList />
          </i>
          Nuevo Pedido
        </Link>
        <Button
          className='btn btn-red btn-delete'
          onClick={() => deleteClient(_id)}
        >
          <i className='fas'>
            <ImCancelCircle />
          </i>
          Eliminar cliente
        </Button>
      </div>
    </li>
  );
}

export default Client;
