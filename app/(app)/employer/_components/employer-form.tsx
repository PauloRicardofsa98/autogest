"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { createEmployer } from "../_actions/create-employer";
import { updateEmployer } from "../_actions/update-employer";
import { Employer, Prisma } from "@prisma/client";
import { EmployerProps, employerSchema } from "../_actions/employer-schema";
import { InputField } from "@/app/_components/inputs/input-field";
import { maskCpfCnpj, removeMask } from "@/app/_utils/helper";
import { InputCpfCnpj } from "@/app/_components/inputs/cpfCnpj";

interface FormProps {
  employer?: Employer;
}

export const FormEmployer = ({ employer }: FormProps) => {
  const router = useRouter();
  const toastPromise = usePromiseToast();

  const form = useForm<EmployerProps>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      name: employer?.name || "",
      address: employer?.address || "",
      cpf: employer ? maskCpfCnpj(employer.cpf) : "",
      phone: employer?.phone || "",
      email: employer?.email || "",
    },
  });

  async function onSubmit(data: EmployerProps) {
    const dataFormatted: Prisma.EmployerCreateInput = {
      name: data.name,
      cpf: removeMask(data.cpf),
      address: data.address,
      phone: data.phone,
      email: data.email,
    };

    if (employer) {
      const { uuid } = employer;
      const update = updateEmployer(uuid, dataFormatted).then((response) => {
        if (typeof response !== "string") {
          router.push("/employer");
          form.reset();
        }
        return response;
      });
      toastPromise.promise(update, "update");
    } else {
      const create = createEmployer(dataFormatted).then((response) => {
        if (typeof response !== "string") {
          router.push("/employer");
          form.reset();
        }
        return response;
      });
      toastPromise.promise(create, "create");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <InputField control={form.control} name="name" description="Nome" />
          <InputCpfCnpj control={form.control} name="cpf" />
          <InputField
            control={form.control}
            description="Email"
            name="email"
            type="email"
          />
          <InputField
            control={form.control}
            description="Contato"
            name="phone"
            format="(##) #####-####"
          />
          <InputField
            control={form.control}
            description="Endereço"
            name="address"
            className="col-span-4"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => router.back()}
          >
            Cancelar/Voltar
          </Button>
          <Button type="submit" className="flex gap-2">
            {employer ? (
              <>
                <Upload />
                Atualizar
              </>
            ) : (
              <>
                <Plus />
                Adicionar
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
