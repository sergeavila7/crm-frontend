import React, { useEffect, useState, useContext } from 'react';
import clientAxios from '../../config/Axios';
import DetailsOrder from './DetailsOrder';
import { CRMContext } from '../../context/CRMContext';

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== '') {
      const getOrders = async () => {
        try {
          const response = await clientAxios.get('/orders', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setOrders(response.data);
        } catch (error) {
          if ((error.response.status = 500)) {
            props.history.push('/login');
          }
        }
      };
      getOrders();
    } else {
      props.history.push('/login');
    }
  }, [orders]);

  if (!auth.auth) {
    props.history.push('/login');
  }
  return (
    <>
      <h2 className='pb-4'>Pedidos</h2>
      <ul className='list-orders'>
        {orders.map((order) => (
          <DetailsOrder key={order._id} order={order} />
        ))}
      </ul>
    </>
  );
}

export default Orders;
