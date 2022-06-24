interface Option {
    spaceStr?: boolean
    nullStr?: boolean
}

const formatClearData = (obj: any, opt?: Option) => {
    let spaceStrInit: boolean = false
    let nullStrInit: boolean = false

    if (opt) {
        const {spaceStr, nullStr} = opt
        if (spaceStr) spaceStrInit = spaceStr
        if (nullStr) nullStrInit = nullStr
    }

    Object.keys(obj).forEach(key => {
        if (obj[key] === undefined) delete obj[key];
        if (spaceStrInit && obj[key] === '') delete obj[key];
        if (nullStrInit && obj[key] === null) delete obj[key];
    });
    return obj
}

export default formatClearData