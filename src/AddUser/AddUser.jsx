import React, { useState } from 'react'
import "./style.css";

export const AddUser = (props) => {
    const { onSubmit } = props;
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const onChangeIdHandler = (e) => {
        setId(e.target.value)
    }

    const onChangeFirstNameHandler = (e) => {
        setFirstName(e.target.value)
    }

    const onChangeLastNameHandler = (e) => {
        setLastName(e.target.value)
    }

    const onChangePhoneHandler = (e) => {
        setPhone(e.target.value)
    }

    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newUser = { id, firstName, lastName, email, phone, address: {} }
        onSubmit(newUser);
    }

    return <form onSubmit={onSubmitHandler}>
        <div className="id">
            <label>
                Id:
                <input required value={id} onInput={onChangeIdHandler} />
            </label>
        </div>
        <div className="firstName"><label>
            first Name:
            <input required value={firstName} onInput={onChangeFirstNameHandler} />
        </label></div>
        <div className="lastName"><label>
            last Name:
            <input required value={lastName} onInput={onChangeLastNameHandler} />
        </label></div>
        <div className="email"><label>
            email:
            <input required type="email" value={email} onInput={onChangeEmailHandler} />
        </label></div>
        <div className="phone"><label>
            phone:
            <input required type="tel" value={phone} onInput={onChangePhoneHandler} />
        </label></div>
        {id && firstName && lastName && phone && email && <button>Сохранить</button>}
    </form>
}