import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import clientAxios from '../../config/Axios';
import Swal from 'sweetalert2';
import { CRMContext } from '../../context/CRMContext';

const NewProduct = ({ history }) => {
  const [auth, setAuth] = useContext(CRMContext);

  const [product, saveProduct] = useState({
    name: '',
    price: '',
  });

  const [file, saveFile] = useState('');

  // Save New Product on BD

  const addProduct = async (e) => {
    e.preventDefault();

    // Create FormData
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('image', file);

    try {
      const res = await clientAxios.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (res.status === 200) {
        Swal.fire('Agregado correctamente', res.data.message, 'success');
      }
      history.push('/products');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '¡Algo ha salido mal!',
        text: 'Vuelva a intentarlo',
      });
    }
  };

  const handleChange = (e) => {
    saveProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = (e) => {
    saveFile(e.target.files[0]);
  };
  const validateProduct = () => {
    const { name, price } = product;

    let valid = !name.length || !price.length;

    // Return true or false
    return valid;
  };

  // Verify Auth
  if (!auth.auth && localStorage.getItem('token') === auth.token) {
    history.push('/login');
  }
  return (
    <>
      <h2>Nuevo Producto</h2>

      <Form className='form' onSubmit={addProduct}>
        <Form.Text className='header-text mb-4'>
          Llena todos los campos
        </Form.Text>
        <Form.Group className='d-flex offset-1 mb-5'>
          <Form.Label className='col-2'>
            <strong>Nombre:</strong>
          </Form.Label>
          <Form.Control
            className='col-9'
            type='text'
            placeholder='Nombre del Producto'
            name='name'
            autoFocus
            required
            pattern='[a-zA-ZÀ-ÿ\s]{1,25}'
            title='Username should only contain lowercase letters. e.g. Juan'
            onChange={handleChange}
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
            min='0.00'
            step='1'
            required
            pattern='[0-9]'
            title='Username should only contain lowercase letters. e.g. Juan'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='d-flex offset-1  mb-5'>
          <Form.Label className='col-2'>
            <strong>Imagen:</strong>
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
          disabled={validateProduct()}
          type='submit'
        >
          Agregar Producto
        </Button>
      </Form>
    </>
  );
};

export default withRouter(NewProduct);
