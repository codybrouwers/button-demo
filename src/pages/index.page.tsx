import { useEffect, useState } from "react";
import { ClapButton, BackgroundScoreChart, IScore, INITIAL_SCORE_DATA } from "components";
import { useDebounceFunction, useTrackAnalytics } from "hooks";

// == Types ================================================================

// == Constants ============================================================

// == Component ============================================================

export default function Home() {
  const trackAnalytics = useTrackAnalytics();
  const [clickCount, setClickCount] = useState(0);
  const [data, setData] = useState<IScore[]>(() => INITIAL_SCORE_DATA);

  const debouncedSetData = useDebounceFunction((count: number) => {
    setData((previousData) => {
      return [...previousData, { timestamp: new Date(), count }];
    });
  }, 100);

  useEffect(() => {
    if (!clickCount) return;

    debouncedSetData(clickCount);
  }, [clickCount, debouncedSetData]);

  const incrementClickCount = () => {
    setClickCount((previousCount) => {
      previousCount += 1;
      return previousCount;
    });
    trackAnalytics.click.increment();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ClapButton clickCount={clickCount} incrementClickCount={incrementClickCount} />
      </div>
      <BackgroundScoreChart data={data} />
    </>
  );
}
