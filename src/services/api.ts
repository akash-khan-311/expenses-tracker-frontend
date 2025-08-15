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
