/**
 * Used to format classes
 * @param classes classes
 * @returns formated class
 */
export function clsx(...classes: any[]): string {
  return classes.filter(Boolean).join(' ').trim();
}

export function formatQuery(url: string, query: { [key: string]: any }) {
  return `${url}?${Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&')}`;
}

/**
 * Used to format plain number to currency format
 * @param {string | number} price price to format
 * @returns formated price
 */
export function formatCurrency(price: string | number) {
  return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
    .format(price as number)
    .replace(/(\.|,)00$/g, '');
}

/**
 * Used to format bytes number to formated string
 * @param bytes bytes
 * @param decimals decimal number
 * @returns formated byte size
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const formatDateToString = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() mengembalikan bulan mulai dari 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export function getStartAndEndOfMonth(month: string = ""): { startOfMonth: Date; endOfMonth: Date } {
  const now = new Date(month);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const endOfMonth = new Date(startOfNextMonth.getTime() - 1);
  return { startOfMonth, endOfMonth };
}
