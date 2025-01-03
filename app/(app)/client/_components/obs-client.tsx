import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { Client } from "@prisma/client";
import { MessageCircleMoreIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { updateClient } from "../_actions/update-client";

interface ObsClientProps {
  client: Client;
}

const ObsClient = ({ client }: ObsClientProps) => {
  const toastPromise = usePromiseToast();
  const [open, setOpen] = useState(false);
  const [observations, setObservation] = useState(client.observations);

  useEffect(() => {
    setObservation(client.observations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function onSubmit() {
    const update = updateClient(client.uuid, {
      observations: observations,
    }).then((response) => {
      if (typeof response !== "string") {
        setOpen(false);
      }
      return response;
    });
    toastPromise.promise(update, "update");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={() => setOpen(true)}>
              <MessageCircleMoreIcon
                onClick={() => setOpen(true)}
                className={`${client.observations ? "text-primary" : "text-primary/30"} `}
              />
            </TooltipTrigger>
            <TooltipContent className="gap-4 text-base">
              {client.observations}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicione/edite uma observação</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Digite uma observação"
          className="max-h-80 border-primary"
          value={observations || ""}
          onChange={(e) => setObservation(e.target.value)}
        />
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ObsClient;
