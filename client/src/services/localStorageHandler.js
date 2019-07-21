import ls from 'local-storage';

const set = obj => {
  const keys = Object.keys(obj);
  keys.forEach(key => {
    const value = obj[key];
    console.log(`Saving to localStorage: { ${key}: ${value} }`);
    ls(key, value);
  });
};

const get = key => ls(key);

export { set, get };
