import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { Id, toast } from "react-toastify";

type MessageType = "create" | "update" | "delete" | "generic";

const usePromiseToast = () => {
  const toastId = useRef<Id | null>(null);

  const pendingMessage = (type: MessageType) => {
    switch (type) {
      case "create":
        return "Criando";
      case "update":
        return "Atualizando";
      case "delete":
        return "Excluindo";
      case "generic":
        return "Aguarde";
    }
  };
  const successMessage = (type: MessageType) => {
    switch (type) {
      case "create":
        return "Criado com sucesso";
      case "update":
        return "Atualizado com sucesso";
      case "delete":
        return "Excluído com sucesso";
      case "generic":
        return "Sucesso";
    }
  };

  const pending = (type: MessageType) => {
    const message = pendingMessage(type);
    toastId.current = toast(
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="animate-spin" /> {message}
      </div>,
      {
        autoClose: false,
      },
    );
  };
  const success = (type: MessageType) => {
    const message = successMessage(type);
    if (toastId.current) {
      toast.update(toastId.current, {
        render: message,
        autoClose: 5000,
        type: "success",
      });
    }
  };
  const error = (message: string) => {
    if (toastId.current) {
      toast.update(toastId.current, {
        render: message,
        autoClose: 5000,
        type: "error",
      });
    }
  };

  const toastPromise = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    promise: async (promiseFn: Promise<any>, type: MessageType) => {
      pending(type);
      try {
        const response = await promiseFn;
        if (!response) {
          error("Erro ao executar essa tarefa");
          return;
        }
        if (typeof response === "string") {
          error(response);
          return;
        }
        success(type);
      } catch {
        error("Erro ao executar essa tarefa");
      }
    },
  };

  return toastPromise;
};

export default usePromiseToast;
