'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddExpenses } from "@/services/api";
import { getCurrentUser } from "@/services/auth";
import { TExpensesProps } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Field from "./Field";

const categories = ["Transport", "Food", "Health", "Entertainment", "Shopping"];

const AddExpensesForm = () => {
  const { register, reset, handleSubmit, control, formState: { errors } } = useForm<TExpensesProps>();
  const [loading, setLoading] = useState(false);

  const submitForm = async (data: TExpensesProps) => {

    const currentUser = await getCurrentUser();
    const { userId } = currentUser
    console.log(userId)

    const formattedDate = data.date ? format(new Date(data.date as unknown as Date), "dd-MM-yyyy") : "";
    const finalData = { ...data, date: formattedDate };
    console.log(finalData);

    const expenseData = {
      title: data.title,
      amount: data.amount,
      category: data.category,
      date: formattedDate,
      userId: userId
    }

    try {
      setLoading(true);
      const result = await AddExpenses(expenseData);
      if (result?.success) {
        toast.success(result?.message);
        setLoading(false);
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add expense");
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div>

      <div className="border p-10 rounded-2xl items-center bg-gray-600 my-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white py-10 text-center ">Add Expenses</h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {/* Title */}
            <div className="w-full">
              <Field label="Title" required htmlFor="title" error={errors.title}>
                <Input
                  className="text-white placeholder:text-gray-400"
                  {...register("title", { required: "Title is required" })}
                  id="title"
                  type="text"
                  placeholder="Enter title"
                />
              </Field>
            </div>

            {/* Amount */}
            <div className="w-full">
              <Field label="Amount" required htmlFor="amount" error={errors.amount}>
                <Input
                  className="text-white"
                  {...register("amount", { required: "Amount is required" })}
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                />
              </Field>
            </div>

            {/* Date */}
            <div className="w-full">
              <Field label="Date" required htmlFor="date" error={errors.date}>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {field.value
                            ? format(new Date(field.value as unknown as Date), "dd-MM-yyyy")
                            : <span>Pick a date</span>
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value as unknown as Date) : undefined}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </Field>
            </div>

            {/* Category */}
            <div className="w-full text-white">
              <Field label="Category" required htmlFor="category" error={errors.category}>
                <Controller
                  name="category"

                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full ">
                        <SelectValue className="text-white" placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>

          </div>
          <div className="md:w-1/3 w-full mx-auto md:mt-16 mt-10">
            <Button className="w-full cursor-pointer" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Expenses"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddExpensesForm;
