const replaceAll = (str = '', map = {}) => {
    Object.keys(map).forEach((k) => {
        str = str.replace(k, map[k])
    })

    return str
}

module.exports = {
    replaceAll: replaceAll
}