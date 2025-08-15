'use client'
import { updateExpenses } from "@/services/api";
import { getCurrentUser } from "@/services/auth";
import { TExpensesProps } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Field from "./Field";
const categories = ["Transport", "Food", "Health", "Entertainment", "Shopping"];
/* eslint-disable @typescript-eslint/no-explicit-any */
const EditExpenseForm = ({
  expense,
  onUpdate
}: {
  expense: TExpensesProps;
  onUpdate: (id: string, data: any) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      title: expense.title,
      amount: expense.amount,
      date: expense.date ? new Date(expense.date) : undefined,
      category: expense.category,
    }
  });
  const submitForm = async (data: any) => {
    // Safe date formatting
    const formattedDate =
      data.date instanceof Date && !isNaN(data.date.getTime())
        ? format(data.date, "dd-MM-yyyy")
        : "";
    const finalData = { ...data, date: formattedDate };
    setLoading(true);

    try {
      const currentUser = await getCurrentUser();
      const { userId } = currentUser
      const expensesData = {
        _id: expense._id,
        title: finalData.title,
        amount: finalData.amount,
        category: finalData.category,
        date: finalData.date,
        userId,
      }
      console.log(expensesData)
      const result = await updateExpenses(expensesData);
      if (result?.success) {
        toast.success(result?.message);
        setLoading(false);
        onUpdate(expense._id as string, expensesData);
      }

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }


  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <Field label="Title" required htmlFor="title">
        <Input
          className="text-white text-xl"
          {...register("title", { required: "Title is required" })}
          id="title"
        />
      </Field>

      <Field label="Amount" required htmlFor="amount">
        <Input
          className="text-white text-xl"
          {...register("amount", { required: "Amount is required" })}
          type="number"
          id="amount"
        />
      </Field>

      <Field label="Date" required htmlFor="date" error={errors.date}>
        <Controller
          control={control}
          rules={{
            required: "Date is required",
            validate: value => value instanceof Date && !isNaN(value.getTime()) || "Date is required"
          }}
          name="date"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-transparent text-white"
                >
                  {field.value instanceof Date && !isNaN(field.value.getTime())
                    ? format(field.value, "dd-MM-yyyy")
                    : "Pick a date"
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value instanceof Date ? field.value : undefined}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </Field>

      <Field label="Category" required htmlFor="category">
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full p-2 rounded border bg-gray-700 text-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </Field>

      <DialogFooter>
        <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default EditExpenseForm;