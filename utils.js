export function pick(obj, ...props) {
    const objKeys = Object.keys(obj);
    const result = {};

    for (const key of objKeys) {
        for (const prop of props) {
            let [oldKey, newKey] = prop.split(':');
            if (!newKey) newKey = oldKey;

            if (key === oldKey) {
                if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    result[newKey] = pick(obj[oldKey], ...props);
                } else if (Array.isArray(obj[key])) {
                    result[newKey] = obj[oldKey].map(item => pick(item, ...props));
                } else {
                    result[newKey] = obj[oldKey];
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

// console.log(pick(example, 'name', 'head', 'isGlassed:isDebil'));
