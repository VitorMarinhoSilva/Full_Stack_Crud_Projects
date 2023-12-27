import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const TabelaProjetos = () => {
  const projetosIniciais = [
    { id: 1, nome: 'Projeto 1', prioridade: 'Alta', dataCriacao: '2023-01-01' },
    { id: 2, nome: 'Projeto 2', prioridade: 'Média', dataCriacao: '2023-02-01' },
    // Adicione mais projetos conforme necessário
  ];

  const [projetos, setProjetos] = useState([...projetosIniciais]);
  const [projetosFiltrados, setProjetosFiltrados] = useState([...projetosIniciais]);
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [prioridadeProjeto, setPrioridadeProjeto] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const handleDelete = (id) => {
    setProjetos(projetos.filter((projeto) => projeto.id !== id));
    setProjetosFiltrados(projetosFiltrados.filter((projeto) => projeto.id !== id));
  };

  const handleEdit = (id) => {
    // Adicione a lógica para edição conforme necessário
    console.log(`Editar projeto com ID ${id}`);
  };

  const handleSearchInputChange = (e) => {
    const valorInput = e.target.value;
    setTermoPesquisa(valorInput);

    // Se o valor do input estiver vazio, mostra todos os projetos novamente
    if (valorInput === '') {
      setProjetosFiltrados(projetos);
    }
  };

  const handleSearch = () => {
    // Filtra os projetos com base no termo de pesquisa
    const projetosFiltrados = projetos.filter((projeto) =>
      projeto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
    setProjetosFiltrados(projetosFiltrados);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddProject = () => {
    // Adiciona um novo projeto
    const novoProjeto = {
      id: projetos.length + 1, // Gera um ID sequencial
      nome: nomeProjeto,
      prioridade: prioridadeProjeto,
      dataCriacao: new Date().toISOString().slice(0, 10), // Data atual no formato YYYY-MM-DD
    };

    // Atualiza o estado dos projetos e dos projetos filtrados
    setProjetos([...projetos, novoProjeto]);
    setProjetosFiltrados([...projetosFiltrados, novoProjeto]);

    // Limpa os campos do formulário e fecha o modal
    setNomeProjeto('');
    setPrioridadeProjeto('');
    setIsModalOpen(false);
  };

  return (
    <div className="tabela-container">
      <div className="barra-pesquisa">
        <input
          type="text"
          placeholder="Digite o nome do projeto"
          value={termoPesquisa}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      <table>
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
                <button onClick={() => handleEdit(projeto.id)}>Editar</button>
                <button onClick={() => handleDelete(projeto.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="botoes-container">
        <button onClick={handleAdd}>Adicionar</button>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}>
        <h2>Adicionar Projeto</h2>
        <label>Nome do Projeto:</label>
        <input
          type="text"
          value={nomeProjeto}
          onChange={(e) => setNomeProjeto(e.target.value)}
        />
        <label>Prioridade:</label>
        <input
          type="text"
          value={prioridadeProjeto}
          onChange={(e) => setPrioridadeProjeto(e.target.value)}
        />
        <button onClick={handleAddProject}>Adicionar</button>
        <button onClick={handleModalClose}>Cancelar</button>
      </Modal>
    </div>
  );
};

export default TabelaProjetos;