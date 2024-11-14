const mysql = require('mysql2/promise');

const createConnection = jest.fn().mockResolvedValue({
  query: jest.fn().mockResolvedValue([]),
  end: jest.fn().mockResolvedValue(),
});


const createPool = jest.fn().mockResolvedValue({
  getConnection: jest.fn().mockResolvedValue({
    query: jest.fn().mockResolvedValue([]),
    release: jest.fn(),
  }),
  query: jest.fn().mockResolvedValue([]),
  end: jest.fn().mockResolvedValue(),
});

mysql.createConnection = createConnection;
mysql.createPool = createPool;

module.exports = mysql;
