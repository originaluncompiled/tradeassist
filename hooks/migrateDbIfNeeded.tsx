import { SQLiteDatabase } from 'expo-sqlite';

export const migrateDbIfNeeded = async (db: SQLiteDatabase): Promise<void> => {
  const version = await db.getFirstAsync<{user_version: number}>(
    'PRAGMA user_version'
  );

  if (version?.user_version === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS trades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        asset TEXT DEFAULT '',
        date TEXT DEFAULT '',
        assetType TEXT DEFAULT 'Stocks',
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
        notes TEXT DEFAULT ''
      )
    `)
  };

  // Prevent ^ from running more than once
  await db.execAsync(`PRAGMA user_version = 1`);
}

export default migrateDbIfNeeded