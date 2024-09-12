import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getUsers } from '../database/schema';

const UserSignupListScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEmailAndUserData = async () => {
      try {
        getAllUsers()
      } catch (error) {
        console.log("homescreen error",error)
      }
    };

    fetchEmailAndUserData();
  }, []);


  const getAllUsers = () => {
    getUsers(users => {
      if (users) {
        setUsers(users);
        console.log('users found locally:', users);
      } else {
        console.log('User not found in local database');
      }
    });
  };



  return (
    <View style={styles.container}>
    {/* Header Row */}
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>Name</Text>
      <Text style={styles.headerText}>Email</Text>
    </View>
    
    {/* User Data */}
    {users.length > 0 ? (
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.name}</Text>
            <Text style={styles.rowText}>{item.email}</Text>
          </View>
        )}
      />
    ) : (
      <Text style={styles.noUsersText}>No users found</Text>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowText: {
    fontSize: 14,
    flex: 1,
  },
  noUsersText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserSignupListScreen
