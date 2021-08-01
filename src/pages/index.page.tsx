import { useState } from "react";
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
  }, 200);

  const incrementClickCount = () => {
    setClickCount((previousCount) => {
      previousCount += 1;
      debouncedSetData(previousCount);
      trackAnalytics({ event: "click", meta: { count: previousCount } });
      return previousCount;
    });
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
