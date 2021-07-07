import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import clientAxios from '../../config/Axios';
import Swal from 'sweetalert2';
import { CRMContext } from '../../context/CRMContext';

// import { FaImage } from 'react-icons/fa';
// import Spinner from '../Layout/Spinner';

function EditProduct(props) {
  const [auth, setAuth] = useContext(CRMContext);

  // GET ID
  const { idProduct } = props.match.params;

  const [product, saveProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const [file, saveFile] = useState('');

  useEffect(() => {
    const getProduct = async () => {
      const response = await clientAxios.get(`/products/${idProduct}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      saveProduct(response.data);
    };
    getProduct();
  }, []);

  // Edita un Producto en la base de datos
  const { name, price, image } = product;

  const editProduct = async (e) => {
    e.preventDefault();

    // crear un formdata
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('image', file);
    try {
      const res = await clientAxios.put(`/products/${idProduct}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      // Lanzar una alerta
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: res.data.message,
          text: 'Cambios guardados',
        });
      }

      // redireccionar
      props.history.push('/products');
    } catch (error) {
      console.log(error);
      // lanzar alerta
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Vuelva a intentarlo',
      });
    }
  };
  const handleChange = (e) => {
    saveProduct({
      // obtener una copia del state y agregar el nuevo
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeFile = (e) => {
    saveFile(e.target.files[0]);
  };
  // Verify Auth
  if (!auth.auth && localStorage.getItem('token') === auth.token) {
    props.history.push('/login');
  }
  return (
    <>
      <h2>Editar Producto</h2>
      <Form className='form' onSubmit={editProduct}>
        <Form.Text className='header-text mb-4'>
          Llena todos los campos
        </Form.Text>
        <Form.Group className='d-flex offset-1 mb-5'>
          <Form.Label className='col-2'>
            <strong>Nombre:</strong>
          </Form.Label>
          <Form.Control
            className='col-9 border-color-none'
            type='text'
            placeholder='Nombre del Producto'
            name='name'
            title='Username should only contain lowercase letters. e.g. Juan'
            autoFocus
            defaultValue={name}
            onChange={handleChange}
            pattern='[a-zA-ZÀ-ÿ\s]{1,25}'
            required
          />
        </Form.Group>
        <Form.Group className='d-flex offset-1 mb-5'>
          <Form.Label className='col-2'>
            <strong>Precio:</strong>
          </Form.Label>
          <Form.Control
            className='col-9'
            type='number'
            placeholder='Precio del Producto'
            name='price'
            title='Username should only contain lowercase letters. e.g. Juan'
            min='0.00'
            step='1'
            onChange={handleChange}
            defaultValue={price}
            pattern='[0-9]'
            required
          />
        </Form.Group>
        <Form.Group className='d-flex offset-2  mb-5'>
          <Form.Label className='d-flex align-items-center'>
            <strong>Imagen:</strong>
            {/* <FaImage className="fa-image"/> */}
            {image ? (
              <img
                src={`http://localhost:5000/${image}`}
                alt={name}
                width='300'
              />
            ) : null}
          </Form.Label>
          <Form.Control
            className='col-9'
            type='file'
            name='image'
            onChange={handleChangeFile}
          />
        </Form.Group>

        <Button
          className='btn btn-blue btn-add'
          value='Add Client'
          type='submit'
        >
          Guardar Cambios
        </Button>
      </Form>
    </>
  );
}
export default withRouter(EditProduct);
