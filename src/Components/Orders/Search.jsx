import React from 'react';
import { Form } from 'react-bootstrap';
import{CgSearch} from 'react-icons/cg'
const Search = (props) => {
  return (
    <>
      <Form onSubmit={props.searchProduct}>
        <Form.Text className='header-text mb-4'>
          Llena todos los campos
        </Form.Text>
        <Form.Group>
          <div className='container-search mx-auto'>
          <i className="search-icon pr-2"><CgSearch/></i>
            <Form.Control
              className='search '
              type='text'
              placeholder='Buscar Producto...'
              onChange={props.handleChangeSearch}
              autoFocus
            />
          </div>
        </Form.Group>
      </Form>
    </>
  );
};

export default Search;
