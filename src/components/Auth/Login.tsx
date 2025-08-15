/* eslint-disable react/no-unescaped-entities */
'use client'
import { loginUser } from "@/services/auth";
import { LoginFormInputs } from "@/types";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Field from "../form/Field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setLoading(true);
      const userData = {
        email: data.email,
        password: data.password
      }
      console.log(userData);
      const result = await loginUser(userData);
      if (result?.success) {
        router.push('/expenses');
        toast.success(result?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div className=" h-[calc(100vh-56px)] relative w-full flex items-center justify-center font-sans overflow-hidden">

      <div className="relative w-full max-w-sm p-6 space-y-6 bg-black rounded-lg border border-zinc-320 dark:border-zinc-800 shadow-lg dark:shadow-zinc-900/50">
        <h1 className="my-2 text-2xl font-bold text-white">Login</h1>
        <p className="mb-4 capitalize text-white">Welcome Back! Let's get started</p>
        <form onSubmit={handleSubmit(onSubmit)} className="shadow-xl space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Field label="Email" required error={errors.email} htmlFor="email">
              <Input className="text-white" {...register('email', { required: "Email is required" })} id="email" type="email" name="email" placeholder="Your Email Address" />
            </Field>
          </div>
          {/* Password */}
          <div className="space-y-2">
            <Field label="Password" required error={errors.password} htmlFor="password">
              <Input className="text-white" {...register('password', { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" }, maxLength: { value: 32, message: "Password must be at most 32 characters" } })} id="password" type="password" name="password" placeholder="Your Password" />
            </Field>
          </div>
          <div className="w-full mt-6">
            <Button className="w-full cursor-pointer" variant={'secondary'} type="submit">
              {loading ? <><Loader2Icon className="animate-spin" /> Loading</> : "Login"}
            </Button>
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