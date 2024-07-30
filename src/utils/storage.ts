const storagePrefix = 'kpi';

const storage = {
  getToken: () => {
    return window.localStorage.getItem(`${storagePrefix}_token`);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}_token`, token);
  },
  clear: () => {
    window.localStorage.removeItem(`${storagePrefix}_token`);
  },
  getOutlet: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}_outlet`) as string) || null;
  },
  setOutlet: (outlet: any) => {
    window.localStorage.setItem(`${storagePrefix}_outlet`, JSON.stringify(outlet));
  },
};

export default storage;
