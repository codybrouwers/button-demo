import { useMemo } from "react";
import { AxisOptions, Chart, ChartOptions } from "react-charts";

// == Types ================================================================

interface IProps {
  data: IScore[];
}

export interface IScore {
  timestamp: Date;
  count: number;
}

// == Constants ============================================================

const primaryAxis: AxisOptions<IScore> = {
  getValue: (datum) => datum.timestamp,
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

export const INITIAL_SCORE_DATA = [
  {
    timestamp: new Date(),
    count: 0,
  },
];

// == Functions ============================================================

// == Component ============================================================

export function BackgroundScoreChart({ data }: IProps) {
  const chartOptions: ChartOptions<IScore> = useMemo(
    () => ({
      data: [{ data }],
      primaryAxis,
      secondaryAxes,
      dark: false,
      tooltip: false,
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

  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
      <Chart options={chartOptions} />
    </div>
  );
}
