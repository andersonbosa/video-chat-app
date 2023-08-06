import { Link, Outlet, Route, Routes } from "react-router-dom"

import CreateRoom from './components/CreateRoom'
import Room from './components/Room'

import './App.css'


function NoMatchFound () {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

function Navbar () {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </>
  )
}


function Layout () {
  return (
    <>
      <Outlet />
    </>
  )
}


const AboutPage = () => {
  return (
    <>
      <div className="justify">
        <h2>Projeto de Estudo: Aplicativo Cliente e Servidor de WebRTC com React e Golang</h2>
        <p>
          Este é um projeto de estudo que combina React e Golang para criar um aplicativo cliente e servidor de WebRTC (Web Real-Time Communication). O objetivo principal é implementar a comunicação em tempo real entre os dispositivos dos usuários, permitindo a transmissão de áudio e vídeo diretamente no navegador.
        </p>
        <p>
          O WebRTC é uma tecnologia que possibilita a comunicação peer-to-peer em tempo real entre navegadores, sendo útil para aplicações de chamadas de vídeo, videoconferências e compartilhamento de tela.
        </p>
        <h3>Principais Objetivos do Projeto:</h3>
        <ol>
          <li>Aprender os conceitos fundamentais do WebRTC: Compreender os princípios básicos do WebRTC, incluindo a criação e gerenciamento de conexões peer-to-peer, o estabelecimento de canais de dados e a transmissão de áudio e vídeo.</li>
          <li>Construir o cliente React: Desenvolver a interface do usuário usando React, criando componentes reutilizáveis e uma experiência do usuário intuitiva.</li>
          <li>Implementar o servidor Golang: Criar um servidor que gerencia as conexões entre os clientes, roteia as mensagens e transmite os fluxos de mídia, garantindo uma comunicação segura e confiável.</li>
          <li>Gerenciar o estado da aplicação: Utilizar bibliotecas e técnicas para gerenciar o estado global da aplicação, sincronizando informações e ações entre os clientes conectados.</li>
          <li>Lidar com desafios de segurança e escalabilidade: Abordar questões de segurança na transmissão de mídia e dimensionar o aplicativo para suportar múltiplas conexões de clientes simultâneas.</li>
          <li>Explorar recursos avançados do WebRTC: Pesquisar e implementar funcionalidades adicionais, como compartilhamento de tela e mensagens em tempo real.</li>
        </ol>
        <h3>Visão Futura:</h3>
        <p>
          Esse projeto servirá como uma base para outros estudos e desenvolvimento de aplicações web em tempo real. Principalmente quero introduzir "object detection" no aplicativo com um modelo da Ultralytics.
        </p>
      </div>    </>
  )
}


function HomePage () {
  return (
    <>
      <CreateRoom />
    </>
  )
}


function RouteProvider () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/room/:roomID" element={<Room />}></Route>
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NoMatchFound />} />
        </Route>
      </Routes>
    </>
  )
}

function App () {
  return (
    <>
      <div className="App">
        <section className="navbar_section">
          <Navbar />
        </section>

        <section className="content_section">
          <RouteProvider />
        </section>
      </div>
    </>
  )
}

export default App
