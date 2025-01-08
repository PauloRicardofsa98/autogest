"use client";

import { useState } from "react";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { Prisma } from "@prisma/client";
import { AlertDelete } from "@/app/_components/alert-delete";
import { deleteSchedule } from "../_actions/delete-schedule";
import { Button } from "@/app/_components/ui/button";

type ScheduleAll = Prisma.ScheduleGetPayload<{
  include: {
    client: true;
    vehicle: true;
    service: true;
  };
}>;

interface ScheduleRowActionProps {
  schedule: ScheduleAll;
}

export function ScheduleRowActions({ schedule }: ScheduleRowActionProps) {
  const toastPromise = usePromiseToast();
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteProductPromise = deleteSchedule(schedule.uuid);
    toastPromise.promise(deleteProductPromise, "delete");
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="Fornecedor do produto"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Button>Saida</Button>
        <Button variant={"destructive"}>Cancelar</Button>
      </div>
    </>
  );
}
