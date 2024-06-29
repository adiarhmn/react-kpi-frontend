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

export const DatetimeToDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('id-ID', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

// to lower case
export const toLowerCase = (str: string): string => str.toLowerCase();

export const DatetimeToTime = (dateString: string): string => {
  const date = new Date(dateString);
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${hour}:${minute}`;
};

export function getStartAndEndOfMonth(month: string = ''): {
  startOfMonth: Date;
  endOfMonth: Date;
} {
  const now = new Date(month);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const endOfMonth = new Date(startOfNextMonth.getTime() - 1);
  return { startOfMonth, endOfMonth };
}

export function getDaysInMonth(dateString: string): number {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return new Date(year, month, 0).getDate();
}

export const getDaysInMonths = (
  month: number,
  year: number
): { date: string; dayName: string }[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Mendapatkan jumlah hari dalam bulan
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayName = dayNames[date.getDay()];
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    daysArray.push({ date: formattedDate, dayName });
  }

  return daysArray;
};

export function getLateDuration(startTime: string, endTime: string) {
  // Membagi waktu menjadi jam dan menit
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  // Menghitung total menit dari jam 00:00
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  // Menghitung selisih menit
  const diffMinutes = endTotalMinutes - startTotalMinutes;

  // Mengubah selisih menit menjadi jam dan menit
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours} jam ${minutes} menit`;
}
