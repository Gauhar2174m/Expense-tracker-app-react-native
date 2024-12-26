

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux'; // Redux provider to wrap the app
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import AddExpenseScreen from './components/AddExpenseScreen';
import SummaryScreen from './components/SummaryScreen';
import storeData from './store/store'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const { store, initExpensesAction } = storeData; // Destructuring the store and action

const Stack = createNativeStackNavigator(); // Initialize navigation container

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadInitialExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem('expenses');
        if (storedExpenses) {
          dispatch(initExpensesAction(JSON.parse(storedExpenses))); // Dispatch to load expenses
        }
      } catch (error) {
        console.error('Failed to load initial expenses from AsyncStorage:', error);
      }
    };

    loadInitialExpenses();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Add Expense" component={AddExpenseScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}> {/* Wrapping the app with Provider to give access to Redux store */}
      <AppContent />
    </Provider>
  );
}

