import { useAuthStore } from "@/utils/store/zustand-hooks/useAuthStore";
import React, { useState } from "react";
import { SignUpFormInitialValues } from "@/utils/types/formik";
import { useFormik } from "formik";
import { signUpFormSchema } from "@/utils/yup";

type Props = {
  onAuthViewChange?: () => void;
};

const initialValues: SignUpFormInitialValues = {
  email: "",
  password: "",
  username: "",
};

const SignUpForm: React.FC<Props> = ({ onAuthViewChange }) => {
  const [remember, setRemember] = useState(true);

  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpFormSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  return (
    <form className="max-w-110" onSubmit={formik.handleSubmit}>
      <label className="mb-1.5 block font-mono text-[13px] text-dim">
        Email
      </label>
      <input
        id="email"
        type="text"
        {...formik.getFieldProps("email")}
        placeholder="you@example.com"
        className="mb-5 w-full border border-line bg-transparent px-4 py-3 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
      />
      <div>
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
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
        id="password"
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
        {loading ? "Tuning in…" : "Register"}
      </button>

      <div className="text-red-500 text-xs">{error ? error : ""}</div>

      <p className="mt-6 font-mono text-xs text-dim">
        Have an account?{" "}
        <a
          // href="#"
          onClick={onAuthViewChange}
          className="text-paper underline decoration-line underline-offset-2 hover:text-cyan"
        >
          Login
        </a>
      </p>
    </form>
  );
};

export default SignUpForm;
