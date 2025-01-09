import { DataTable } from "@/app/_components/table/dataTable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { scheduleColumns } from "./_components/schedule-columns";
import ManagerProductSupplier from "./_components/manager-schedule";
import { listSchedules } from "@/app/_data/schedule";
import { listClients } from "@/app/_data/client";
import { listServices } from "@/app/_data/service";
import HeaderSchedule from "./_components/header-schedule";
import { getPeriod } from "@/app/_utils/helper";

const SchedulePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ period: string }>;
}) => {
  const { period } = await searchParams;

  const filterPeriod = getPeriod(period);
  console.log(filterPeriod);
  const [schedules, clients, services] = await Promise.all([
    listSchedules({
      include: {
        client: true,
        employer: true,
        vehicle: true,
        service: true,
      },
      where: {
        createdAt: filterPeriod?.createdAt || {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    }),
    listClients(),
    listServices(),
  ]);

  return (
    <Card className="max-w-sm lg:max-w-full">
      <CardHeader className="flex-col justify-between lg:flex-row">
        <div>
          <CardTitle>Agendamentos</CardTitle>
        </div>
        <ManagerProductSupplier clients={clients} services={services} />
      </CardHeader>

      <CardContent>
        <HeaderSchedule period={filterPeriod?.createdAt} />

        <DataTable
          columns={scheduleColumns}
          data={JSON.parse(JSON.stringify(schedules))}
        />
      </CardContent>
    </Card>
  );
};

export default SchedulePage;
