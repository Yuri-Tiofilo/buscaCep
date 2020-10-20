import axios from 'axios';

const apiCorreios = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

export default apiCorreios;
