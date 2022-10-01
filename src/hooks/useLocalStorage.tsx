import { useState } from 'react';

/**
 * useLocalStorage takes a key and a value and can either store or retrieve values from local storage
 * @param {any} key
 * @param {any} initialValue
 * @example  const [userInfo, setUserInfo] = useLocalStorage('user', null);
 * @returns {storedValue, setValue}
 */

const useLocalStorage = (
  key: any,
  initialValue: any
): [storedValue: any, setValue: React.Dispatch<any>] => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
