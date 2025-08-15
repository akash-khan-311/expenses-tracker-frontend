/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';


import { getAllExpenses } from "@/services/api";
import { TExpensesProps } from "@/types";
import { useEffect, useState } from "react";
import AddExpensesForm from "../form/AddExpensesForm";
import ExpensesCard from "./ExpensesCard";
const ExpensesList = () => {
  const [expenses, setExpenses] = useState<TExpensesProps[]>([]);

  const fetchExpenses = async () => {
    try {
      const data = await getAllExpenses();
      setExpenses(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id: string, updatedData: TExpensesProps) => {
    setExpenses(prev =>
      prev.map(exp => (exp._id === id ? { ...exp, ...updatedData } : exp))
    );
  };

  const handleDelete = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp._id !== id));
  };


  const handleAddExpense = (newExpense: any) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };


  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <AddExpensesForm onAddExpense={handleAddExpense} />
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <h1 className="text-3xl font-semibold mb-6">Expenses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {expenses.map((expense) => (
            <ExpensesCard
              key={expense._id}
              expense={expense}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>

  );
};

export default ExpensesList;