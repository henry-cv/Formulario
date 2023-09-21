import React from "react";
import "./css/style.scss";

function App() {
  return (
    <main className="App">
      <h2>Prueba Calculadora Formulario</h2>
      <div className="valores">
        <label htmlFor="valor1">
          Valor 1:
          <input type="number" name="valor1" id="valor1" />
        </label>
        <label htmlFor="valor2">
          Valor 2:
          <input type="number" name="valor2" id="valor2" />
        </label>
      </div>
      <div className="operaciones">
        <button className="operacion" id="add">
          +
        </button>
        <button className="operacion" id="substract">
          -
        </button>
        <button className="operacion" id="division">
          /
        </button>
        <button className="operacion" id="multiply">
          *
        </button>
      </div>
      <div className="final">
        <button className="calcular" id="equals">
          =
        </button>
      </div>
      <section className="sec-resultado">
        <p className="resultado">123456789</p>
      </section>
    </main>
  );
}

export default App;
