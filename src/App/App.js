import React, { useState } from 'react';
import axios from 'axios';
import { Table } from '../Table/Table';
import { Preloader } from "../PreLoader/Preloader"
import { DragDropContext } from 'react-beautiful-dnd'; 
import './style.css';

export const App = (props) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSuccsess = (response) => {
    setLoading(false)
    setData(response.data.data)
  }

  const onSuccsessFromServer = (response) => {
    setLoading(false)
    setData(response.data)
  }

  const onError = (error) => {
    setLoading(false)
    console.log(error)
  }


  return (
    <div className="App">
      {
        data.length === 0 && <div className="menu">Загрузить:

          <button onClick={() => {
            setLoading(true)
            axios.get("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
              .then(onSuccsessFromServer)
              .catch(onError)
          }}>Малый пак с сервера</button>

          <button onClick={() => {
            setLoading(true)
            axios.get("http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
              .then(onSuccsessFromServer)
              .catch(onError)
          }}>Большой пак c сервера</button>

          <button onClick={() => {
            setLoading(true)
            axios.get("/data_small.json")
              .then(onSuccsess)
              .catch(onError)
          }}>Малый пак из файла</button>

          <button onClick={() => {
            setLoading(true)
            axios.get("/data_big.json")
              .then(onSuccsess)
              .catch(onError)
          }}>Большой пак из файла</button>
        </div>
      }

      { loading && <Preloader />}

      { !loading && data.length > 0 && <Table items={data} /> }
    </div>
  );
}
export default App
