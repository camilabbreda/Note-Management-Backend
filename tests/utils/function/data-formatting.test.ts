import { iUser } from '../../../src/common/interface/entity-user';
import dataFormatting from '../../../src/common/util/function/data-formatting';

describe('dataFormatting', () => {
  it('should format the userName, firstName, lastName, and email to lowercase', () => {
    const input: iUser = {
      userName: 'User123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'TEST@EMAIL.COM',
      password: 'securePassword123',
    };

    const expectedOutput: iUser = {
      userName: 'user123',
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
      userName: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: 'securePassword123',
    };

    const expectedOutput: iUser = {
      userName: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: 'securePassword123',
    };

    const result = dataFormatting(input);

    expect(result).toEqual(expectedOutput);
  });
});
