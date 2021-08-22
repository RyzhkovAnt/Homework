import React from 'react';
import {Table} from '../components/Table';
import { Preloader } from "../components/Preloader"
import { useSelector } from 'react-redux';
import {Menu} from '../components/Menu';
import './style.css';

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
