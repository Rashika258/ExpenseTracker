import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer";

// LocalStorage is a web storage object to store the data on the user’s computer locally, which means the stored data is saved across browser sessions and the data stored has no expiration time.

// The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 500,
    category: "Salary",
    type: "Income",
    date: "2020-11-16",
    id: "44c68123-5b86-4cc8-b915-bb9e16cebe6a",
  },
  {
    amount: 225,
    category: "Investments",
    type: "Income",
    date: "2020-11-16",
    id: "33b295b8-a8cb-49f0-8f0d-bb268686de1a",
  },
  {
    amount: 50,
    category: "Salary",
    type: "Income",
    date: "2020-11-13",
    id: "270304a8-b11d-4e16-9341-33df641ede64",
  },
  {
    amount: 123,
    category: "Car",
    type: "Expense",
    date: "2020-11-16",
    id: "0f72e66e-e144-4a72-bbc1-c3c92018635e",
  },
  {
    amount: 50,
    category: "Pets",
    type: "Expense",
    date: "2020-11-13",
    id: "c5647dde-d857-463d-8b4e-1c866cc5f83e",
  },
  {
    amount: 500,
    category: "Travel",
    type: "Expense",
    date: "2020-11-13",
    id: "365a4ebd-9892-4471-ad55-36077e4121a9",
  },
  {
    amount: 50,
    category: "Investments",
    type: "Income",
    date: "2020-11-23",
    id: "80cf7e33-fc3e-4f9f-a2aa-ecf140711460",
  },
  {
    amount: 500,
    category: "Savings",
    type: "Income",
    date: "2020-11-23",
    id: "ef090181-21d1-4568-85c4-5646232085b2",
  },
  {
    amount: 5,
    category: "Savings",
    type: "Income",
    date: "2020-11-23",
    id: "037a35a3-40ec-4212-abe0-cc485a98aeee",
  },
];
// console.log("Initial State",initialState);

// Context allows passing data through the component tree without passing props down manually at every level.
export const ExpenseTrackerContext = createContext(initialState);

// There are two main steps to use the React context into the React application:

// Setup a context provider and define the data which you want to store.
// Use a context consumer whenever you need the data from the store

// children will be App
export const Provider = ({ children }) => {
  // this will create the children properties or state
  console.log(children);

  // Accepts a reducer of type (state, action) => newState, and returns the current state paired with a dispatch method.

  // useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.

  // to attach a function along with handling the state or when we want to handle the state based on the previous values.
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const balance = transactions.reduce(
    (acc, currVal) =>
      currVal.type === "Expense" ? acc - currVal.amount : acc + currVal.amount,
    0
  );

  return (
    <ExpenseTrackerContext.Provider
      value={{
        transactions,
        balance,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
