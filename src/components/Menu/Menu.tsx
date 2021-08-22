import React from 'react'
import { useDispatch } from 'react-redux';


const BIG_FROM_SERVER = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
const SMALL_FROM_SERVER = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
const BIG_FROM_FILE = "/data_big.json";
const SMALL_FROM_FILE = "/data_small.json";


const Menu = (props) => {
    const dispatch = useDispatch()
    const clickHandler = (source) => {
        dispatch({type:"FETCH_DATA",payload:source})
    }

    return <div className="menu">Загрузить:

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

export default Menu