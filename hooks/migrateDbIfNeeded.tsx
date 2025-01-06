import { SQLiteDatabase } from 'expo-sqlite';

export const migrateDbIfNeeded = async (db: SQLiteDatabase): Promise<void> => {
  const version = await db.getFirstAsync<{user_version: number}>(
    'PRAGMA user_version'
  );

  if (version?.user_version === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        currency TEXT NOT NULL,
        market TEXT NOT NULL,
        starting_balance REAL NOT NULl DEFAULT 0,
        break_even_buffer REAL NOT NULL DEFAULT 1
      );
      CREATE TABLE IF NOT EXISTS balanceHistory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        value DECIMAL NOT NULL DEFAULT 0,
        time TEXT DEFAULT '',
        tx_type TEXT DEFAULT '',
        currency TEXT DEFAULT '',
        balance_after_tx DECIMAL DEFAULT 0,
        FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        asset_name TEXT NOT NULL,
        FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS trades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        asset TEXT DEFAULT '',
        date TEXT DEFAULT '',
        trade_return REAL DEFAULT 0,
        trade_outcome TEXT DEFAULT 'BREAK EVEN',
        direction TEXT DEFAULT 'Long',
        rating INTEGER DEFAULT 0,
        balance_change REAL DEFAULT 0,
        take_profit DECIMAL DEFAULT 0,
        stop_loss DECIMAL DEFAULT 0,
        target REAL DEFAULT 0,
        risk REAL DEFAULT 0,
        entry DECIMAL DEFAULT 0,
        exit DECIMAL DEFAULT 0,
        entry_time INTEGER,
        exit_time INTEGER,
        amount_traded DECIMAL DEFAULT 0,
        commission REAL DEFAULT 0,
        notes TEXT DEFAULT '',
        FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
      )
    `)
  };

  // Prevent ^ from running more than once
  await db.execAsync(`PRAGMA user_version = 1`);
}

export default migrateDbIfNeeded