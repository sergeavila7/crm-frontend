import React from 'react';
import { FaPlus, FaMinus, FaWindowClose } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const Order = (props) => {
  const { product, minProducts, maxProducts, index, deleteProductOrder } =
    props;
  const { name, price, qty, image } = product;
  return (
    <li className='d-flex justify-content-between align-items-center order'>
      <div className='container__image'>
        {image ? (
          <img className='' src={`http://localhost:5000/${image}`} alt={name} />
        ) : null}
      </div>
      <div className='text-product text-center'>
        <p className='product__name'>{name}</p>
        <p className='product__price'>${price}</p>
      </div>
      <div className='actions'>
        <div className='d-flex justify-content-end'>
          <Button
            className='btn btn-blue btn-qty'
            onClick={() => minProducts(index)}
          >
            <FaMinus />
          </Button>
          <p className='input-qty' type='text' name='qty'>
            {qty}
          </p>
          <Button
            className='btn btn-blue btn-qty'
            onClick={() => maxProducts(index)}
          >
            <FaPlus />
          </Button>
        </div>
        <div className='d-flex justify-content-end mt-2'>
          <Button
            className='btn btn-red'
            onClick={() => deleteProductOrder(product._id)}
          >
            <i>
              <FaWindowClose />
            </i>
            Eliminar Producto
          </Button>
        </div>
      </div>
    </li>
  );
};

export default Order;
