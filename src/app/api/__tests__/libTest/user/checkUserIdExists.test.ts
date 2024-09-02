import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { checkUserIdExists } from '../../../lib/user/checkUserIdExists';

describe('checkUserIdExists test', () => {
  test('should return boolean', async () => {
    expect(await checkUserIdExists('sakamoto_iniad', 'user_2kPwAGrhcnJONeRjoDt7oefWMLm')).toBe(
      true,
    );
    expect(await checkUserIdExists('riku', 'hoge')).toBe(false);
  });
});
