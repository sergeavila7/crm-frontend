import Axios from 'axios';

const clientAxios = Axios.create({ baseURL: 'http://localhost:5000' });

export default clientAxios;
