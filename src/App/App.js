import React, { useState } from 'react';
import axios from 'axios';
import Table from '../Table/Table';
import { Preloader } from "../PreLoader/Preloader"
import { DragDropContext } from 'react-beautiful-dnd';
import './style.css';
import { connect } from 'react-redux';
import { getDataForTable, loading } from '../reducer';

const App = ({ loading, isLoading, data, getData }) => {

  const BIG_FROM_SERVER = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
  const SMALL_FROM_SERVER = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
  const BIG_FROM_FILE = "/data_big.json";
  const SMALL_FROM_FILE = "/data_small.json";

  const clickHandler = (source) => {
    isLoading(true)
    getData(source)
  }
  return (
    <div className="App">
      {
        data.length === 0 && <div className="menu">Загрузить:

          <button onClick={() => {
            clickHandler(SMALL_FROM_SERVER)
          }}>Малый пак с сервера</button>

          <button onClick={() => {
            clickHandler(BIG_FROM_SERVER)
          }}>Большой пак c сервера</button>

          <button onClick={() => {
            clickHandler(SMALL_FROM_FILE)
          }}>Малый пак из файла</button>

          <button onClick={() => {
            clickHandler(BIG_FROM_FILE)
          }}>Большой пак из файла</button>
        </div>
      }

      {loading && <Preloader />}

      {!loading && data.length > 0 && <Table items={data} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.ducks.loading,
    data: state.ducks.data,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    isLoading: (isLoading) => dispatch(loading(isLoading)),
    getData: (source) => dispatch(getDataForTable(source)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
