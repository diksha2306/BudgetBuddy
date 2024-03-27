import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/icons";
import Chart from "../Chart/Chart";
import History from "../History/History";

const Dashboard = () => {
  const {
    totalExpense,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
    incomes,
    expenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  let min_income = Math.min(...incomes.map((item) => item.amount));
  if (min_income === Infinity) {
    min_income = 0;
  }
  let max_income = Math.max(...incomes.map((item) => item.amount));
  if (max_income === -1 * Infinity) {
    max_income = 0;
  }
  let min_expense = Math.min(...expenses.map((item) => item.amount));
  if (min_expense === Infinity) {
    min_expense = 0;
  }
  let max_expense = Math.max(...expenses.map((item) => item.amount));
  if (max_expense === -1 * Infinity) {
    max_expense = 0;
  }
  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar}
                  {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expenses</h2>
                <p>
                  {dollar}
                  {totalExpense()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar}
                  {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span>Max
            </h2>
            <div className="salary-item">
              <p>{min_income}</p>
              <p>{max_income}</p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>{min_expense}</p>
              <p>{max_expense}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 300px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }
        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
          }
        }
      }
    }
    .history-con {
      grid-column: 4 / 6;
      h2 {
        margin: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 1.6rem;
          font-weight: 600;
        }
      }
    }
  }
`;
export default Dashboard;
