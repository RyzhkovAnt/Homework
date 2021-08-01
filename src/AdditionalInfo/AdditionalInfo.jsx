import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { changeSelectedElement, deleteElement } from '../reducer/actions'
import "./style.css"

/*
Выбран пользователь <b>Sue Corson</b>
Описание:
<textarea>
et lacus magna dolor...
</textarea>
Адрес проживания: <b>9792 Mattis Ct</b>
Город: <b>Waukesha</b>
Провинция/штат: <b>WI</b>
Индекс: <b>22178</b>
 */
export const AdditionalInfo = (props) => {
    const { item, deleteHandler, closeHandler } = props
    const user = useSelector(state => state.tableReducer.selectedElement)
    const dispatch = useDispatch

    return <div className="additionalInfo">
        <div className="additionalInfo-head">
            <div><b>Дополнительная информация:</b></div>
            <div className="additionalInfo-buttons">
                <button className="delete" onClick={deleteElement}>Удалить</button>
                <button className="close" onClick={e=>dispatch(changeSelectedElement(null))}>Закрыть</button>
            </div>
        </div>
        <div className="userInfo">
            <span>Выбран пользователь: <b>{`${user.firstName} ${user.lastName}`}</b></span>
            <textarea className="description" value={user.description} />
            <span>Адрес проживания: <b>{user.address.streetAddress || " - "}</b></span>
            <span>Город: <b>{user.address.city || " - "}</b></span>
            <span>Провинция/штат: <b>{user.address.state || " - "}</b></span>
            <span>Индекс: <b>{user.address.zip || " - "}</b></span>
        </div>
    </div>
}