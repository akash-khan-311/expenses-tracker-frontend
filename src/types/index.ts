export type TRegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  profileImg: string;
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type TExpensesProps = {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  userId: string;
};
