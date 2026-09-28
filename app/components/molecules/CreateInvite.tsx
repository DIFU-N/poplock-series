"use client";
import { useInviteStore } from "@/app/utils/store/zustand-hooks/useInviteStore";
import { AdminCreateInviteValues } from "@/app/utils/types/invite";
import { CreateInviteSchema } from "@/app/utils/yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialValues: AdminCreateInviteValues = {
  name: "",
};

export default function CreateInvite({ token }: { token: string }) {
  const createInvite = useInviteStore((s) => s.createInvite);
  const loading = useInviteStore((s) => s.loading);
  const inviteLink = useInviteStore((s) => s.inviteLink);
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateInviteSchema,
    onSubmit: async (values) => {
      await createInvite({ name: values.name, token });
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

  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  if (inviteLink) {
    return (
      <div className="flex flex-col gap-4 max-w-110">
        <div className="text-sm text-dim">Invite created</div>

        <div className="border border-line p-3 font-mono text-sm break-all rounded-lg">
          {inviteLink}
        </div>

        <div className="flex justify-between">
        <button
          onClick={handleCopy}
          className={`border px-4 w-[40%] py-2 text-sm rounded-sm transition-colors cursor-pointer ${
            copied ? "bg-green-300" : " hover:bg-fuchsia-300"
          }`}
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>

        <button
          onClick={handleShare}
          className="border w-[40%] px-4 py-3 rounded-sm hover:bg-fuchsia-300 cursor-pointer"
        >
          Share & Continue
        </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-110 flex flex-col gap-2"
    >
      <label className="mb-1.5 block font-mono text-sm ">
        Invite a name that hasn’t been used yet, a real name, a real person. One
        name, one claim.
      </label>
      <p className="text-xs font-bold">
        Choose wisely, keep it fun, and don’t waste it on non-ball knowers.
      </p>
      <div>
        <input
          id="username"
          type="text"
          {...formik.getFieldProps("name")}
          placeholder="First Name Only."
          className="w-full border border-line bg-transparent px-4 py-3 font-mono text-sm outline-none focus:border-"
        />
        <div className="text-red-400 text-xs">
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border cursor-pointer border-paper bg-paper px-4.5 py-3.25 font-mono text-[13px] text-ink transition-colors hover:bg-fuchsia-400 disabled:opacity-60"
      >
        {loading ? "Tuning in…" : "Invite"}
      </button>
    </form>
  );
}
