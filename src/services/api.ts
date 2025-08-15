/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import axiosInstance from '@/lib/AxiosInstance';
import { TExpensesProps } from '@/types';

export const AddExpenses = async (expensesData: TExpensesProps) => {
  try {
    const { data } = await axiosInstance.post(
      '/expenses/create-expense',
      expensesData
    );

    return data;
  } catch (error: any) {
    throw new Error('Failed to login user', error);
  }
};

export const updateExpenses = async (expensesData: TExpensesProps) => {
  try {
    const { data } = await axiosInstance.patch(
      `/expenses/${expensesData._id}`,
      expensesData
    );

    return data;
  } catch (error: any) {
    throw new Error('Failed to update expenses', error);
  }
};

export const getAllExpenses = async () => {
  try {
    const { data } = await axiosInstance.get('/expenses');
    return data;
  } catch (error: any) {
    throw new Error('Failed to login user', error);
  }
};

export const deleteExpenses = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/expenses/${id}`);
    return data;
  } catch (error: any) {
    throw new Error('Failed to delete expenses', error);
  }
};
