// TODO: Consider nested object properties
// Invoke function recursively

export function pick(obj, ...props) {
    const objKeys = Object.keys(obj);
    const result = {};

    for (const key of objKeys) {
        for (const prop of props) {
            if (key === prop) {
                result[key] = obj[key];
            }
        }
    }

    return result;
}