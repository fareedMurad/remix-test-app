import React, { useEffect, useRef } from "react";

const useEventListener = (
  eventName: "keydown" | "keyup" | "keypress",
  handler: ({ key }: KeyboardEvent) => void
) => {
  const savedHandler = useRef<({ key }: KeyboardEvent) => void>(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => savedHandler.current(event);

    window.addEventListener(eventName, eventListener);

    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};

export default useEventListener;
