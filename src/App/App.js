import React, { useState } from 'react';
import axios from 'axios';
import Table from '../Table/Table';
import { Preloader } from "../PreLoader/Preloader"
import { DragDropContext } from 'react-beautiful-dnd';
import './style.css';
import { connect, useSelector } from 'react-redux';
import { getDataForTable, loading } from '../reducer';
import { AdditionalInfo } from '../AdditionalInfo/AdditionalInfo';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { AddUser } from '../AddUser/AddUser';
import Menu from '../Menu/Menu';

const App = (props) => {

  const data = useSelector(state => state.tableReducer.data)
  const loading = useSelector(state => state.tableReducer.loading)
  return (
    <div className="App">
      {data.length === 0 && <Menu />}
      {loading && <Preloader />}
      {data.length > 0 && <Table />}
    </div>
  );
}

export default App
