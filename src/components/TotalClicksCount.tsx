import React, { useEffect, useState } from "react";
import { Text, Select, Card, Grid, Badge, Button, Loading } from "@geist-ui/react";
import { PlusCircle, MinusCircle } from "@geist-ui/react-icons";
import { IS_DEVELOPMENT } from "@config";
import { useDebounceFunction, useToggle, useWindowFocus } from "@hooks";
import { IReadResponse } from "@pages/api/game/read.api";
import { fetchWithRetry, getPastDate, ITimeFrame } from "@utils";

// == Types ================================================================

// == Constants ============================================================

const INTERVAL_DURATION = IS_DEVELOPMENT ? 300_000 : 5_000;
const DEBOUNCE_DURATION = IS_DEVELOPMENT ? 500 : 250;

const MINIMUM_DURATION = 0;
const MAXIMUM_DURATION = 100;
export const READ_ENDPOINT = "/api/game/read";

// == Functions ============================================================

// == Component ============================================================

export function TotalClicksCount() {
  const isFocused = useWindowFocus();

  const [isLoading, toggleIsLoading] = useToggle(false);
  const [timeFrame, setTimeFrame] = useState<ITimeFrame>({ duration: 5, interval: "minutes" });
  const [clickCount, setClickCount] = useState<number | null>(null);

  const getTotalClicks = useDebounceFunction(async (debouncedTimeFrame: ITimeFrame) => {
    toggleIsLoading(true);
    const params = new URLSearchParams({
      timestamp: getPastDate(debouncedTimeFrame).toISOString(),
    });
    const endpoint = `${READ_ENDPOINT}?${params.toString()}`;
    const response = await fetchWithRetry(endpoint, { method: "GET", retryAttempts: 3 });
    const json = (await response.json()) as IReadResponse;
    setClickCount(json.totalClicks.total);
    toggleIsLoading(false);
  }, DEBOUNCE_DURATION);

  useEffect(() => {
    if (!isFocused || !timeFrame.duration) return undefined;

    void getTotalClicks(timeFrame);

    const interval = setInterval(() => {
      void getTotalClicks(timeFrame);
    }, INTERVAL_DURATION);
    return () => clearInterval(interval);
  }, [getTotalClicks, timeFrame, isFocused]);

  const updateDuration = (value: number) => {
    setTimeFrame((previousTimeFrame) => {
      const duration = previousTimeFrame.duration + value;
      if (duration < MINIMUM_DURATION || duration > MAXIMUM_DURATION) return previousTimeFrame;
      return { ...previousTimeFrame, duration };
    });
  };

  return (
    <Card style={{ zIndex: 6, opacity: 0.9 }}>
      <Grid.Container alignItems="center" direction="column" justify="center" style={{ zIndex: 1 }}>
        {isLoading || clickCount === null ? (
          <Badge scale={3} style={{ position: "relative" }}>
            <span style={{ visibility: "hidden" }}>{clickCount ?? 0}</span>
            <Loading style={{ position: "absolute", left: 0, top: 0 }} type="success" />
          </Badge>
        ) : (
          <Badge data-testid="count-badge" scale={3}>
            {clickCount}
          </Badge>
        )}
        <Text style={{ textAlign: "center" }}>Clicks from all users in the last:</Text>
        <Badge scale={2}>{timeFrame.duration}</Badge>
        <Grid direction="row">
          <Button
            auto
            effect={false}
            icon={<MinusCircle />}
            px={1 / 4}
            scale={2}
            type="abort"
            onClick={() => updateDuration(-1)}
          />
          <Button
            auto
            effect={false}
            icon={<PlusCircle />}
            px={1 / 4}
            scale={2}
            type="abort"
            onClick={() => updateDuration(1)}
          />
        </Grid>
        <Select
          value={timeFrame.interval}
          onChange={(value) =>
            setTimeFrame((previousTimeFrame) => {
              return { ...previousTimeFrame, interval: value as ITimeFrame["interval"] };
            })
          }
        >
          <Select.Option value="minutes">minutes</Select.Option>
          <Select.Option value="hours">hours</Select.Option>
          <Select.Option value="days">days</Select.Option>
        </Select>
      </Grid.Container>
    </Card>
  );
}

// == Styles ===============================================================
