import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import clientAxios from '../../config/Axios';
import { Form, Button } from 'react-bootstrap';
import Search from './Search';
import Order from './Order';
import Swal from 'sweetalert2';
import { CRMContext } from '../../context/CRMContext';

function NewOrder(props) {
  const [auth, setAuth] = useContext(CRMContext);

  //GET ID CLIENT
  const { idClient } = props.match.params;

  const [client, setClient] = useState({});
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const { name, lastname, email, phone } = client;
  useEffect(() => {
    const getClient = async () => {
      const response = await clientAxios.get(`/clients/${idClient}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setClient(response.data);
    };
    getClient();

    updateTotal();
  }, [products]);

  const searchProduct = async (e) => {
    e.preventDefault();

    // Obtener los productos de la busqueda
    const responseSearch = await clientAxios.post(
      `/products/search/${search}`,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    // Add State
    if (responseSearch.data[0]) {
      let productResponse = responseSearch.data[0];
      // Add key "product" copy ID
      productResponse.product = responseSearch.data[0]._id;
      productResponse.qty = 0;

      // Set State
      setProducts([...products, productResponse]);
    } else {
      Swal.fire({
        icon: 'error',
        title: '¡Algo ha salido mal!',
        text: 'No hay resultados',
      });
    }
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // Update quantity of products
  const minProducts = (i) => {
    const allProducts = [...products];

    // Validate
    if (allProducts[i].qty === 0) return;

    allProducts[i].qty--;

    setProducts(allProducts);
  };
  const maxProducts = (i) => {
    const allProducts = [...products];
    allProducts[i].qty++;
    setProducts(allProducts);
  };

  // Delete Product
  const deleteProductOrder = (id) => {
    const allProducts = products.filter((product) => product._id !== id);

    setProducts(allProducts);
  };

  // Update total
  const updateTotal = () => {
    if (products.length === 0) {
      setTotal(0);
      return;
    }
    // Calc Total
    let newTotal = 0;

    products.map((product) => {
      newTotal += product.qty * product.price;

      setTotal(newTotal);
    });
  };

  const makeOrder = async (e) => {
    e.preventDefault();

    const { idClient } = props.match.params;

    const order = {
      client: idClient,
      order: products,
      total: total,
    };
    const response = await clientAxios.post(`/orders/new/${idClient}`, order, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '¡Registro Correcto!',
        text: response.data.message,
      });
    } else {
      Swal.fire({
        type: 'error',
        title: '¡Algo ha salido mal!',
        text: 'Vuelva a intentarlo',
      });
    }
    props.history.push('/');
  };
  // Verify Auth
  if (!auth.auth && localStorage.getItem('token') === auth.token) {
    props.history.push('/login');
  }
  return (
    <>
      <h2>Nuevo Pedido</h2>
      <div className='container bg-light p-5'>
        <h3>
          <strong>Datos del Cliente</strong>
        </h3>
        <p className='mt-4'>
          Nombre: {name} {lastname}
        </p>
        <p>Correo: {email}</p>
        <p>Telefono: {phone}</p>
      </div>
      <Search
        searchProduct={searchProduct}
        handleChangeSearch={handleChangeSearch}
      />
      <div className='list-orders'>
        <ul className='resumen'>
          {products.map((product, index) => (
            <Order
              key={product.product}
              product={product}
              minProducts={minProducts}
              maxProducts={maxProducts}
              index={index}
              deleteProductOrder={deleteProductOrder}
            />
          ))}
        </ul>
        <p className='total pt-5'>
          Total a Pagar: <span className='total__price'>$ {total}</span>
        </p>
        {total > 0 ? (
          <Form onSubmit={makeOrder}>
            <Button
              className='btn btn-success btn-order my-5 mx-auto'
              type='submit'
            >
              Realizar Pedido
            </Button>
          </Form>
        ) : null}
      </div>
    </>
  );
}

export default withRouter(NewOrder);
