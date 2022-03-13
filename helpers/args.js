const getArgs = (args) => {
    const result = {};
    const [executor, file, ...rest] = args;
    rest.forEach((item, index, array) => {
        if(item.charAt(0) == '-') {
            if(index == array.length - 1) {
                result[item.substring(1)] = true;
            } else if(array[index + 1].charAt(0) != '-') {
                result[item.substring(1)] = array[index + 1];
            } else {
                result[item.substring(1)] = true;
            }
        }
    });
    
    return result;
}

export { getArgs };