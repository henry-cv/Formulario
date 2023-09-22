import "./styles.css";
//import { createStore } from "redux";
import { Component } from "react";
import { createRoot } from "react-dom";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

// Redux:
const ADD = "ADD";

const addMessage = (message) => {
  return {
    type: ADD,
    message
  };
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.message];
    default:
      return state;
  }
};

const store = createStore(messageReducer);

// React:

class DisplayMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      messages: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: "",
        messages: state.messages.concat(currentMessage)
      };
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input value={this.state.input} onChange={this.handleChange} />
        <br />
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map((message, idx) => {
            return <li key={idx}>{message}</li>;
          })}
        </ul>
      </div>
    );
  }
}

//const Provider = ReactRedux.Provider;

export default class AppWrapper extends Component {
  // Renderiza el Provider debajo de esta línea
  render() {
    return (
      <Provider store={store}>
        <DisplayMessages />
      </Provider>
    );
  }
  // Cambia el código encima de esta línea
}
const root = createRoot(document.getElementById("root"));
root.render(<AppWrapper />);
/*
Se nos pide renderizar el Provider, entonces, se creo el método render que hace falta,
con la orden return y dentro la estructura de componente React, como padre <Provider> y dentro de el, como hijo el componente de clase aquí definido <DisplayMessages>.
Provider recibe dos propiedades, el almacen de Redux y los componentes hijos de la app entonces la prop store={store} la variable de redux=Redux.createStore y la app ya indicada.
 */
