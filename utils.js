export function pick(obj, ...props) {
    const objKeys = Object.keys(obj);
    const result = {};

    for (const key of objKeys) {
        for (const prop of props) {
            console.log(prop);
            if (key === prop.split(':')[0]) {
                if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    let [oldKey, newKey] = prop.split(':');
                    if (!newKey) newKey = oldKey;

                    result[newKey] = pick(obj[oldKey], ...props);
                } else if (Array.isArray(obj[key])) {
                    let [oldKey, newKey] = prop.split(':');
                    if (!newKey) newKey = oldKey;

                    console.log(newKey, oldKey);

                    result[newKey] = obj[oldKey].map(item => pick(item, ...props));
                } else {
                    let [oldKey, newKey] = prop.split(':');
                    if (!newKey) newKey = oldKey;

                    console.log(newKey, oldKey);

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
