import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ImCancelCircle } from 'react-icons/im';
import clientAxios from '../../config/Axios';
import Swal from 'sweetalert2';
import { CRMContext } from '../../context/CRMContext';

function DetailsOrder({ order, history }) {
  const [auth, setAuth] = useContext(CRMContext);

  const { client } = order;
  const { _id, name, lastname } = client;

  const deleteOrder = (idOrder) => {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'No Podras Recuperar la Informacion del Pedido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        clientAxios
          .delete(`/orders/${idOrder}`, {
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
    <>
      <li>
        <div className='info__order'>
          <p className='id'>ID: {_id}</p>
          <p className='name'>
            Cliente:{name} {lastname}
          </p>
        </div>
      </li>
      <div className='d-flex align-items-end'>
        <div className='articles__order col-9 bg-light'>
          <h3 className='products'>
            <strong>Artículos del Pedido:</strong>
          </h3>
          <ul>
            {order.order.map((articles) => (
              <li
                className='order d-flex justify-content-around align-items-center '
                key={order._id + articles.product._id}
              >
                <div className='container__image'>
                  {articles.product.image ? (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${articles.product.image}`}
                      alt={name}
                    />
                  ) : null}
                </div>
                <div>
                  <p>{articles.product.name}</p>
                  <p>Precio: ${articles.product.price}</p>
                  <p>Cantidad: {articles.qty}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='actions col-3'>
          {/* <Link to='/' className='btn btn-blue btn-edit'>
            <i>
              <ImPencil />
            </i>
            Editar Pedido
          </Link> */}
          <Button
            type='button'
            className='btn btn-red btn-delete'
            onClick={() => deleteOrder(order._id)}
          >
            <i>
              <ImCancelCircle />
            </i>
            Eliminar Pedido
          </Button>
        </div>
      </div>
      <div>
        <p className='total py-5'>
          Total a Pagar:
          <span className='total__price'> ${order.total}</span>
        </p>
      </div>
    </>
  );
}

export default DetailsOrder;
