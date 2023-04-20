import React, { useContext, useEffect, useState } from "react";
import Timer from "../components/Timer";
import { userContext } from "../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import { signOutService } from "../services/firebase";

function TimerPage() {
  const { dispatch, user } = useContext(userContext);
  const navigate = useNavigate();
  const [showBreakTimer, setShowBreakTimer] = useState(false);

  const handleWorkTimerOnComplete = () => {
    setShowBreakTimer(true);
  };

  const handleBreakTimerOnComplete = () => {
    setShowBreakTimer(false);
  };

  const handleOnClose = () => {
    setShowBreakTimer(false);
  };

  const handleLogOut = () => {
    signOutService();
  };

  useEffect(() => {
    if (user) return;

    navigate("/", { replace: true });
  }, [user]);

  useEffect(() => {
    if (user) return;

    navigate("/", {
      replace: true,
    });
  }, []);

  return (
    <>
      <button
        onClick={handleLogOut}
        className="absolute top-2 right-4 bg-violet-400 px-1 py-1 rounded-md w-[80px]"
      >
        Log out
      </button>
      <div className="flex h-screen flex-col justify-center items-center space-y-4">
        <div className="flex flex-col space-y-2 rounded-lg bg-gray-200 p-2">
          <h1 className="font-bold">Work Timer</h1>
          <Timer onComplete={handleWorkTimerOnComplete} timeValue="00:02" />
        </div>
        {showBreakTimer && (
          <div className="flex flex-col relative space-y-2 rounded-lg bg-gray-200 p-2">
            <h1 className="font-bold">Break Timer</h1>
            <button
              onClick={handleOnClose}
              className="absolute top-[-5px] right-2"
            >
              close
            </button>
            <Timer onComplete={handleBreakTimerOnComplete} timeValue="00:10" />
          </div>
        )}
      </div>
    </>
  );
}

export default TimerPage;
