import { iUser } from '../../../src/common/interface/entity-user';
import dataFormatting from '../../../src/common/util/function/data-formatting';

describe('dataFormatting', () => {
  it('should format the firstName, lastName, and email to lowercase', () => {
    const input: iUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'TEST@EMAIL.COM',
      password: 'securePassword123',
    };

    const expectedOutput: iUser = {
      firstName: 'john',
      lastName: 'doe',
      email: 'test@email.com',
      password: 'securePassword123',
    };

    const result = dataFormatting(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle undefined values', () => {
    const input: iUser = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: 'securePassword123',
    };

    const expectedOutput: iUser = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: 'securePassword123',
    };

    const result = dataFormatting(input);

    expect(result).toEqual(expectedOutput);
  });
});
