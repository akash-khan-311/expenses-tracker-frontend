/* eslint-disable react/no-unescaped-entities */
'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Field from "../form/Field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);
  };
  return (
    <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center">
      <h1 className="my-2 text-2xl font-bold text-white">Login</h1>
      <p className="mb-4 capitalize text-white">Welcome Back! Let's get started</p>
      <div className="md:w-[35%] w-full px-3">
        <form onSubmit={handleSubmit(onSubmit)} className="shadow-xl">
          {/* Email */}
          <div>
            <Field label="Email" required error={errors.email} htmlFor="email">
              <Input {...register('email', { required: "Email is required" })} id="email" type="email" name="email" placeholder="Your Email Address" />
            </Field>
          </div>
          {/* Password */}
          <div>
            <Field label="Password" required error={errors.password} htmlFor="password">
              <Input className="text-white" {...register('password', { required: "Password is required" })} id="password" type="password" name="password" placeholder="Your Password" />
            </Field>
          </div>
          <div className="w-full mt-6">
            <Button className="w-full cursor-pointer" variant={'secondary'} type="submit">Login</Button>
          </div>
        </form>
        <div className="text-center capitalize text-white mt-4">
          don&apos;t have an account? <Link href="/register" className="text-blue-500">register now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;