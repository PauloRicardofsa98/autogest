"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { createClient } from "../_actions/create-client";
import { updateClient } from "../_actions/update-client";
import { Client } from "@prisma/client";
import { ClientProps, clientSchema } from "../_actions/client-schema";
import { maskCpfCnpj, removeMask } from "@/app/_utils/helper";
import { InputField } from "@/app/_components/inputs/input-field";
import { InputCpfCnpj } from "@/app/_components/inputs/cpfCnpj";

interface FormProps {
  client: Client | null;
}

export const FormClient = ({ client }: FormProps) => {
  const router = useRouter();
  const toastPromise = usePromiseToast();

  const form = useForm<ClientProps>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      address: client?.address || "",
      cpfCnpj: client ? maskCpfCnpj(client.cpfCnpj) : "",
      email: client?.email || "",
      observations: client?.observations || "",
      phone: client?.phone || "",
    },
  });

  async function onSubmit(data: ClientProps) {
    const dataFormatted: ClientProps = {
      name: data.name,
      cpfCnpj: removeMask(data.cpfCnpj),
      phone: data.phone,
      email: data.email,
      address: data.address,
      observations: data.observations,
    };
    if (client) {
      const { uuid } = client;
      const update = updateClient(uuid, dataFormatted).then((response) => {
        if (typeof response !== "string") {
          router.push("/client");
          form.reset();
        }
        return response;
      });
      toastPromise.promise(update, "update");
    } else {
      const create = createClient(dataFormatted).then((response) => {
        if (typeof response !== "string") {
          router.push("/client");
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
        <div className="grid grid-cols-3 gap-4">
          <InputField control={form.control} description="Nome" name="name" />
          <InputCpfCnpj control={form.control} name="cpfCnpj" />
          <InputField
            control={form.control}
            description="Contato"
            name="phone"
            format="(##) #####-####"
          />
          <InputField
            control={form.control}
            description="Email"
            name="email"
            type="email"
          />
          <InputField
            control={form.control}
            description="Endereço completo"
            name="address"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex gap-2">
            {client ? (
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
