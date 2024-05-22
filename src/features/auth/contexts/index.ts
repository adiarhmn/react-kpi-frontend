import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { createContext } from 'react';
import { Creds } from '../types';


export type AuthContextValue = {
  creds: Creds | null;
  logout: UseMutateAsyncFunction<any, any, void, any>;
};

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);
