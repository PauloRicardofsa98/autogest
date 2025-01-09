"use client";

import { useEffect, useState } from "react";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { Employer, Prisma, ScheduleStatus } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { updateSchedule } from "../_actions/update-schedule";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/_components/ui/command";
import { cn } from "@/app/_lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { listEmployers } from "@/app/_data/employer";
import { toast } from "react-toastify";

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
  const [openCheckout, setOpenCheckout] = useState(false);
  const [open, setOpen] = useState(false);

  const [employers, setEmployers] = useState<Employer[]>([]);
  const [selectedEmployer, setSelectedEmployer] = useState<
    Employer | undefined
  >();

  useEffect(() => {
    setSelectedEmployer(undefined);
    const fetchEmployers = async () => {
      const employers = await listEmployers();
      setEmployers(employers);
    };
    fetchEmployers();
  }, [openCheckout]);

  async function handleUpdateScheduleStatus(status: ScheduleStatus) {
    const updateProductPromise = updateSchedule(schedule.uuid, {
      status,
    });
    toastPromise.promise(updateProductPromise, "update");
    setOpenCheckout(false);
  }
  async function handleCheckOutSchedule() {
    if (!selectedEmployer) {
      toast.error("Selecione o funcionário que realizou o serviço");
      return;
    }

    const updateProductPromise = updateSchedule(schedule.uuid, {
      status: "DONE",
      employer: {
        connect: {
          uuid: selectedEmployer.uuid,
        },
      },
    });
    toastPromise.promise(updateProductPromise, "update");
    setOpenCheckout(false);
  }

  const toggleCheckout = () => setOpenCheckout(!openCheckout);

  return (
    <>
      <AlertDialog open={openCheckout} onOpenChange={toggleCheckout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Selecione o funcionário que realizou o serviço
            </AlertDialogTitle>
          </AlertDialogHeader>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                {selectedEmployer
                  ? selectedEmployer.name
                  : "Selecione uma opção"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Procurar ..." />
                <CommandEmpty>Não encontrado.</CommandEmpty>
                <CommandGroup>
                  {employers.map((item) => (
                    <CommandItem
                      key={item.uuid}
                      value={item.name}
                      onSelect={() => {
                        setSelectedEmployer(item);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedEmployer?.uuid === item.uuid
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <AlertDialogFooter>
            <Button variant="secondary" onClick={toggleCheckout}>
              Voltar
            </Button>
            <Button onClick={handleCheckOutSchedule}>Continuar</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex items-center space-x-2">
        {schedule.status === "PENDING" && (
          <>
            <Button onClick={toggleCheckout}>Saida</Button>
            <Button
              variant={"destructive"}
              onClick={() => handleUpdateScheduleStatus("CANCELED")}
            >
              Cancelar
            </Button>
          </>
        )}
      </div>
    </>
  );
}
