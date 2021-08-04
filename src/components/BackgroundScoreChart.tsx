import { useMemo } from "react";
import { useTheme } from "@geist-ui/react";
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
  const theme = useTheme();
  const chartOptions: ChartOptions<IScore> = useMemo(
    () => ({
      data,
      primaryAxis,
      secondaryAxes,
      dark: false,
      tooltip: { groupingMode: "single" },
      defaultColors: [theme.type === "light" ? "black" : "white"],
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
    [data, theme.type]
  );

  if (!data.length) return null;
  return <Chart options={chartOptions} />;
}
