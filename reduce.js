/**
 * Reduce
 * @param {[any]} array Array of any data
 * @param {function} cb Callback function executed each iteration
 * @param {any} init Inital value of the accumulator
 * @returns {any} The final accumulator value
 */
const reduce = (array, cb, init) => {
    let acc = init
    if(!Array.isArray(array)) {
        throw Error('First argument is not a type of array')
    } else if (typeof(cb) !== 'function') {
        throw Error('Second argument is not a type of function')
    } else {
        for(let i = 0; i < array.length; i++) {
            acc = cb(acc, array[i], i, array)
        }

        return acc
    }
}