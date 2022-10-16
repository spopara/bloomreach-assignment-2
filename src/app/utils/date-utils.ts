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
   * Gets date without time component.
   *
   * @returns - date as string
   */
  static createDateWithoutTime(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  /**
   * Add time component to a date.
   *
   * @returns - date as ISO string with time component set to 00:00:00.000
   */
  static createDateWithTime(date: string): string {
    return `${date}T00:00:00.000Z`;
  }
}
