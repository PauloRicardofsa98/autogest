"use client";

import { useState } from "react";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Service } from "@prisma/client";
import { deleteService } from "../_actions/delete-service";
import { AlertDelete } from "@/app/_components/alert-delete";
import Link from "next/link";

interface ServiceRowActionProps {
  service: Service;
}

export function ServiceRowActions({ service }: ServiceRowActionProps) {
  const toastPromise = usePromiseToast();
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteServicePromise = deleteService(service.uuid);
    toastPromise.promise(deleteServicePromise, "delete");
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="servicee"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/service/${service.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
}
