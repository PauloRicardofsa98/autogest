import { DataTable } from "@/app/_components/table/dataTable";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { scheduleColumns } from "./_components/schedule-columns";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import ManagerProductSupplier from "./_components/manager-schedule";
import { listSchedules } from "@/app/_data/schedule";
import { listClients } from "@/app/_data/client";
import { listServices } from "@/app/_data/service";

const SchedulePage = async () => {
  const [schedules, clients, services] = await Promise.all([
    listSchedules({
      include: {
        client: true,
        employer: true,
        vehicle: true,
        service: true,
      },
    }),
    listClients(),
    listServices(),
  ]);

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Agendamentos</CardTitle>
        </div>
        <ManagerProductSupplier clients={clients} services={services} />
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
            <div className="flex items-center space-x-2">
              <ArrowLeftIcon className="rounded bg-gray-200 hover:bg-gray-300" />
              <ArrowRightIcon className="rounded bg-gray-200 hover:bg-gray-300" />

              <h2 className="text-lg font-semibold">Janeiro 2025</h2>
            </div>
            <div className="space-x-2">
              <Button>Hoje</Button>
              <Button>Semana</Button>
            </div>
          </div>
          <div className="flex flex-col bg-white py-2">
            <div className="bg-white py-2 text-center font-bold">Hoje</div>
            <DataTable
              columns={scheduleColumns}
              data={JSON.parse(JSON.stringify(schedules))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchedulePage;
