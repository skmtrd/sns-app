import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { checkTagExists } from '../../../lib/tag/checkTagExists';

describe('checkTagExits test', () => {
  test('should return 200', async () => {
    expect(await checkTagExists('testtag1')).toBe(true);
    expect(await checkTagExists('riiii')).toBe(false);
  });
});
