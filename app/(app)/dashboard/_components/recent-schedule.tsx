import { listSchedules } from "@/app/_data/schedule";
import { currencyFormat } from "@/app/_utils/helper";
import { Prisma } from "@prisma/client";

type ScheduleAll = Prisma.ScheduleGetPayload<{
  include: {
    client: true;
    service: true;
    vehicle: true;
  };
}>;

const RecentSchedules = async () => {
  const recentSchedules = (await listSchedules({
    include: {
      client: true,
      service: true,
      vehicle: true,
    },
    take: 5,
  })) as ScheduleAll[];

  return (
    <div className="space-y-8">
      {recentSchedules.map((schedule, index) => (
        <div key={index} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium capitalize leading-none">
              {schedule.vehicle.brand} {schedule.vehicle.model}{" "}
              {schedule.vehicle.color}
            </p>
            <p className="text-sm text-muted-foreground">
              {schedule.service.name}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {currencyFormat(Number(schedule.service.price))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSchedules;
