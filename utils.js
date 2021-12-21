export function pick(obj, ...props) {
    const objKeys = Object.keys(obj);
    const result = {};

    for (const key of objKeys) {
        for (const prop of props) {
            let [oldPropKey, newPropKey] = prop.split(':');
            if (!newPropKey) newPropKey = oldPropKey;

            if (key === oldPropKey) {
                if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    result[newPropKey] = pick(obj[oldPropKey], ...props);
                } else if (Array.isArray(obj[key])) {
                    result[newPropKey] = obj[oldPropKey].map(item => pick(item, ...props));
                } else {
                    result[newPropKey] = obj[oldPropKey];
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
