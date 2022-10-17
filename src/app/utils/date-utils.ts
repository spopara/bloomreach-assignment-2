export class DateUtils {
  /**
   * Gets a date object set to the firts date of the current month.
   *
   * @returns - a date
   */
  static getFirstDayOfCurrentMonth(): Date {
    const currentDate = new Date();
    const firstDayMonth = new Date(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-01T00:00:00.000Z`
    );

    return firstDayMonth;
  }

  /**
   * Creates a date without a time component.
   *
   * @param date - a date from which to remove the time
   * @returns  - an ISO date string
   */
  static createDateWithoutTime(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  /**
   * Creates date with time set to 00:00:00.000.
   *
   * @param date - a date to set to 0 time
   * @returns - an ISO date string
   */
  static createDateWithZeroTime(date: Date): string {
    const dateComponent = this.createDateWithoutTime(date);

    return `${dateComponent}T00:00:00.000Z`;
  }
}
