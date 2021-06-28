import React from 'react'
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
    return <div className="additionalInfo">
        <div className="additionalInfo-head">
            <div><b>Дополнительная информация:</b></div>
            <div className="additionalInfo-buttons">
                <button className="delete" onClick={deleteHandler}>Удалить</button>
                <button className="close" onClick={closeHandler}>Закрыть</button>
            </div>
        </div>
        <div className="userInfo">
            <span>Выбран пользователь: <b>{`${item.firstName} ${item.lastName}`}</b></span>
            <textarea className="description" value={item.description} />
            <span>Адрес проживания: <b>{item.address.streetAddress || " - "}</b></span>
            <span>Город: <b>{item.address.city || " - "}</b></span>
            <span>Провинция/штат: <b>{item.address.state || " - "}</b></span>
            <span>Индекс: <b>{item.address.zip || " - "}</b></span>
        </div>
    </div>
}