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
}
