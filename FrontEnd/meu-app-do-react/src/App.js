import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login, getProjetos, createProject, updateProject, deleteProject } from './apiService';
import CredentialUser from './config/CredentialUser';

const TabelaProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [projetosFiltrados, setProjetosFiltrados] = useState([]);
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [prioridadeProjeto, setPrioridadeProjeto] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [projetoEditando, setProjetoEditando] = useState(null);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        // Fazer o login para obter o token
        const token = await login(CredentialUser);

        // Obter projetos usando o token
        const projetosData = await getProjetos(token);

        // Ajuste para mapear as propriedades corretas
        const projetosMapeados = projetosData.map(projeto => ({
          id: projeto._id.$oid,  // Assumindo que o ID é uma string
          nome: projeto.nomeDoProjeto,
          prioridade: projeto.prioridade,
          dataCriacao: new Date(projeto.dataDeCriacao).toISOString().slice(0, 10),
        }));

        setProjetos(projetosMapeados);
        setProjetosFiltrados(projetosMapeados);
      } catch (error) {
        console.error('Erro ao obter projetos:', error.message);
      }
    };

    fetchProjetos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjetos(projetos.filter((projeto) => projeto.id !== id));
      setProjetosFiltrados(projetosFiltrados.filter((projeto) => projeto.id !== id));
    } catch (error) {
      console.error('Erro ao excluir projeto:', error.message);
    }
  };

  const handleEdit = (projeto) => {
    setProjetoEditando(projeto);
    setNomeProjeto(projeto.nome);
    setPrioridadeProjeto(projeto.prioridade);
    setIsModalOpen(true);
  };

  const handleSearchInputChange = (e) => {
    const valorInput = e.target.value;
    setTermoPesquisa(valorInput);

    if (valorInput === '') {
      setProjetosFiltrados(projetos);
    }
  };

  const handleSearch = () => {
    const projetosFiltrados = projetos.filter((projeto) =>
      projeto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
    setProjetosFiltrados(projetosFiltrados);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setNomeProjeto('');
    setPrioridadeProjeto('');
    setProjetoEditando(null);
    setIsModalOpen(false);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
  
    try {
      const novoProjeto = {
        nomeDoProjeto: nomeProjeto,
        prioridade: prioridadeProjeto,
        dataDeCriacao: new Date().toISOString(),
      };
  
      const projetoAdicionado = await createProject(novoProjeto);
  
      setProjetos([...projetos, projetoAdicionado]);
      setProjetosFiltrados([...projetos, projetoAdicionado]);
  
      setNomeProjeto('');
      setPrioridadeProjeto('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error.message);
    }
  };

  const handleEditProject = async (e) => {
    e.preventDefault();
  
    if (projetoEditando) {
      try {
        const projetoAtualizado = {
          nomeDoProjeto: nomeProjeto,
          prioridade: prioridadeProjeto,
        };
  
        await updateProject(projetoEditando._id, projetoAtualizado);
  
        const projetosAtualizados = projetos.map((projeto) =>
          projeto.id === projetoEditando._id
            ? { ...projeto, nome: nomeProjeto, prioridade: prioridadeProjeto }
            : projeto
        );
  
        setProjetos(projetosAtualizados);
        setProjetosFiltrados(projetosAtualizados);
  
        setNomeProjeto('');
        setPrioridadeProjeto('');
        setProjetoEditando(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Erro ao editar projeto:', error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Digite o nome do projeto"
              value={termoPesquisa}
              onChange={handleSearchInputChange}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Pesquisar
            </button>
          </div>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Prioridade</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {projetosFiltrados.map((projeto, index) => (
            <tr key={projeto.id}>
              <td>{index + 1}</td>
              <td>{projeto.nome}</td>
              <td>{projeto.prioridade}</td>
              <td>{projeto.dataCriacao}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => handleEdit(projeto)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(projeto.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="botoes-container">
        <button className="btn btn-success add-button" onClick={handleAdd}>
          Adicionar
        </button>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}>
        {projetoEditando ? (
          <>
            <h2>Editar Projeto</h2>
            <form onSubmit={handleEditProject}>
              <div className="form-group">
                <label htmlFor="nomeProjeto">Novo Nome do Projeto:</label>
                <input
                  type="text"
                  id="nomeProjeto"
                  className="form-control"
                  value={nomeProjeto}
                  onChange={(e) => setNomeProjeto(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prioridadeProjeto">Nova Prioridade:</label>
                <select
                  id="prioridadeProjeto"
                  className="form-control"
                  value={prioridadeProjeto}
                  onChange={(e) => setPrioridadeProjeto(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Salvar Edições
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Cancelar Edição
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2>Adicionar Projeto</h2>
            <form onSubmit={handleAddProject}>
              <div className="form-group">
                <label htmlFor="nomeProjeto">Nome do Projeto:</label>
                <input
                  type="text"
                  id="nomeProjeto"
                  className="form-control"
                  value={nomeProjeto}
                  onChange={(e) => setNomeProjeto(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prioridadeProjeto">Prioridade:</label>
                <select
                  id="prioridadeProjeto"
                  className="form-control"
                  value={prioridadeProjeto}
                  onChange={(e) => setPrioridadeProjeto(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Adicionar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
};

export default TabelaProjetos;
