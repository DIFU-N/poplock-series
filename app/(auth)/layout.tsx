"use client";
import { ReactNode, Suspense, useEffect } from "react";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/utils/store/zustand-hooks/useAuthStore";

function AuthLayoutClient({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (token) {
      router.push(redirectUrl);
      // console.log('asdsa');
    }
  }, [redirectUrl, router, token]);

  return children;
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AuthLayoutClient>{children}</AuthLayoutClient>
    </Suspense>
  );
}
