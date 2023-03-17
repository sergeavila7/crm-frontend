import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/Axios';
import { Button } from 'react-bootstrap';
import { ImPencil, ImCancelCircle } from 'react-icons/im';
import { CRMContext } from '../../context/CRMContext';

function Product({ product, history }) {
  const [auth, setAuth] = useContext(CRMContext);

  const { _id, name, price, image } = product;

  const deleteProduct = (idProduct) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras recuperar la informacion del producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        clientAxios
          .delete(`/products/${idProduct}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire('¡Eliminado!', res.data.message, 'success');
            }
          });
      }
    });
  };
  // Verify Auth
  if (!auth.auth && localStorage.getItem('token') === auth.token) {
    history.push('/login');
  }
  return (
    <div>
      <li className='product d-flex info-product justify-content-between align-items-center'>
        <div className='container__image'>
          {image ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
              alt={name}
            />
          ) : null}
        </div>
        <div>
          <p className='product__name'>{name}</p>
          <p className='product__price'>$ {price}</p>
        </div>
        <div className='actions'>
          <Link to={`/products/edit/${_id}`} className='btn btn-blue btn-edit'>
            <i className='fas'>
              <ImPencil />
            </i>
            Editar Producto
          </Link>
          <Button
            type='button'
            className='btn btn-red btn-delete'
            onClick={() => deleteProduct(_id)}
          >
            <i className='fas'>
              <ImCancelCircle />
            </i>
            Eliminar Producto
          </Button>
        </div>
      </li>
    </div>
  );
}

export default Product;
