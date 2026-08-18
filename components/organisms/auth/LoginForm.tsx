"use client";

import { useAuthStore } from "@/utils/store/zustand-hooks/useAuthStore";
import { LoginFormInitialValues } from "@/utils/types/auth";
import { loginFormSchema } from "@/utils/yup";
import { useFormik } from "formik";
import { useState } from "react";

type Props = {
  onAuthViewChange?: () => void;
};

const initialValues: LoginFormInitialValues = {
  password: "",
  username: "",
};

const LoginForm: React.FC<Props> = ({ onAuthViewChange }) => {
  const [remember, setRemember] = useState(true);

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginFormSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-110">
      <label className="mb-1.5 block font-mono text-[13px] text-dim">
        Username
      </label>
      <input
        id="username"
        type="text"
        {...formik.getFieldProps("username")}
        placeholder="you@example.com"
        className="mb-5 w-full border border-line bg-transparent px-4 py-3 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
      />
      <div>
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
      </div>

      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="font-mono text-[13px] text-dim">Password</label>
        <a
          href="#"
          className="font-mono text-xs text-dim underline decoration-line underline-offset-2 hover:text-cyan"
        >
          forgot access code
        </a>
      </div>
      <input
        type="password"
        {...formik.getFieldProps("password")}
        placeholder="••••••••"
        className="mb-5 w-full border border-line bg-transparent px-4 py-3 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
      />

      <div>
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>

      <label className="mb-7 flex items-center gap-2.5 font-mono text-[13px] text-dim">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="h-4 w-4 accent-cyan"
        />
        Keep me tuned in on this device
      </label>

      {status === "error" && (
        <p className="mb-5 border-l-2 border-magenta pl-3 font-mono text-[13px] text-magenta">
          Enter your email and password to continue.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full border cursor-pointer border-paper bg-paper px-4.5 py-3.25 font-mono text-[13px] text-ink transition-colors hover:bg-cyan hover:border-cyan disabled:opacity-60"
      >
        {loading ? "Tuning in…" : "Sign in"}
      </button>

      <div>{error ? <div>{error}</div> : null}</div>

      <p className="mt-6 font-mono text-xs text-dim">
        New to POPLOCK?{" "}
        <a
          // href="#"
          onClick={onAuthViewChange}
          className="text-paper underline decoration-line underline-offset-2 hover:text-cyan"
        >
          create an account
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
