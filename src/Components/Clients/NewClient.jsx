import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import clientAxios from '../../config/Axios';
import Swal from 'sweetalert2';
import { CRMContext } from '../../context/CRMContext';

function NewClient({ history }) {
  const [auth, setAuth] = useContext(CRMContext);

  // Function that save state
  const [client, saveClient] = useState({
    name: '',
    lastname: '',
    company: '',
    email: '',
    phone: '',
  });

  // Read of data the form
  const handleChange = (e) => {
    saveClient({
      ...client,
      [e.target.name]: e.target.value,
    });
    console.log(client);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send petition
    // const response = await
    clientAxios
      .post('/clients', client, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        if (res.data.code === 11000) {
          Swal.fire({
            icon: 'error',
            title: '¡Algo ha salido mal!',
            text: 'El cliente ya existe',
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            text: 'Nuevo cliente agregado',
          });
          // Redirect
          history.push('/');
        }
      });
  };

  // const message = response.data.message;
  // if (message !== '¡Agregado con exito!') {
  //   Swal.fire({
  //     icon: 'error',
  //     title: message,
  //     text: 'El cliente ya existe',
  //   });
  // } else {
  //   Swal.fire({
  //     icon: 'success',
  //     title: message,
  //     text: 'Nuevo cliente agregado',
  //   });
  // }

  // Validate Form
  const validateClient = () => {
    const { name, lastname, company, email, phone } = client;

    let valid =
      !name.length ||
      !lastname.length ||
      !company.length ||
      !email.length ||
      !phone.length;
    // Return true or false
    return valid;
  };

  // Verify Auth
  if (!auth.auth && localStorage.getItem('token') === auth.token) {
    history.push('/login');
  }
  return (
    <>
      <h2>Nuevo Cliente</h2>
      <div className='container-sm'>
        <Form className='form' onSubmit={handleSubmit}>
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
              placeholder='Nombre del cliente'
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
              <strong>Apellidos:</strong>
            </Form.Label>
            <Form.Control
              className='col-9'
              type='text'
              placeholder='Apellidos del cliente'
              name='lastname'
              required
              pattern='[a-zA-ZÀ-ÿ\s]{1,25}'
              title='Username should only contain lowercase letters. e.g. Juan'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='d-flex offset-1  mb-5'>
            <Form.Label className='col-2'>
              <strong>Empresa:</strong>
            </Form.Label>
            <Form.Control
              className='col-9'
              type='text'
              placeholder='Empresa del cliente'
              name='company'
              required
              pattern='[a-zA-ZÀ-ÿ\s]{1,60}'
              title='Username should only contain lowercase letters. e.g. Juan'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='d-flex offset-1 mb-5'>
            <Form.Label className='col-2'>
              <strong>Email:</strong>
            </Form.Label>
            <Form.Control
              className='col-9'
              type='email'
              placeholder='Email del cliente'
              name='email'
              required
              pattern='^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,6})$'
              title='Ingrese una cuenta de correo valida. example@example.com'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group
            className='d-flex offset-1 mb-5'
            controlId='formBasicPassword'
          >
            <Form.Label className='col-2'>
              <strong>Telefono:</strong>
            </Form.Label>
            <Form.Control
              className='col-9'
              type='tel'
              placeholder='Telefono cliente'
              name='phone'
              required
              pattern='[0-9]{10,12}'
              title='Ingrese un numero telefonico valido de 10 digitos.'
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            className='btn btn-blue btn-add'
            value='Add Client'
            disabled={validateClient()}
            type='submit'
          >
            Agregar Cliente
          </Button>
        </Form>
      </div>
    </>
  );
}

// HOC
export default withRouter(NewClient);
