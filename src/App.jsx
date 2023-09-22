//import React from "react";
import "./css/style.scss";

const $valor1 = document.getElementById("valor1");
const $valor2 = document.getElementById("valor2");
const $result = document.getElementById("resultado");

let n1 = 0,
  n2 = 0;
const validarValores = (val1 = 1, val2 = 3) => {
  console.log(`tipo val1: ${typeof val1}, tipo val2: ${typeof val2}`);
  n1 = parseFloat(val1);
  n2 = parseFloat(val2);
  if (typeof n1 !== "number" || typeof n2 !== "number") {
    $valor1.value = "";
    $valor2.value = "";
  }
};
const sumar = () => n1 + n2;
const restar = () => n1 - n2;
const multiplicar = () => n1 * n2;
const dividir = () => n1 / n2;

function App() {
  const handleClick = (e) => {
    let oper = e.target.id;
    console.log(`elemento id: ${oper}`);
    const operations = {
      add: sumar(),
      substract: restar(),
      multiply: multiplicar(),
      divide: dividir(),
    };
    validarValores($valor1.value, $valor2.value);
    console.log(`valor 1: ${$valor1.value}, valor 2: ${$valor2.value}`);
    console.log(`número 1: ${n1}, número 2: ${n2}`);
    let result = operations[oper];
    console.log(`Resultado = ${result}`);
    $result.textContent = `${result}`;
  };

  return (
    <main className="App">
      <h2>Prueba Calculadora Formulario</h2>
      <div className="valores">
        <label htmlFor="valor1">
          Valor 1:
          <input type="number" name="valor1" id="valor1" required />
        </label>
        <label htmlFor="valor2">
          Valor 2:
          <input type="number" name="valor2" id="valor2" required />
        </label>
      </div>
      <div className="operaciones">
        <button className="operacion" id="add" onClick={handleClick}>
          +
        </button>
        <button className="operacion" id="substract" onClick={handleClick}>
          -
        </button>
        <button className="operacion" id="divide" onClick={handleClick}>
          /
        </button>
        <button className="operacion" id="multiply" onClick={handleClick}>
          *
        </button>
      </div>
      <div className="final">
        <button className="calcular" id="equals">
          =
        </button>
      </div>
      <section className="sec-resultado">
        <p id="resultado">123456789</p>
      </section>
    </main>
  );
}

export default App;
