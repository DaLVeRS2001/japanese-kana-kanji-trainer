const useLocalStorage = () => {
  return {
    clearAll: () => localStorage.clear(),
    remove: (key) => localStorage.removeItem(key),
    add: (key, item) => localStorage.setItem(key, JSON.stringify(item)),
    get: (key) => JSON.parse(localStorage.getItem(key)),
  };
};

export default useLocalStorage;
