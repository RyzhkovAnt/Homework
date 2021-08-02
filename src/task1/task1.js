import React from "react"

const findPreMaxEven = (numbers) => {
    const setNumbers = new Set(numbers)
    const uniqueNumbers = Array.from(setNumbers).filter(item => item % 2 === 0).sort()
    return uniqueNumbers[uniqueNumbers.length - 2]
}

const Task1 = (props) => {
    const clickHandler = (e) => {
        const el = [44, 19, 40, 35, 20, 7, 35, 25, 36, 9, 33, 30, 43, 16, 35, 41, 29, 10, 28, 32, 35]
        console.log("all elements:", el)
        console.log(findPreMaxEven(el))
    }

    const changeTitleHandler = (e) => {
        const text = e.target.innerText + " "
        let sign = 0
        setInterval(() => {
            document.title = text.substr(sign, text.length) + text.substr(text.lenght - sign, sign)
            sign++;
            if (sign >= text.length) {
                sign = 0
            }
        }, 100)
    }

    return <div>
        <h1>Task 1</h1>
        <button onClick={clickHandler}> Найти предпоследнее наивысшее четное число</button>
        <button onClick={changeTitleHandler}>Изменить текст вкладки </button>
    </div>
}
export default Task1