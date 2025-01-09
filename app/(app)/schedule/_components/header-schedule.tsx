import { DataTableFilterPeriod } from "@/app/_components/table/data-table-filter-period";

interface HeaderScheduleProps {
  period:
    | {
        gte: Date;
        lte: Date;
      }
    | undefined;
}

const HeaderSchedule = ({ period }: HeaderScheduleProps) => {
  return (
    <div className="lg-flex-row mb-4 flex flex-col items-center justify-between space-x-2 border-b border-gray-200 pb-4">
      <h2 className="text-lg font-semibold">
        {!period
          ? `Hoje, ${new Date().toLocaleString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}`
          : period.gte.toLocaleString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }) +
            " até " +
            period.lte.toLocaleString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
      </h2>
      <DataTableFilterPeriod page="schedule" />
    </div>
  );
};

export default HeaderSchedule;
