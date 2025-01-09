"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "react-toastify";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/app/_lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";

interface DataTableFacetedFilterProps {
  page: string;
}

export const DataTableFilterPeriod = ({
  page,
}: DataTableFacetedFilterProps) => {
  const router = useRouter();

  const [date, setDate] = useState<DateRange | undefined>();

  const onFilter = () => {
    if (!date || !date.to || !date.from) {
      toast.warn("Selecione um período valido");
      return;
    }
    const from = date.from.toISOString().split("T")[0];
    const to = date.to.toISOString().split("T")[0];
    router.push(`/${page}?period=${from}_${to} `);
  };

  const handleReset = () => {
    setDate(undefined);
    router.push(`/${page}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-background lg:flex-row">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL y", { locale: ptBR })} -{" "}
                  {format(date.to, "dd LLL y", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd LLL y")
              )
            ) : (
              <span>Selecione o período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="!w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
      <div className="">
        <Button
          className="mx-1 h-5/6 w-16"
          disabled={!date || !date.to || !date.from}
          onClick={onFilter}
        >
          Filtrar
        </Button>
        <Button
          className="mx-1 h-5/6 w-16"
          disabled={!date}
          onClick={handleReset}
        >
          Redefinir
        </Button>
      </div>
    </div>
  );
};
