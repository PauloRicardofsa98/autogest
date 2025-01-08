"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Brand, Client, Prisma, Service } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { useEffect, useState } from "react";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/_components/ui/form";
import { PlusIcon } from "lucide-react";
import { ScheduleProps, scheduleSchema } from "../_actions/schedule-schema";
import { createSchedule } from "../_actions/create-schedule";
import { InputField } from "@/app/_components/inputs/input-field";
import { ComboboxInput } from "@/app/_components/inputs/combobox-input";
import { getVehicle } from "@/app/_data/vehicle";
import { InputCheckbox } from "@/app/_components/inputs/input-checkbox";

type VehicleAll = Prisma.VehicleGetPayload<{
  include: {
    client: true;
  };
}>;

interface ManagerScheduleProps {
  clients: Client[];
  services: Service[];
}
const ManagerSchedule = ({ clients, services }: ManagerScheduleProps) => {
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState<VehicleAll | undefined>();
  const toastPromise = usePromiseToast();

  const form = useForm<ScheduleProps>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      brand: undefined,
      clientUuid: undefined,
      color: "",
      model: "",
      plate: "",
      year: undefined,
      register: false,
    },
  });

  useEffect(() => {
    form.reset();
  }, [form, open]);

  async function onSubmit(data: ScheduleProps) {
    const create = createSchedule(data).then((response) => {
      if (typeof response !== "string") {
        form.reset();
        setOpen(false);
      }
      return response;
    });
    toastPromise.promise(create, "create");
  }

  const handleBlurPlate = async () => {
    const vehicle = await getVehicle({
      where: {
        plate: form.getValues("plate"),
      },
      include: {
        client: true,
      },
    });

    if (vehicle) {
      setVehicle(vehicle);
      form.setValue("model", vehicle.model);
      form.setValue("brand", vehicle.brand);
      form.setValue("year", vehicle.year?.toString());
      form.setValue("color", vehicle.color || "");
      form.setValue("clientUuid", vehicle.clientUuid || "");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Novo Agendamento</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicione um agendamento</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <InputField
                control={form.control}
                name="plate"
                description="Placa"
                onBlur={handleBlurPlate}
              />
              <InputField
                control={form.control}
                description="Modelo"
                name="model"
              />
              <ComboboxInput
                control={form.control}
                description="Marca"
                name="brand"
                form={form}
                options={Object.values(Brand).map((brand) => ({
                  uuid: brand,
                  name: brand,
                }))}
              />
              <InputField
                control={form.control}
                description="Ano"
                name="year"
                type="number"
              />
              <InputField
                control={form.control}
                description="Cor"
                name="color"
              />
              <ComboboxInput
                control={form.control}
                description="Serviço"
                name="serviceUuid"
                form={form}
                options={services.map((services) => ({
                  uuid: services.uuid,
                  name: services.name,
                }))}
              />
              <ComboboxInput
                control={form.control}
                description="Cliente"
                name="clientUuid"
                form={form}
                options={clients.map((client) => ({
                  uuid: client.uuid,
                  name: client.name,
                }))}
              />
              <InputCheckbox
                control={form.control}
                name="register"
                description="Registrar veículo"
                disabled={vehicle !== undefined}
              />
            </div>

            <div className="flex w-full items-center justify-end gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex gap-2">
                <PlusIcon />
                Adicionar
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ManagerSchedule;
