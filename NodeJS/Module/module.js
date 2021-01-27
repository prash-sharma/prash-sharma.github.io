const add = (x, y) => {
    return x + y
}

const sub = (x, y) => {
    return x - y
}

const mul = (x, y) => {
    return x * y
}

const name = 'DevX'

// console.log(add(4, 5))

// module.exports.add = add
// module.exports.sub = sub

module.exports = { add, sub, mul, name }
