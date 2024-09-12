import SQLite from 'react-native-sqlite-storage';

// Open or create the database
const db = SQLite.openDatabase({ name: 'app.db', location: 'default' });

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL
      );`
    );
  });
};

export const insertContact = (name, email, message, successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`,
      [name, email, message],
      (_, result) => successCallback(result.rowsAffected > 0),
      (_, error) => {
        console.error('Error inserting contact:', error);
        successCallback(false);
      }
    );
  });
};

export const insertUser = (name, email, password, successCallback) => {
  const created_at = new Date().toISOString(); // Add current date-time

  db.transaction(tx => {
    console.log("Inserting user with details:", name, email, password);
    tx.executeSql(
      `INSERT INTO users (name, email, password,created_at) VALUES (?, ?, ?, ?)`,
      [name, email, password,created_at],
      (_, result) => {
        console.log('Insert result:', result);
        successCallback(result.rowsAffected > 0);
      },
      (_, error) => {
        console.error('Error inserting user:', error); // Log the entire error object
        successCallback(false);
      }
    );
  });
};


export const getUsers = (successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM users`,
      [],
      (_, result) => {
        const usersArray = [];
        for (let i = 0; i < result.rows.length; i++) {
          usersArray.push(result.rows.item(i));
        }
        console.log('Users fetched from SQLite:', usersArray); // Log the array of users
        successCallback(usersArray);
      },
      (_, error) => {
        console.error('Error while fetching users:', error);
        return false;
      }
    );
  });
};

// Function to delete all data from the users table
export const deleteAllUsers = (successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM users`,
      [],
      (_, result) => {
        console.log('All users deleted successfully');
        if (successCallback) {
          successCallback(result);
        }
      },
      (_, error) => {
        console.error('Error while deleting users:', error);
        return false;
      }
    );
  });
};


export const updateUser = (email, name, successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE users SET name = ? WHERE email = ?`,
      [name, email],
      (_, result) => {
        successCallback(result.rowsAffected > 0); // Returns true if any row was updated
      },
      (_, error) => {
        console.error('Error updating user:', error);
        successCallback(false); // Return false on error
      }
    );
  });
};
