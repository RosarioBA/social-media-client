// test/auth.test.js
import { jest, describe, beforeEach, test, expect } from '@jest/globals';
import { login, logout } from '../src/js/api/auth/index.js';
import { save, load, remove } from '../src/js/storage/index.js';


// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ accessToken: 'fake-token', name: 'Test User' }),
  })
);

// Mock storage functions

jest.mock('../src/js/storage/index.js', () => ({
  save: jest.fn(),
  load: jest.fn(),
  remove: jest.fn(),
}));

describe('Authentication', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('login function stores a token when provided with valid credentials', async () => {
    const validCredentials = { email: 'test@example.com', password: 'password123' };
    const profile = await login(validCredentials.email, validCredentials.password);
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/social/auth/login'),
      expect.objectContaining({
        method: 'post',
        body: JSON.stringify(validCredentials),
      })
    );
    expect(save).toHaveBeenCalledWith('token', 'fake-token');
    expect(save).toHaveBeenCalledWith('profile', { name: 'Test User' });
    expect(profile).toEqual({ name: 'Test User' });
  });

  test('logout function removes the token and profile from storage', () => {
    logout();
    expect(remove).toHaveBeenCalledWith('token');
    expect(remove).toHaveBeenCalledWith('profile');
  });
});