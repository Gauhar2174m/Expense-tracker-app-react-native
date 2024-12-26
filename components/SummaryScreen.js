

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';  // Pie chart component
import { useSelector } from 'react-redux';


const colors = [
  '#FF6347', // Tomato
  '#32CD32', // LimeGreen
  '#1E90FF', // DodgerBlue
  '#FFD700', // Gold
  '#8A2BE2', // BlueViolet
  '#FF1493', // DeepPink
  '#00FA9A', // MediumSpringGreen
];

const SummaryScreen = () => {
  const expenses = useSelector(state => state.expenses);  // Get expenses from Redux store

  // Use the reduce() function to accumulate the total amount spent in each category
  const categories = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {}); // Start with an empty object as the initial value for the accumulator

  // Prepare data for pie chart
  const data = Object.keys(categories).map((category, index) => ({
    name: category,
    population: categories[category],  // The total amount spent in that category
    color: colors[index % colors.length],  // Assign a color from the array, cycling if there are more categories than colors
    legendFontColor: 'black',
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>  
        
        {/* This expression calculates the total amount of all expenses */}
        <Text style={styles.totaltxt}>Total Spent: ${expenses.reduce((acc, exp) => acc + exp.amount, 0).toFixed(2)}</Text>
      </View>
      <PieChart
        data={data}  // Data for the pie chart
        width={400}  
        height={220}  
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffdd00',
          decimalPlaces: 2, 
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  
        }}
        accessor="population"  
        backgroundColor="transparent" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',  
  },
  header: {
    flexDirection: 'row',  
    justifyContent: 'center',  
    alignItems: 'center',  
    height: 120,
    margin: 10,
    marginTop: 25,
    backgroundColor: '#4CAF50',  
    elevation: 5,  
    borderRadius: 20,  
    width: '90%',  
  },
  totaltxt: {
    fontSize: 26, 
    fontWeight: '700', 
    color: 'white', 
  },
});

export default SummaryScreen;
