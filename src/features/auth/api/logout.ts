import storage from '@/utils/storage';

export async function logout() {
  storage.clear();
  localStorage.clear();
}
