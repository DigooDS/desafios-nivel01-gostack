import React, { useEffect, useState } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [techs, setTechs] = useState("")

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const splitTechs = techs.split(/, ?/)
    const data = { title, url, techs: splitTechs }

    if(title === "" || techs === "" || url === ""){
      return alert("Todos os campos devem ser preenchidos")
    } else {
      await api.post('/repositories', data).then((response) => {
        setRepositories([...repositories, response.data])
        setUrl("")
        setTitle("")
        setTechs("")
      })
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <>
      <body>
        
        <div className="title">
        <h1>Lista de Repositórios:</h1>
        </div>
        <div className="repositories">       
          <ul data-testid="repository-list">
            {repositories.map(({ id, title, techs, url, likes }) =>
              <li key={id}>
                <div className="repoTitle">
                  {title}
                </div>
                <div className="repoTechs">
                  <p>Tecnologias utilizadas</p>
                  {techs.map((tech) => (
                    <text className="span-tech" key={tech}>{tech}</text>
                  ))}
                </div>
                <div className="repoLink">
                  <p>Link para github:</p>
                  <span>{url}</span>
                </div>
                <div className="repoLikes">
                  <p>=======------- {likes} curtidas -------=======</p>
                </div>
                <button onClick={() => handleRemoveRepository(id)}>Remover</button>
              </li>
            )}
          </ul>
        </div>
          
        <div className="form">
          <h1>Adicionar Repositório</h1>
          <form onSubmit={handleAddRepository}>
            <input 
              type="text"
              value={title}
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
            />

            <input 
              type="text"
              value={techs}
              placeholder="Tecnologias (separar por vírgula)"
              onChange={(e) => setTechs(e.target.value)}
            />

            <input 
              type="text"
              value={url}
              placeholder="url do repositório"
              onChange={(e) => setUrl(e.target.value)}
            />
          </form>

          <button onClick={handleAddRepository}>Adicionar</button>
        </div>
        
      </body>
    </>
  );
}

export default App;
