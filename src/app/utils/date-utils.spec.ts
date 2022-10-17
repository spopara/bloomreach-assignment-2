import { DateUtils } from './date-utils';
import { set, reset } from 'mockdate';

describe('DateUtils', () => {
  const dummyDate = '1950-11-13T18:09:12.451Z';

  beforeEach(() => {
    set(dummyDate);
  });

  afterEach(() => {
    reset();
  });

  describe('getFirstDayOfCurrentMonth', () => {
    it('should return correct date of month', () => {
      const expectedDate = '1950-11-01T00:00:00.000Z';
      const date = DateUtils.getFirstDayOfCurrentMonth();

      expect(date.toISOString()).toEqual(expectedDate);
    });
  });

  describe('createDateWithoutTime', () => {
    it('should return correct date without time', () => {
      const expectedDate = '1950-11-13';
      const date = DateUtils.createDateWithoutTime(new Date());

      expect(date).toEqual(expectedDate);
    });
  });

  describe('createDateWithTime', () => {
    it('should return correct date with time', () => {
      const expectedDate = '1950-11-13T00:00:00.000Z';
      const date = DateUtils.createDateWithZeroTime(new Date(dummyDate));

      expect(date).toEqual(expectedDate);
    });
  });
});
