import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Error } from "./Error"
import * as Yup from 'yup';
import "./style.css";

export const AddUser = (props) => {
    const { onSubmit } = props;
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const formik = useFormik({
        initialValues: {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        },
        onSubmit: values => {
            console.log("submit values", values)
            onSubmit({
                ...values
            })
        },
        validationSchema: Yup.object({
            id: Yup.number().positive('Это должно быть положительное число')
                .required('Обязательное поле')
                .integer('Это должно быть целое число'),
            firstName: Yup.string().required('Обязательное поле')
                .max(20, 'длина не более 20 символов'),
            lastName: Yup.string().required('Обязательное поле')
                .max(20, 'длина не более 20 символов'),
            email: Yup.string().email('Email указан неверно').required('Обязательное поле'),
            phone: Yup.string().matches(phoneRegExp, 'Телефон указан неверно').required('Обязательное поле')
        })
    })

    return <form onSubmit={formik.handleSubmit}>
        <div className="id">
            <label>
                Id:
                <input
                    value={formik.values.id}
                    id="id"
                    name="id"
                    onChange={formik.handleChange} />
            </label>
            {formik.touched.id && formik.errors.id ? (
                <Error text={formik.errors.id} />
            ) : null}
        </div>
        <div className="firstName"><label>
            first Name:
            <input
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange} />
        </label>
            {formik.touched.firstName && formik.errors.firstName ? (
                <Error text={formik.errors.firstName} />
            ) : null}
        </div>
        <div className="lastName"><label>
            last Name:
            <input
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange} />
        </label>
            {formik.touched.lastName && formik.errors.lastName ? (
                <Error text={formik.errors.lastName} />
            ) : null}
        </div>
        <div className="email"><label>
            email:
            <input type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange} />
        </label>
            {formik.touched.email && formik.errors.email ? (
                <Error text={formik.errors.email} />
            ) : null}</div>
        <div className="phone"><label>
            phone:
            <input type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange} />
        </label>
            {formik.touched.phone && formik.errors.phone ? (
                <Error text={formik.errors.phone} />
            ) : null}</div>
        <button type='submit'>Сохранить</button>
    </form>
}