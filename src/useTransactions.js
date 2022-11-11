import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/context";

import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/categories";

const useTransactions = (title) => {
  // sets the income and expense to zero for every categories
  resetCategories();

  // Accepts a context object (the value returned from React.createContext) and returns the current context value for that context. The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree.
  const { transactions } = useContext(ExpenseTrackerContext);
  // console.log(transactions);

  // Output
  // amount: 500
  // category: "Salary"
  // date: "2020-11-16"
  // id: "44c68123-5b86-4cc8-b915-bb9e16cebe6a"
  // type: "Income"

  // t.type will be either income or expense
  const rightTransactions = transactions.filter((t) => t.type === title);

  // acc will be the previous value that will be added to curr value
  // if no previous value is specified for the first time the previous value will be zero
  const total = rightTransactions.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );

  // if title is income the categories will be set to income array else expense array
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  // console.log("Categores" ,categories);

  rightTransactions.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);

    // console.log("Category Selected",category);

    // amount: 0
    // color: "#0bc77e"
    // type: "Salary"
    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter((sc) => sc.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };

  return { filteredCategories, total, chartData };
};

export default useTransactions;
