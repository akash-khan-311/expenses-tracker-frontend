import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative z-10 text-center py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Easily Manage, Track, and Optimize Your {" "}
            <span className="text-orange-500">Daily Expenses</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            A simple, secure, and powerful platform to see exactly where your money goes, so you can take control of your budget and future.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/expenses">
              <Button variant={"secondary"} className="w-full sm:w-auto cursor-pointer">
                Add your First Expenses
              </Button></Link>

          </div>
        </div>
      </section>
    </>
  );
}
