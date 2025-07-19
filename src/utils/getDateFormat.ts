import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(weekday);
dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

/**
 * Converts a date string in MM/DD/YYYY format to "dddd, MMMM D"
 * e.g., "06/18/2025" => "Wednesday, June 18"
 */
export function getFormattedDate(inputDate: string): string {
  return dayjs(inputDate, 'MM/DD/YYYY').format('dddd, MMMM D');
}
