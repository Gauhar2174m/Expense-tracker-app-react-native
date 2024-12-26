

import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const AddExpenseScreen = ({ navigation, route }) => {
  const { expense } = route.params || {};

  const [amount, setAmount] = useState(expense ? expense.amount.toString() : "");
  const [category, setCategory] = useState(expense ? expense.category : "");
  const [date, setDate] = useState(expense ? expense.date : "");
  const [description, setDescription] = useState(expense ? expense.description : "");
  const [errore, setErrore] = useState(false); // validation state 
  const dispatch = useDispatch();

  const addExpense = () => {
    if (!amount) {  // amount validation
      setErrore(true);
    }
    if (!amount) {
      return false;
    }
    if (!category) { // category validation 
      setErrore(true);
    }
    if (!category) {
      return false;
    }
    if (!date) { // date validation 
      setErrore(true);
    }
    if (!date) {
      return false;
    }

    const newExpense = {
      id: Math.random().toString(),// Generating a unique id for the new expense
      amount: parseFloat(amount),// Converting the amount from string to float
      category,
      date,
      description,
    };

    dispatch({ type: "ADD_EXPENSE", payload: newExpense });
    navigation.goBack();
  };

  const updateExpense = () => {
    const updatedExpense = {
      id: expense.id,
      amount: parseFloat(amount),
      category,
      date,
      description,
    };
// Dispatching action to update the expense in the Redux store
    dispatch({ type: "UPDATE_EXPENSE", payload: updatedExpense });
    navigation.goBack();
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(date || Date.now()),
      onChange: onDateChange,
      mode: "date",
      is24Hour: true,
    });
  };
  // Callback function when the user selects a date
  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString();
      setDate(formattedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Expense</Text>

      <Text style={styles.inputLabel}>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      {errore ? <Text style={styles.errorText}> Please enter a valid amount. </Text> : null}

      <Text style={styles.inputLabel}>Category:</Text>
      <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Travel" value="Travel" />
        <Picker.Item label="Entertainment" value="Entertainment" />
        <Picker.Item label="Healthcare" value="Healthcare" />
        <Picker.Item label="Charity/Donations" value="Charity/Donations" />
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Gifts" value="Gifts" />
        <Picker.Item label="Employee Salaries" value="Employee Salaries" />
      </Picker>
      {errore ? <Text style={styles.errorText}> Please select a category. </Text> : null}

      <Text style={styles.inputLabel}>Date:</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.touchableDate}>
        <Text style={styles.dateText}>{date || "Select date"}</Text>
      </TouchableOpacity>
      {errore ? <Text style={styles.errorText}> Please select date. </Text> : null}

      <Text style={styles.inputLabel}>Description:(Optional)</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={expense ? updateExpense : addExpense}
        >
          <Text style={styles.buttonText}>{expense ? "Update Expense" : "Save Expense"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  picker: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 8,
    backgroundColor: "#fff",
    elevation:2
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 25,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  touchableDate: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginTop: 8,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
});

export default AddExpenseScreen;
