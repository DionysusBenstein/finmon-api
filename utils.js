export function pick(obj, ...props) {
    const objKeys = Object.keys(obj);
    const result = {};

    for (const key of objKeys) {
        for (const prop of props) {
            if (key === prop) {
                if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    result[key] = pick(obj[key], ...props);
                } else if (Array.isArray(obj[key])) {
                    result[key] = obj[key].map(item => pick(item, ...props));
                } else {
                    result[key] = obj[key];
                }
            }
        }
    }

    return result;
}

// const example = {
//     name: 'Denis',
//     age: 19,
//     head: {
//         iq: 2,
//         isGlassed: true
//     }
// }

// console.log(pick(example, 'name', 'head', 'isGlassed'));
