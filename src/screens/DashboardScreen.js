import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment'; 
import { getUsers } from '../database/schema';

const DashboardScreen = () => {
  const [usersByMonth, setUsersByMonth] = useState([]);

  useEffect(() => {
    getUsers((users) => {
      const groupedData = groupUsersByMonth(users);
      setUsersByMonth(groupedData);
    });
  }, []);

  const groupUsersByMonth = (users) => {
    const months = Array(12).fill(0);

    users.forEach((user) => {
      const month = moment(user.created_at).month();
      months[month] += 1; 
    });

    return months;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Signup Performance</Text>
      <ScrollView horizontal={true}>
      <BarChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Dec'],
          datasets: [
            {
              data: usersByMonth, 
            },
          ],
        }}
        width={Dimensions.get('window').width} 
        height={220}
        xLabelsOffset={-12}
        yAxisLabel=""
        yAxisSuffix=" users"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: () => `orange`,
          labelColor: () => `black`,
          style: {
            borderRadius: 16,
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        // verticalLabelRotation={90}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    width:900
    
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DashboardScreen;
