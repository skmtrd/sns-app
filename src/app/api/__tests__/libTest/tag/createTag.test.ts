import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { CreateTag } from '../../../lib/tag/createTag';

describe('createTag test', () => {
  test('should return object', async () => {
    expect(await CreateTag('testtag1')).toStrictEqual({
      message: 'already exit tag',
    });
    expect(await CreateTag('testtag2')).toStrictEqual({
      message: 'create success',
    });
  });
});
