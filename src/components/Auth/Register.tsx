'use client'

import { registerUser } from "@/services/auth";
import { TRegisterFormInputs } from "@/types";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Field from "../form/Field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Register = () => {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TRegisterFormInputs>();

  const [submitFormLoading, setSubmitFormLoading] = useState(false);

  // ! in from when the user upload the profile image and show the preview
  const [previewImage, setPreviewImage] = useState(
    "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
  );

  // ! here is loaded the image file for show image preview
  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ! this is the submit function for get all form data
  const submitForm = async (data: TRegisterFormInputs) => {

    const file = data?.profileImg?.[0];


    try {
      setSubmitFormLoading(true);
      if (!file) {
        alert("Please upload your profile image")
        return
      }

      const imageURL = await uploadImageToCloudinary(file);

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        profileImg: imageURL
      }

      const result = await registerUser(userData);
      console.log(result);

      if (result?.success) {
        router.push('/login');
        toast.success(result?.message);
        reset();

      }

    } catch (error) {
      console.log(error);

    } finally {
      setSubmitFormLoading(false);

    }

  };

  return (
    <div className="flex items-center justify-center mt-20 md:mt-0">


      <div className="relative my-10 w-full max-w-sm p-6 space-y-6 bg-black rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg dark:shadow-zinc-900/50">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">Register Now</h1>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="py-2">
            <Field label="Name" required htmlFor="name" error={errors.name}>
              <Input className="text-white"  {...register('name', { required: "Name is required" })} id="name" type="text" name="name" placeholder="Your Name" />
            </Field>
          </div>
          <div className="py-2">
            <Field label="Email" required htmlFor="email" error={errors.email}>
              <Input className="text-white" {...register('email', { required: "Email Address is required" })} id="email" type="email" name="email" placeholder="Your Email Address" />
            </Field>
          </div>
          <div className="py-2">
            <Field label="Password" required htmlFor="password" error={errors.password}>
              <Input className="text-white" {...register('password', { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" }, maxLength: { value: 32, message: "Password must be at most 32 characters" } })} id="password" type="password" name="password" placeholder="Your Password" />
            </Field>
          </div>
          <div >
            <div>
              <Image
                id="preview_img"
                className="h-16 w-16 object-cover border-2 p-1 rounded-md"
                src={previewImage}
                alt="Preview"
                width={64}
                height={64}
              />
            </div>
            <div className="py-2">
              <Field label="Profile Image" required htmlFor="profileImg" error={errors.profileImg}>
                <Input className="text-white placeholder:text-white"
                  {...register("profileImg", {
                    required: "Profile image is required",
                  })}
                  type="file"
                  accept="image/*"
                  onChange={loadFile}
                />
              </Field>
            </div>
          </div>
          <div className="w-full mt-6">
            <Button type="submit" variant={'secondary'} className="w-full cursor-pointer">
              {submitFormLoading ? <><Loader2Icon className="animate-spin" /> Loading</> : "Register"}
            </Button>
          </div>
        </form>
        <div className="text-center capitalize text-white mt-4">
          don&apos;t have an account? <Link href="/login" className="text-blue-500">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;