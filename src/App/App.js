import React, { useState } from 'react';
import Table from '../Table/Table';
import { Preloader } from "../PreLoader/Preloader"
import { useSelector } from 'react-redux';
import './style.css';
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
