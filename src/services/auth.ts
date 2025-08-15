/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import axiosInstance from '@/lib/AxiosInstance';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/users/create-user', userData);
    if (data.success) {
      (await cookies()).set('accessToken', data?.data?.accessToken);
      (await cookies()).set('refreshToken', data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error('Failed to register user', error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', userData);
    if (data.success) {
      (await cookies()).set('accessToken', data?.data?.accessToken);
      (await cookies()).set('refreshToken', data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error('Failed to login user', error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get('accessToken')?.value;

  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return decodedToken;
  }
};
