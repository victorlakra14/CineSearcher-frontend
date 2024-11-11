export const lowercaseFirstLetter = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = key.charAt(0).toLowerCase() + key.slice(1);
    acc[newKey] = value;

    return acc;
  }, {});
