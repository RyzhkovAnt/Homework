import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import Task1 from "../src/task1/task1"
import { TestDnD } from "./task1/testDnD"
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AdditionalInfo } from './AdditionalInfo/AdditionalInfo';

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    {/* <Switch>
      <Route path="/app" component={App} exact/>
      <Route path="/app/:id/:name" component={AdditionalInfo}/>
    </Switch> */}
    <App/>
  </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
