const adaptToClient = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const keyCamel = key.replace(/(_\w)/g, (match) => match[1].toUpperCase());
      const isRecursive = typeof value === 'object' && !Array.isArray(value);
      newObj[keyCamel] = isRecursive ? adaptToClient(value) : value;
    }
  }
  return newObj;
};

export const adaptDataList = (dataList) => dataList.map((item) => adaptToClient(item));


export default adaptToClient;
