import AdminCreateInvite from "@/app/components/molecules/AdminCreateInvite";
import React from "react";

const CreateLink = () => {
  return (
    <main className="bg-amber-200 h-screen">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-295 border border-line px-6 py-10">
          <AdminCreateInvite />
        </div>
      </section>
    </main>
  );
};

export default CreateLink;
