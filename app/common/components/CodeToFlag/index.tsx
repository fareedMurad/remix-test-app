import React from "react";
import { CircleFlag } from "react-circle-flags";

const CodeToFlag = ({ code = "US" }: { code?: string }) => {
  return (
    <div className="rounded-[50%] overflow-hidden w-6 h-6">
      <CircleFlag className="emojiFlag" countryCode={code.toLowerCase()} />
    </div>
  );
};

export default CodeToFlag;
