import { useEffect, useState } from "react";
import { TChartData } from "components";
import { useDebounceFunction } from "hooks/useDebounceFunction";

// == Types ================================================================

// == Constants ============================================================

// == Exports ==============================================================

export function useChartData(user: IUser, clickCount: number) {
  const [chartData, setChartData] = useState<TChartData[]>([]);

  useEffect(() => {
    // Set initial chart data after user is loaded
    setChartData([{ id: user.id, label: user.name, data: [{ timestamp: new Date(), count: 0, user }] }]);
  }, [user]);

  const debouncedSetData = useDebounceFunction((data: { count: number; user: IUser }) => {
    setChartData((previousChartData) => {
      return previousChartData.map((chart) => {
        if (chart.id !== data.user.id) return chart;

        return {
          ...chart,
          data: [...chart.data, { timestamp: new Date(), ...data }],
        };
      });
    });
  }, 100);

  useEffect(() => {
    if (!clickCount) return;

    debouncedSetData({ count: clickCount, user });
  }, [clickCount, debouncedSetData, user]);

  return chartData;
}
