import { createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state for the app (expenses array)
const initialState = {
  expenses: [], // An array that will hold the expense records
};

// Action types
const INIT_EXPENSES = 'INIT_EXPENSES';
const ADD_EXPENSE = 'ADD_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

// Action creators
const initExpensesAction = (expenses) => ({
  type: INIT_EXPENSES,
  payload: expenses,
});

// Reducer function to handle actions
const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case ADD_EXPENSE:
      const newStateAdd = { ...state, expenses: [...state.expenses, action.payload] };
      AsyncStorage.setItem('expenses', JSON.stringify(newStateAdd.expenses));
      return newStateAdd;

    case DELETE_EXPENSE:
      const newStateDelete = {
        ...state,
        expenses: state.expenses.filter(exp => exp.id !== action.payload),
      };
      AsyncStorage.setItem('expenses', JSON.stringify(newStateDelete.expenses));
      return newStateDelete;

    case UPDATE_EXPENSE:
      const newStateUpdate = {
        ...state,
        expenses: state.expenses.map(exp =>
          exp.id === action.payload.id ? { ...exp, ...action.payload } : exp
        ),
      };
      AsyncStorage.setItem('expenses', JSON.stringify(newStateUpdate.expenses));
      return newStateUpdate;

    default:
      return state;
  }
};

// Function to load expenses from AsyncStorage
const loadExpenses = async () => {
  try {
    const storedExpenses = await AsyncStorage.getItem('expenses');
    if (storedExpenses) {
      return JSON.parse(storedExpenses);
    }
    return [];
  } catch (error) {
    console.error('Failed to load expenses from AsyncStorage', error);
    return [];
  }
};

// Create a Redux store
const store = createStore(expenseReducer);

// Initialize and load data asynchronously
loadExpenses().then((expenses) => {
  store.dispatch(initExpensesAction(expenses)); // Dispatch initialization action
});

// Exporting store and actions together
export default { store, initExpensesAction };
