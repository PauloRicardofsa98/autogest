"use client";

import { useState } from "react";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Employer } from "@prisma/client";
import { deleteEmployer } from "../_actions/delete-employer";
import { AlertDelete } from "@/app/_components/alert-delete";
import Link from "next/link";

interface EmployerRowActionProps {
  employer: Employer;
}

export function EmployerRowActions({ employer }: EmployerRowActionProps) {
  const toastPromise = usePromiseToast();
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteEmployerPromise = deleteEmployer(employer.uuid);
    toastPromise.promise(deleteEmployerPromise, "delete");
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="employere"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/employer/${employer.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
}
