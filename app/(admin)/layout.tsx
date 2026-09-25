"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../utils/store/zustand-hooks/useAuthStore";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  // const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (user?.role !== "s.admin") {
      return router.push("/");
    }
  }, [router, user, hasHydrated]);
  return <div className="w-full max-w-full overflow-x-hidden">{children}</div>;
}
