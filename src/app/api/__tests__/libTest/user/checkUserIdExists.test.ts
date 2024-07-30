import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { checkUserIdExists } from '../../../lib/user/checkUserIdExists';

describe('checkUserIdExists test', () => {
  test('should return boolean', async () => {
    expect(await checkUserIdExists('sakamoto0223')).toBe(true);
    expect(await checkUserIdExists('riku')).toBe(false);
  });
});
