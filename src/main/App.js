import React from 'react';
import Navbar from '../components/navbar';
import '../custom.css';
import Rotas from './rotas';
import ProvedorAutenticacao from './provedorAutenticacao';

class App extends React.Component {

  render() {
    return (
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;
