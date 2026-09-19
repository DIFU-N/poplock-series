"use client";
import { useInviteStore } from "@/app/utils/store/zustand-hooks/useInviteStore";
import { AdminCreateInviteValues } from "@/app/utils/types/invite";
import { CreateInviteSchema } from "@/app/utils/yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const initialValues: AdminCreateInviteValues = {
  name: "",
};

const AdminCreateInvite = () => {
  const adminCreateInvite = useInviteStore((s) => s.adminCreateInvite);
  const loading = useInviteStore((s) => s.loading);
  const inviteLink = useInviteStore((s) => s.inviteLink);
  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateInviteSchema,
    onSubmit: async (values) => {
      await adminCreateInvite(values.name);
    },
  });
   const handleShare = async () => {
    if (!inviteLink) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join the ranking",
          text: "You've been invited 👀",
          url: inviteLink,
        });
      } else {
        await navigator.clipboard.writeText(inviteLink);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error(err);
    }

    router.push("/");
  };

  if (inviteLink) {
    return (
      <div className="flex flex-col gap-4 max-w-110">
        <div className="text-sm text-dim">Invite created</div>

        <div className="border border-line p-3 font-mono text-sm break-all">
          {inviteLink}
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(inviteLink)}
          className="border border-line px-4 py-2 text-sm hover:border-cyan"
        >
          Copy Link
        </button>

        <button
          onClick={handleShare}
          className="border bg-paper text-ink px-4 py-3 hover:bg-cyan"
        >
          Share & Continue
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-110">
      <label className="mb-1.5 block font-mono text-[13px] text-dim">
        First Name Only
      </label>
      <input
        id="username"
        type="text"
        {...formik.getFieldProps("name")}
        placeholder="invite someone that hasnt been invited before. and is a series head."
        className="mb-5 w-full border border-line bg-transparent px-4 py-3 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
      />
      <div>
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border cursor-pointer border-paper bg-paper px-4.5 py-3.25 font-mono text-[13px] text-ink transition-colors hover:bg-cyan hover:border-cyan disabled:opacity-60"
      >
        {loading ? "Tuning in…" : "Invite"}
      </button>
    </form>
  );
};

export default AdminCreateInvite;
