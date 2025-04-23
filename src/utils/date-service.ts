// 处理日期

/**
 * dateToString - 将Date对象转换为YYYY-MM-DD格式的字符串
 * @param date - Date对象
 * @returns {string} - 格式化后的日期字符串，格式为 YYYY-MM-DD
 */
const dateToDaystring = function (date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * 获取当前的日期
 * @returns {string} - 返回当前日期，格式为 YYYY-MM-DD
 */
export const getTodayString = function (): string {
  return dateToDaystring(new Date());
};

/**
 * 检查是否为合适的daystring格式
 * @param {string} dayString - 日期字符串，格式为 YYYY-MM-DD
 * @throws {Error} - 如果格式不正确则抛出异常
 */
const validateDaystring = function (dayString: string): void {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dayString)) {
    throw new Error(`Invalid daystring format: ${dayString}. Expected format is YYYY-MM-DD.`);
  }
};

/**
 * 将字符串转换为Date对象
 * @param {string} dayString - 日期字符串，格式为 YYYY-MM-DD
 * @returns {Date} - 转换后的Date对象
 */
export const daystringToDate = function (dayString: string): Date {
  validateDaystring(dayString);
  const parts = dayString.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero-based
  const day = parseInt(parts[2], 10);
  return new Date(year, month, day);
};