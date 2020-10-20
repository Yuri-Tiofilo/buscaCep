import React from 'react';

import apiCorreios from './service/apiCorreios';

interface ICorreios {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  ddd?: string;
  message?: string;
}

const App: React.FC = () => {
  const [inputCep, setInputCep] = React.useState('');
  const [responseCorreios, setresponseCorreios] = React.useState<ICorreios>(
    {} as ICorreios
  );

  const renderInfoCorreios = React.useCallback(() => {
    if (responseCorreios.message) {
      return (
        <ul>
          <li>{responseCorreios.message}</li>
        </ul>
      );
    }
    return (
      <ul>
        <li>Rua: {responseCorreios.logradouro}</li>
        <li>Bairro: {responseCorreios.bairro}</li>
        <li>Cidade: {responseCorreios.localidade}</li>
        <li>UF: {responseCorreios.uf}</li>
        <li>DDD: {responseCorreios.ddd}</li>
      </ul>
    );
  }, [responseCorreios]);

  const handleSubmitCep = React.useCallback(async () => {
    try {
      // loading....
      const { data } = await apiCorreios.get(`/${inputCep}/json/`); // error 500

      // executou ->
      setresponseCorreios(data);
    } catch (error) {
      setresponseCorreios({ message: 'Deu ruim na api' });
    } finally {
      console.log('veio qaui');
    }
  }, [inputCep]);

  return (
    <div>
      <input
        type="text"
        value={inputCep}
        placeholder="digite o CEP"
        onChange={(text) => {
          setInputCep(text.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          handleSubmitCep();
        }}
      >
        Buscar
      </button>

      {renderInfoCorreios()}
    </div>
  );
};

export default App;
