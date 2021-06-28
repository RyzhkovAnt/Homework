
/**
 * Сортировка массива объектов
 * @param {[]} elements Сортируемый массив 
 * @param {string} field Поле по которому производится сортировка
 * @param {boolean} descendingOrder Флаг сортировки по убыванию
 * @returns Отсортированный массив
 */
export const sortElement = (elements, field, descendingOrder) => {
    let mapped = elements && elements.map((item, index) => {
        return { index, value: item[field] }
    });
    mapped.sort((a, b) => {
        if (a.value > b.value) {
            return 1;
        }
        if (a.value < b.value) {
            return -1;
        }
        return 0;
    })
    let result = mapped.map(el => {
        return elements[el.index]
    })
    return descendingOrder ? result.reverse() : result;
}
/**
 * Фильтрация эдементов массива
 * @param {[]} items Массив элементов
 * @param {string} substring Подстрока
 * @returns Отфильтрованный массив
 */
export const FilterElements = (items, substring) => {
    return items.filter(item => {
        for (let prop in item) {
            if (typeof item[prop]!=='object' && item[prop].toString().toLowerCase().includes(substring.toLowerCase())) {
                return true;
            }
        }
        return false;
    })
}

/**
 * Получение подмассива элементов
 * @param {[]} items Массив элементов
 * @param {*} startIndex Индекс первого элемента
 * @param {*} count Количество элементов
 * @returns подмассив элементов
 */
export const getSomeItems = (items, startIndex = 0, count = 50) => {

    if (items.length <= count) {
        return items;
    }

    if(items.length > startIndex + count){
        return items.slice(startIndex,startIndex + count)
    }

    return items.slice(startIndex);
}