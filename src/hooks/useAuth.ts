import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}