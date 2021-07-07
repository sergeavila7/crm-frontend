import React from 'react';
import { Form } from 'react-bootstrap';

const Search = (props) => {
  return (
    <>
      <Form onSubmit={props.searchProduct}>
        <Form.Text className='header-text mb-4'>
          Llena todos los campos
        </Form.Text>
        <Form.Group>
          <Form.Label className='mr-2'>Productos:</Form.Label>
          <Form.Control
            className='search'
            type='text'
            placeholder='Buscar Producto...'
            onChange={props.handleChangeSearch}
            autoFocus
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default Search;
