import { useMemo } from "react";
import { AxisOptions, Chart, ChartOptions, UserSerie } from "react-charts";

// == Types ================================================================

interface IScore {
  timestamp: Date;
  count: number;
  user: IUser;
}

export type TChartData = UserSerie<IScore>;

interface IProps {
  data: TChartData[];
}

// == Constants ============================================================

const primaryAxis: AxisOptions<IScore> = {
  getValue: (datum) => new Date(datum.timestamp),
  formatters: {
    tooltip: (value) => <span>{value?.toLocaleTimeString() ?? ""}</span>,
  },
  scaleType: "localTime",
  showGrid: false,
  show: false,
};

const secondaryAxes: AxisOptions<IScore>[] = [
  {
    getValue: (datum) => datum.count,
    scaleType: "linear",
    min: 0,
    max: 50,
    showGrid: false,
    show: false,
  },
];

// == Functions ============================================================

// == Component ============================================================

export function BackgroundScoreChart({ data }: IProps) {
  const chartOptions: ChartOptions<IScore> = useMemo(
    () => ({
      data,
      primaryAxis,
      secondaryAxes,
      dark: false,
      tooltip: { groupingMode: "single" },
      primaryCursor: {
        show: false,
        showLine: false,
        showLabel: false,
      },
      secondaryCursor: {
        show: false,
        showLine: false,
        showLabel: false,
      },
    }),
    [data]
  );

  if (!data.length) return null;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 0 }}>
      <Chart options={chartOptions} />
    </div>
  );
}
