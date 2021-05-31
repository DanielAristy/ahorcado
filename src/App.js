import './App.css';
import _ from 'lodash';

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

const FinJuego = ({ juegoGanado, onResetearJuego }) => {
  const mensaje = juegoGanado ? <span style={{ color: 'green' }}>Ganaste!</span>
    : <span style={{ color: 'red' }}>Perdiste!</span>;
  return <div>
    {mensaje}
    <button onClick={onResetearJuego}>Intenta otra vez</button>
  </div>;
}

function App() {
  const onResetearJuego = () => {

  };

  return (
    <div className="juego">
      <h3>Juego de Ahorcado</h3>
      <Horca ancho={300} alto={300} anchoContenido={200}>
        <Hombre nivel={8} />
      </Horca>

      <Palabra palabra={"SofkaU"} />
      <FinJuego juegoGanado={false} onResetearJuego={onResetearJuego}/>
    </div>
  );
}


export default App;
