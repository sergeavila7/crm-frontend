import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import clientAxios from '../../config/Axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

// Context
import { CRMContext } from '../../context/CRMContext';

function Login(props) {
  const [auth, setAuth] = useContext(CRMContext);

  const [credentials, setCredentials] = useState({});

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await clientAxios.post('/login', credentials);

      const { token } = response.data;
      localStorage.setItem('token', token);

      setAuth({
        token,
        auth: true,
      });

      Swal.fire({
        icon: 'success',
        title: '¡Login Correcto!',
        text: 'Has Iniciado Sesión',
      });
      props.history.push('/');
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: '¡Algo Ha Salido mal!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Algo Ha Salido mal!',
        });
      }
    }
  };
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='login bg-light col-8 offset-2 p-5 my-5'>
      <h2 className='text-center mb-5'>Iniciar Sesión</h2>
      <div className='container-form'>
        <Form className='form' onSubmit={login}>
          <Form.Group className='d-flex mb-5'>
            <Form.Control
              className='input-login'
              type='email'
              placeholder='Correo electronico'
              name='email'
              autoFocus
              required
              pattern='^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,6})$'
              title='Ingrese una cuenta de correo valida. example@example.com'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='d-flex mb-5'>
            <Form.Control
              className='input-login'
              type='password'
              placeholder='Contraseña'
              name='password'
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Button className='btn btn-success btn-login' type='submit'>
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(Login);
