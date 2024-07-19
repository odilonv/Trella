const { UserService } = require('../UserService');
const DatabaseConnection = require('../../../models/DatabaseConnection');
const bcrypt = require('bcrypt');

jest.mock('../../../models/DatabaseConnection');
jest.mock('bcrypt');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createUser should create a new user with hashed password', async () => {
    const mockQuery = jest.fn().mockResolvedValueOnce([{ id: 1 }]);
    DatabaseConnection.getInstance = jest.fn().mockResolvedValueOnce({ query: mockQuery });
    bcrypt.hash = jest.fn().mockResolvedValueOnce('hashed_password');

    const user = await UserService.createUser('John', 'Doe', 'john.doe@example.com', 'password123');

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(mockQuery).toHaveBeenCalledWith(
      'INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
      ['John', 'Doe', 'john.doe@example.com', 'hashed_password']
    );
    expect(user).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      id: 1,
    });
  });
});
