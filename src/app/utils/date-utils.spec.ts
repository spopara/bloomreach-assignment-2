import { DateUtils } from './date-utils';
import { set, reset } from 'mockdate';

describe('DateUtils', () => {
  describe('getFirstDayOfCurrentMonth', () => {
    const dummyDate = '1950-11-13T18:09:12.451Z';

    beforeEach(() => {
      set(dummyDate);
    });

    afterEach(() => {
      reset();
    });

    it('should return correct date of month', () => {
      const expectedDate = '1950-11-01T00:00:00.000Z';
      const date = DateUtils.getFirstDayOfCurrentMonth();

      expect(date.toISOString()).toEqual(expectedDate);
    });
  });
});
