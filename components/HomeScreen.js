
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

const HomeScreen = ({ navigation }) => {
  const expenses = useSelector((state) => state.expenses);// Get expenses from Redux store
  const dispatch = useDispatch();// Dispatch action to update store

  const handleDeleteExpense = (id) => {  // Delete an expense by id
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };
 // Navigate to "Add Expense" screen with data for editing an expense
  const handleEditExpense = (expense) => {
    navigation.navigate("Add Expense", { expense }); // Pass expense data for editing
  };
  // Render each expense item
  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={[styles.expenseItem, { flex: 1 }]}>
        <Text style={styles.expenseText}>
          {item.category} - ${item.amount}
        </Text>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.destext}>{item.description}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton
          icon="pencil"
          onPress={() => handleEditExpense(item)} // Pass expense to edit
        />
        <IconButton
          icon="delete"
          onPress={() => handleDeleteExpense(item.id)} // Pass id to delete
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense Tracker</Text>
      

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ${expenses.reduce((acc, exp) => acc + exp.amount, 0)}
        </Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.expenseList}
      />

<TouchableOpacity
  style={styles.summaryButton}
  onPress={() => navigation.navigate("Summary")}
>
  <Text style={styles.summaryButtonText}>View Summary</Text>
</TouchableOpacity>


      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Add Expense")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  header: {
    fontSize: 28,  
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333", 
    elevation: 4,
  },
  summaryButton: {
    backgroundColor: '#4CAF50',  // Green color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    
    elevation: 5,  
  },
  summaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',  
  },

  totalContainer: {
    backgroundColor: "#4CAF50", 
    padding: 15,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 120, 
    elevation: 8,  
  },

  totalText: {
    fontSize: 26, 
    fontWeight: "700",
    color: "white",
  },

  expenseList: {
    paddingBottom: 70, 
  },

  expenseItem: {
    backgroundColor: "#fff",
    padding: 18,
    marginVertical: 12,
    borderRadius: 12, 
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 10,  
  },

  expenseText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  dateText: {
    fontSize: 16,
    color: "#666", 
  },

  destext: {
    fontSize: 16,
    fontWeight: "600",
  },

  fab: {
    position: "absolute",
    bottom: 30, 
    right: 30,  
    backgroundColor: "#4CAF50",  
    width: 70,  
    height: 70,
    borderRadius: 35, 
    justifyContent: "center",
    alignItems: "center",
    elevation: 12,  
    marginBottom: 50, 
  },

  fabText: {
    fontSize: 36, 
    color: "#fff",
  },

});


export default HomeScreen;
