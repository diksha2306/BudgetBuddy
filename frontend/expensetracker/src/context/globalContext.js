import { createContext, useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //  INCOME RELATED

  const addIncome = async (income, getState) => {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    const userInfo = userInfoFromStorage;
    // console.log(userInfo);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios
      .post(`${BASE_URL}add-income`, income, config)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async (income, getState) => {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    const userInfo = userInfoFromStorage;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios
      .get(`${BASE_URL}get-incomes`, config)
      .catch((err) => console.log(error));
    console.log("get inc");
    console.log(response);
    if (response) setIncomes(response.data);
    // console.log(response.data);
  };

  const deleteIncome = async (id, getState) => {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    const userInfo = userInfoFromStorage;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.delete(`${BASE_URL}delete-income/${id}`, config);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });
    return totalIncome;
  };

  //  EXPENSE RELATED

  const addExpense = async (income) => {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    const userInfo = userInfoFromStorage;
    // console.log(userInfo);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios
      .post(`${BASE_URL}add-expense`, income, config)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async (income) => {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    const userInfo = userInfoFromStorage;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios
      .get(`${BASE_URL}get-expenses`, config)
      .catch((err) => console.log(error));
    if (response) setExpenses(response.data);
    // console.log(response.data);
  };

  const deleteExpense = async (id) => {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    const userInfo = userInfoFromStorage;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`, config);
    getExpenses();
  };

  const totalExpense = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome += income.amount;
    });
    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpense,
        expenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
