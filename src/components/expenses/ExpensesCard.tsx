/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { deleteExpenses } from "@/services/api";
import { TExpensesProps } from "@/types";
import { useState } from "react";
import EditExpenseForm from "../form/EditExpenseForm";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";



interface Props {
  expense: TExpensesProps;
  onUpdate: ({ expense, onUpdate }: Props) => void;
  onDelete: ({ expense, onUpdate }: Props) => void;
}

const ExpensesCard = ({
  expense,
  onUpdate,
  onDelete
}: {
  expense: TExpensesProps;
  onUpdate: (id: string, data: any) => void;
  onDelete: (id: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteExpenses(expense._id as string);
      console.log(result)
      onDelete(expense._id as string); // parent state update
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
      {/* Category & Date */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-cyan-400">{expense.category}</span>
        <span className="text-xs text-gray-400">{expense.date}</span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-2">{expense.title}</h2>

      {/* Amount */}
      <p className="text-white font-bold text-lg mb-2">${expense.amount}</p>

      {/* Actions */}
      <div className="flex justify-between items-center mt-7">
        <Button onClick={handleDelete} variant={'destructive'} className="cursor-pointer">{loading ? 'Deleting...' : 'Delete'}</Button>

        {/* Edit Button with Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={'secondary'} className="cursor-pointer">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg bg-gray-800">
            <DialogHeader>
              <DialogTitle>Edit Expense</DialogTitle>
            </DialogHeader>

            <EditExpenseForm expense={expense} onUpdate={(id, data) => {
              onUpdate(id, data);
              setOpen(false);
            }} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ExpensesCard;