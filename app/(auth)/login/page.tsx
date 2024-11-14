"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button, Checkbox, Field, Input, Label } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Password confirmation is required"),
    name: yup.string().required("Name is required"),
  })
  .required();

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { signUp } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  useEffect(() => {
    if (errors.email) {
      setFocus("email");
    } else if (errors.password) {
      setFocus("password");
    }
  }, [errors, setFocus]);

  const onSubmit = (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    // Call the signUp function (register mutation) and handle errors as needed
    signUp({
      ...data,
      setErrors: (errorMessages) => {
        // Handle setting errors in the form (e.g., show messages to the user)
        console.error(errorMessages); // Replace with actual error handling
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-purple-700">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Not a member?{" "}
              <Link
                href="/register"
                className="font-semibold text-purple-600 hover:text-purple-500"
              >
                Sign up here &rarr;
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <Field>
                <Label className="block text-sm font-medium text-gray-700">
                  Name
                </Label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <Input as={Fragment}>
                    {({ focus }) => (
                      <input
                        type="text"
                        {...register("name")}
                        autoComplete="name"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        className={clsx(
                          "block w-full rounded-md py-1.5 pr-10 sm:text-sm",
                          errors.name
                            ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
                            : "border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500",
                          focus &&
                            !errors.name &&
                            "focus:ring-2 focus:ring-inset focus:ring-purple-500"
                        )}
                      />
                    )}
                  </Input>
                  {errors.name && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <FaExclamationCircle
                        aria-hidden="true"
                        className="h-5 w-5 text-red-500"
                      />
                    </div>
                  )}
                </div>
                {errors.name && (
                  <p id="email-error" className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </Field>

              {/* Email Field */}
              <Field>
                <Label className="block text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <Input as={Fragment}>
                    {({ focus }) => (
                      <input
                        type="email"
                        {...register("email")}
                        autoComplete="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className={clsx(
                          "block w-full rounded-md py-1.5 pr-10 sm:text-sm",
                          errors.email
                            ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
                            : "border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500",
                          focus &&
                            !errors.email &&
                            "focus:ring-2 focus:ring-inset focus:ring-purple-500"
                        )}
                      />
                    )}
                  </Input>
                  {errors.email && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <FaExclamationCircle
                        aria-hidden="true"
                        className="h-5 w-5 text-red-500"
                      />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              {/* Password Field */}
              <Field>
                <Label className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <Input as={Fragment}>
                    {({ focus }) => (
                      <input
                        type="password"
                        autoComplete="current-password"
                        {...register("password")}
                        aria-invalid={errors.password ? "true" : "false"}
                        aria-describedby={
                          errors.password ? "password-error" : undefined
                        }
                        className={clsx(
                          "block w-full rounded-md py-1.5 pr-10 sm:text-sm",
                          errors.password
                            ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
                            : "border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500",
                          focus &&
                            !errors.password &&
                            "focus:ring-2 focus:ring-inset focus:ring-purple-500"
                        )}
                      />
                    )}
                  </Input>
                  {errors.password && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <FaExclamationCircle
                        aria-hidden="true"
                        className="h-5 w-5 text-red-500"
                      />
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <Label className="block text-sm font-medium text-gray-700">
                  Password confirmation
                </Label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <Input as={Fragment}>
                    {({ focus }) => (
                      <input
                        type="password"
                        autoComplete="current-password"
                        {...register("password_confirmation")}
                        aria-invalid={
                          errors.password_confirmation ? "true" : "false"
                        }
                        aria-describedby={
                          errors.password_confirmation
                            ? "password_confirmation-error"
                            : undefined
                        }
                        className={clsx(
                          "block w-full rounded-md py-1.5 pr-10 sm:text-sm",
                          errors.password_confirmation
                            ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
                            : "border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500",
                          focus &&
                            !errors.password_confirmation &&
                            "focus:ring-2 focus:ring-inset focus:ring-purple-500"
                        )}
                      />
                    )}
                  </Input>
                  {errors.password_confirmation && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <FaExclamationCircle
                        aria-hidden="true"
                        className="h-5 w-5 text-red-500"
                      />
                    </div>
                  )}
                </div>
                {errors.password_confirmation && (
                  <p id="password-error" className="mt-2 text-sm text-red-600">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </Field>

              <div className="flex items-center justify-between">
                <Field className="flex items-center">
                  <Checkbox as={Fragment}>
                    {({ checked, disabled }) => (
                      <span
                        className={clsx(
                          "block size-4 rounded border",
                          !checked && "bg-white",
                          checked && !disabled && "bg-blue-500",
                          checked && disabled && "bg-gray-500",
                          disabled && "cursor-not-allowed opacity-50"
                        )}
                      >
                        <svg
                          className={clsx(
                            "stroke-white",
                            checked ? "opacity-100" : "opacity-0"
                          )}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </Checkbox>
                  <Label className="ml-2 text-sm text-gray-600">
                    Remember me
                  </Label>
                </Field>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-purple-600 hover:text-purple-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
