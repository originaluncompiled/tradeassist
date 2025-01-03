import { SQLiteDatabase } from 'expo-sqlite';

export const migrateDbIfNeeded = async (db: SQLiteDatabase): Promise<void> => {
  const version = await db.getFirstAsync<{user_version: number}>(
    'PRAGMA user_version'
  );

  // 'contractSize', 'pipSize' can be NULL if the market is not 'futures', or 'forex' respectively
  if (version?.user_version === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        currency TEXT NOT NULL,
        market TEXT NOT NULL,
        startingBalance REAL NOT NULl DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        accountId INTEGER NOT NULL,
        assetName TEXT NOT NULL,
        contractSize REAL DEFAULT NULL,
        pipSize REAL DEFAULT NULL,
        FOREIGN KEY (accountId) REFERENCES accounts (id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS trades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        accountId INTEGER NOT NULL,
        asset TEXT DEFAULT '',
        date TEXT DEFAULT '',
        tradeReturn REAL DEFAULT 0,
        tradeOutcome TEXT DEFAULT 'BREAK EVEN',
        direction TEXT DEFAULT 'Long',
        rating INTEGER DEFAULT 0,
        balanceChange REAL DEFAULT 0,
        takeProfit REAL DEFAULT 0,
        stopLoss REAL DEFAULT 0,
        target REAL DEFAULT 0,
        risk REAL DEFAULT 0,
        entry REAL DEFAULT 0,
        exit REAL DEFAULT 0,
        entryTime INTEGER,
        exitTime INTEGER,
        amountTraded INTEGER DEFAULT 0,
        commission REAL DEFAULT 0,
        notes TEXT DEFAULT '',
        FOREIGN KEY (accountId) REFERENCES accounts (id) ON DELETE CASCADE
      )
    `)
  };

  // Prevent ^ from running more than once
  await db.execAsync(`PRAGMA user_version = 1`);
}

export default migrateDbIfNeeded