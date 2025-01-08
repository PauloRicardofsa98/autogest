"use client";

import { useState } from "react";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Vehicle } from "@prisma/client";
import { deleteVehicle } from "../_actions/delete-vehicle";
import { AlertDelete } from "@/app/_components/alert-delete";
import Link from "next/link";

interface VehicleRowActionProps {
  vehicle: Vehicle;
}

export function VehicleRowActions({ vehicle }: VehicleRowActionProps) {
  const toastPromise = usePromiseToast();
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteVehiclePromise = deleteVehicle(vehicle.uuid);
    toastPromise.promise(deleteVehiclePromise, "delete");
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="veiculo"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/vehicle/${vehicle.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
}
