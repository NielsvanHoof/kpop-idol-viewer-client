import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// Define types for each mutation's input
interface AuthProps {
  middleware?: "guest" | "auth";
  redirectIfAuthenticated?: string;
}

interface SignUpMutation {
  setErrors: (errors: string[]) => void;
  [key: string]: unknown;
}

interface LoginProps {
  setErrors: (errors: string[]) => void;
  setStatus: (status: string | null) => void;
  [key: string]: unknown;
}

interface ForgotPasswordProps {
  setErrors: (errors: string[]) => void;
  setStatus: (status: string | null) => void;
  email: string;
}

interface ResetPasswordProps {
  setErrors: (errors: string[]) => void;
  setStatus: (status: string | null) => void;
  [key: string]: unknown;
}

interface ResendEmailVerificationProps {
  setStatus: (status: string) => void;
}

interface User {
  email_verified_at?: string;
  // add other user fields as needed
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthProps) => {
  const router = useRouter();
  const params = useParams() as { token: string }; // specify token type
  const queryClient = useQueryClient();

  const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

  const fetchUser = async (): Promise<User> => {
    const response = await fetch(`${baseURL}/api/user`, {
      credentials: "include",
    });
    if (!response.ok) {
      if (response.status === 409) {
        router.push(`/verify-email`);
      }
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  };

  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const csrf = async () => {
    await fetch(`${baseURL}/sanctum/csrf-cookie`, {
      credentials: "include",
    });
  };

  const { data: user, error }: UseQueryResult<User, Error> = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
  });

  const signUpMutation: UseMutationResult<unknown, Error, SignUpMutation> =
    useMutation({
      mutationKey: ["signUp"],
      mutationFn: async ({ setErrors, ...restProps }: SignUpMutation) => {
        await csrf();
        setErrors([]);

        const csrfToken = getCookie("XSRF-TOKEN");

        const response = await fetch(`${baseURL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken || "",
          },
          credentials: "include",
          body: JSON.stringify(restProps),
        });

        if (!response.ok) {
          if (response.status === 422) {
            const data = await response.json();
            setErrors(data.errors);
          }
          throw new Error("Registration failed");
        }
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/login");
      },
    });

  const loginMutation: UseMutationResult<unknown, Error, LoginProps> =
    useMutation({
      mutationKey: ["login"],
      mutationFn: async ({
        setErrors,
        setStatus,
        ...restProps
      }: LoginProps) => {
        await csrf();
        setErrors([]);
        setStatus(null);

        const response = await fetch(`${baseURL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(restProps),
        });

        if (!response.ok) {
          if (response.status === 422) {
            const data = await response.json();
            setErrors(data.errors);
          }
          throw new Error("Login failed");
        }
        return response.json();
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    });

  const forgotPasswordMutation = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: async ({
      setErrors,
      setStatus,
      email,
    }: ForgotPasswordProps) => {
      await csrf();
      setErrors([]);
      setStatus(null);

      const response = await fetch(`${baseURL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const data = await response.json();
          setErrors(data.errors);
        }
        throw new Error("Forgot password request failed");
      }
      const data = await response.json();
      setStatus(data.status);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async ({
      setErrors,
      setStatus,
      ...restProps
    }: ResetPasswordProps) => {
      await csrf();
      setErrors([]);
      setStatus(null);

      const response = await fetch(`${baseURL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: params.token, ...restProps }),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const data = await response.json();
          setErrors(data.errors);
        }
        throw new Error("Reset password request failed");
      }
      const data = await response.json();
      router.push("/login?reset=" + btoa(data.status));
    },
  });

  const resendEmailVerificationMutation = useMutation({
    mutationKey: ["resendEmailVerification"],
    mutationFn: async ({ setStatus }: ResendEmailVerificationProps) => {
      const response = await fetch(
        `${baseURL}/email/verification-notification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      setStatus(data.status);
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await fetch(`${baseURL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/login");
    },
  });

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }

    if (middleware === "auth" && !user?.email_verified_at) {
      router.push("/verify-email");
    }

    if (
      window.location.pathname === "/verify-email" &&
      user?.email_verified_at
    ) {
      router.push(redirectIfAuthenticated || "/");
    }

    if (middleware === "auth" && error) {
      logoutMutation.mutate();
    }
  }, [
    user,
    error,
    middleware,
    redirectIfAuthenticated,
    router,
    logoutMutation,
  ]);

  return {
    user,
    signUp: signUpMutation.mutate,
    login: loginMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    resendEmailVerification: resendEmailVerificationMutation.mutate,
    logout: logoutMutation.mutate,
  };
};
