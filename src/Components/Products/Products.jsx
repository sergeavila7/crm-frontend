import React, { useEffect, useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clientAxios from '../../config/Axios';
import Product from './Product';
import Spinner from '../Layout/Spinner';
import { FaPlusCircle } from 'react-icons/fa';
import { CRMContext } from '../../context/CRMContext';

function Products(props) {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== '') {
      const getProducts = async () => {
        try {
          const response = await clientAxios.get('/products', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setProducts(response.data);
        } catch (error) {
          if ((error.response.status = 500)) {
            props.history.push('/login');
          }
        }
      };
      getProducts();
    } else {
      props.history.push('/login');
    }
  }, [products]);

  if (!auth.auth) {
    props.history.push('/login');
  }
  // Spinner
  // if (!products.length) return <Spinner />;
  return (
    <>
      <h2 className='pb-4'>Productos</h2>
      <Link to='/products/new' className='btn btn-success btn-new'>
        <i>
          <FaPlusCircle />
        </i>
        Nuevo Producto
      </Link>
      <ul className='list-products'>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </ul>
    </>
  );
}

export default withRouter(Products);
