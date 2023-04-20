import React, { useEffect, useRef, useState } from "react";

interface TimerProps {
  timeValue: string;
  onComplete: () => void;
}

function Timer({ timeValue, onComplete }: React.PropsWithChildren<TimerProps>) {
  let timeElementRef = useRef<any>(null);
  let time = useRef<string>(timeValue);
  let interval = useRef<any>(null);
  let [action, setAction] = useState("start");

  let getCurrentTime = () => {
    let minutes = time.current.split(":")[0];
    let seconds = time.current.split(":")[1];

    let newTime = "";

    if (minutes === "00" && seconds === "00") {
      return "-1";
    }

    if (seconds === "00") {
      let newMinutes = Number.parseInt(minutes) - 1;
      minutes = `${newMinutes < 10 ? "0" + newMinutes : newMinutes}`;
      seconds = `59`;
      newTime = `${minutes}:${seconds}`;
    } else {
      let newSeconds = Number.parseInt(seconds) - 1;
      seconds = `${newSeconds < 10 ? "0" + newSeconds : newSeconds}`;
      newTime = `${minutes}:${seconds}`;
    }

    return newTime;
  };

  const handleStartTime = () => {
    if (interval.current != null) return;

    interval.current = setInterval(() => {
      console.log("still");
      let currentTime = getCurrentTime();

      if (currentTime == "-1") {
        onComplete();
        handleResetTime();
        return;
      }

      time.current = currentTime;
      timeElementRef!!.current!!.innerHTML = time.current;
    }, 1000);
    setAction("resume");
  };

  const handleStopTime = () => {
    if (interval.current == null) return;

    clearInterval(interval.current);
    interval.current = null;
  };

  const handleResetTime = () => {
    clearInterval(interval.current);
    time.current = timeValue;
    timeElementRef.current.innerHTML = time.current;
    setAction("start");
    interval.current = null;
  };

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <>
      <section className="flex space-x-2">
        <button
          className="bg-violet-400 p-1 rounded-md w-[70px]"
          onClick={handleStartTime}
        >
          {action}
        </button>
        <button
          className="bg-violet-400 px-2 py-1 rounded-md w-[60px]"
          onClick={handleStopTime}
        >
          stop
        </button>
        <button
          className="bg-violet-400 px-2 py-1 rounded-md w-[60px]"
          onClick={handleResetTime}
        >
          reset
        </button>
      </section>
      <section>
        <p ref={timeElementRef}>{time.current}</p>
      </section>
    </>
  );
}

export default Timer;
