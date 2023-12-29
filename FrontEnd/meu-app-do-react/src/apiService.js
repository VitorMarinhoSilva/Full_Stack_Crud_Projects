import axios from 'axios';
import Endpoint from './config/Endpoint';

const API_URL = Endpoint;

const apiService = axios.create({
  baseURL: API_URL,
});

// Função para fazer login e obter o token
export const login = async (credenciais) => {
  try {
    const response = await apiService.post('/auth/login', credenciais);
    const { token } = response.data;

    if (token) {
      localStorage.setItem('token', token);
      apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para obter os projetos
export const getProjetos = () => {
  return apiService.get('/projects')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

// Função para criar um novo projeto
export const createProject = async (novoProjeto) => {
  try {
    const response = await apiService.post('/projects', novoProjeto);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para atualizar um projeto existente
export const updateProject = async (projeto) => {
  try {
    const response = await apiService.put(`/projects/${projeto._id}`, projeto);
    return response.data;
  } catch (error) {
    throw error;
  }
}

  
  

// Função para excluir um projeto
export const deleteProject = async (id) => {
  try {
    const response = await apiService.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiService;
