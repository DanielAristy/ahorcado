import './App.css';
import _ from 'lodash';
import React from 'react';


const Horca = ({ children, ancho, alto, anchoContenido }) => {

  const styleContainer = {
    width: ancho,
    height: alto
  };

  const styleContent = {
    width: anchoContenido,
    marginLeft: -anchoContenido / 2
  }

  return <div style={styleContainer}>
    <div className="horca-tope">
      <div className="horca-contenido" style={styleContent}>
        {children}
      </div>
    </div>
    <div className="horca-columna" />
    <div className="horca-plataforma" />
  </div>;
}

const Hombre = ({ nivel }) => {
  const espacio = <span>&nbsp;</span>;

  const parts = {
    cabeza: nivel >= 7 ? 'X' : (nivel >= 1 ? 'O' : espacio),
    cuerpo: nivel >= 2 ? '|' : espacio,
    brazoIzquierdo: nivel >= 3 ? '/' : espacio,
    brazoDerecho: nivel >= 4 ? '\\' : espacio,
    pieIzquierdo: nivel >= 5 ? '/' : espacio,
    pieDerecho: nivel >= 6 ? '\\' : espacio
  };
  return <div className="hombre">
    <div>{parts.cabeza}</div>
    <div>{parts.brazoIzquierdo}{parts.cuerpo}{parts.brazoDerecho}</div>
    <div>{parts.cuerpo}</div>
    <div>{parts.pieIzquierdo}{parts.pieDerecho}</div>
  </div>;
}

const Palabra = ({ palabra }) => {
  return <div className="palabra">
    {palabra.split("").join(" ")}
  </div>
}

const FinDeJuego = ({ juegoGanado, onResetearJuego }) => {
  const mensaje = juegoGanado ? <span style={{ color: 'green' }}>Ganaste!</span>
    : <span style={{ color: 'red' }}>Perdiste!</span>;
  return <div>
    {mensaje}
    <button onClick={onResetearJuego}>Intenta otra vez</button>
  </div>;
}


function App() {

  return (
    <div className="juego">
      <h3>Juego de Ahorcado</h3>
      <Horca ancho={300} alto={300} anchoContenido={200}>
        <Hombre nivel={8} />
      </Horca>
      <Palabra palabra={this.props.palabra} />
      {!this.juegoTerminado() ? <LetrasUsadas letras={this.props.letrasUsadas} onNuevaLetra={this.props.onNuevaLetra} /> :
      <FinDeJuego juegoGanado={this.props.juegoGanado} onResetearJuego={this.props.onResetearJuego} />
      }
    </div>
  );
}

const palabras = [
  'SOFKAU',
  'SOFKA',
'FULLSTACK'
];



function escogerPalabra(){
  const indice =  Math.floor(Math.random() * palabras.length);
  return palabras[indice];
}

function juegoEstaGanado(state) {
  return palabraAdivinada(state.palabra, state.letrasUsadas) === state.palabra;
}

function palabraAdivinada(palabra, letrasUsadas) {
  const letrasNoAdivinadas = _.difference(palabra.split(''), letrasUsadas);
  return letrasNoAdivinadas.reduce((palabraAdivinada, letrasNoAdivinada) => {
    return palabraAdivinada.replace(new RegExp(letrasNoAdivinada, 'g'), '_');
  }, palabra);
}

/*function pintarEspacios(){
  escogerPalabra().split('').join('_');
}*/

function juegoTerminado() {
  return this.props.juegoGanado || this.props.juegoPerdido;
}

class LetrasUsadas extends React.Component {
  constructor(props) {
    super();

    this.state = {
      palabra: escogerPalabra(),
      letrasUsadas: []
    };
    this.handleNuevaLetra = this.handleNuevaLetra.bind(this);
    this.handleResetearJuego = this.handleResetearJuego.bind(this);
  }
 
  render() {
    return <div>
      Letras usadas: {this.props.letras.join(' - ')}
      {' '}
      <input
        type="text"
        value=""
        className="input-letra"
        placeholder="Adivina una letra"
        onChange={this.handleNuevaLetra.bind(this)} />
    </div>;
  }

  // handleNuevaLetra(ev) {
  //   const letra = ev.target.value[0];

  //   if (/[A-Za-z]/.test(letra)) {
  //     this.props.onNuevaLetra(letra.toUpperCase());
  //   }
  // }


  handleNuevaLetra(letra) {
    if (this.state.letrasUsadas.indexOf(letra) !== -1) {
      return;
    }

    this.setState({
      letrasUsadas: this.state.letrasUsadas.concat(letra)
    });
  }

  handleResetearJuego() {
    this.setState({
      palabra: escogerPalabra(),
      letrasUsadas: []
    });
  }
}

export default App;
