// == Types ================================================================

export interface ITimeFrame {
  duration: number;
  interval: "minutes" | "hours" | "days";
}

// == Constants ============================================================

const INTERVAL_MILLISECONDS: Record<ITimeFrame["interval"], number> = {
  minutes: 60000,
  hours: 3_600_000,
  days: 86_400_000,
};

// == Exports ==============================================================

export function getPastDate(timeFrame: ITimeFrame, date = new Date()): Date {
  return new Date(date.getTime() - timeFrame.duration * INTERVAL_MILLISECONDS[timeFrame.interval]);
}
