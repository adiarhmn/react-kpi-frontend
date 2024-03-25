const storagePrefix = 't-paz';

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}_token`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}_token`, JSON.stringify(token));
  },
  clear: () => {
    window.localStorage.removeItem(`${storagePrefix}_token`);
    window.localStorage.removeItem(`${storagePrefix}_outlet`);
  },
  getOutlet: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}_outlet`) as string) || null;
  },
  setOutlet: (outlet: any) => {
    window.localStorage.setItem(`${storagePrefix}_outlet`, JSON.stringify(outlet));
  },
};

export default storage;
