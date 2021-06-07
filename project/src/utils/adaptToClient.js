const adaptToClient = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const keyCamel = key.replace(/(\_\w)/g, (match) => match[1].toUpperCase());
      const isRecursive = typeof value === 'object';
      newObj[keyCamel] = isRecursive ? adaptToClient(value) : value;
    }
  }
  return newObj;
}

export default adaptToClient;
