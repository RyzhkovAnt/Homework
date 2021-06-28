import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  {App} from './App/App';
import reportWebVitals from './reportWebVitals';
import {Task1} from "../src/task1/task1"
import {TestDnD} from "./task1/testDnD"
ReactDOM.render(
  <React.StrictMode>
    <Task1/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
