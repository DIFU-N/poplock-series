import NewListForm from "@/components/molecules/NewListForm";
import { Suspense } from "react";

export default function NewListPage() {
  return (
    <Suspense fallback={null}>
      <NewListForm />
    </Suspense>
  );
}
