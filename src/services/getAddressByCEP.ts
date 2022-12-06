import axios from 'axios';

interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const getAddressByCEP = async (zip_code: string): Promise<Address> => {
  const response = await axios.get(`https://viacep.com.br/ws/${zip_code}/json/`);

  return response.data;
};

