import React, { useRef, useState } from "react";
import Input from "~/common/components/Input/Index";
import { PROMPT_COMMANDS } from "~/common/models/static";
import { Option } from "~/common/components/Select";
import CommandItem from "./CommandItem";
import useOnClickOutside from "~/common/hooks/useOnClickOutside";

const MODAL_WIDTH = 300;
const PROMPT_KEY = "/";

export default function BasicCommandInterface() {
  const [isCommandPromptOpen, setCommandPrompOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState<Option>(
    PROMPT_COMMANDS[0]
  );
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const [position, setPosition] = useState({ x: 0 });
  const [inputValue, setInputValue] = useState("");
  useOnClickOutside(wrapperRef, () => setCommandPrompOpen(false));

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Slash") {
      getCursorPostion();
      setCommandPrompOpen(true);
    } else if (e.code === "Enter") {
      setInputValue(selectedCommand.label as string);
      setCommandPrompOpen(false);
    } else {
      setCommandPrompOpen(false);
    }
  };

  const handleSelectCommand = (command: Option) => {
    console.log(command, "New");
    setSelectedCommand(command);
    setInputValue(command.label as string);
    setCommandPrompOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) setCommandPrompOpen(false);
    if (value === PROMPT_KEY) setCommandPrompOpen(true);
  };

  const getCursorPostion = () => {
    const input = inputRef.current;
    if (input) {
      const { selectionEnd } = input;
      const positionX = selectionEnd * 6.5;
      setPosition({
        x: positionX > MODAL_WIDTH ? MODAL_WIDTH - 10 : positionX,
      });
    }
  };

  const renderMenuOptions = () =>
    PROMPT_COMMANDS.map((option: Option) => (
      <CommandItem
        option={option}
        isActive={selectedCommand.value === option.value}
        onSelect={handleSelectCommand}
      />
    ));

  const handleFocus = () => {
    if (inputValue[inputValue?.length - 1] === PROMPT_KEY) {
      setCommandPrompOpen(true);
    }
  };

  const handleArrowUpAndDownKeys = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const isKeyUp = e.code === "ArrowUp";
    const isKeyDown = e.code === "ArrowDown";
    if (isCommandPromptOpen && (isKeyUp || isKeyDown)) {
      e.preventDefault();
      const currentIndex = PROMPT_COMMANDS.findIndex(
        (pc) => pc.value === selectedCommand.value
      );
      const length = PROMPT_COMMANDS.length;
      const maxIndex = length - 1;
      let counter = currentIndex;

      if (isKeyUp) {
        if (currentIndex === 0) {
          counter = currentIndex + maxIndex;
        } else if (currentIndex <= maxIndex) {
          counter = currentIndex - 1;
        }
        const findNext = PROMPT_COMMANDS[counter];

        setSelectedCommand(findNext);
      } else if (isKeyDown) {
        if (currentIndex < maxIndex) {
          counter = currentIndex + 1;
        } else if (currentIndex === maxIndex) {
          counter = 0;
        }
        const findNext = PROMPT_COMMANDS[counter];

        setSelectedCommand(findNext);
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen text-teal">
      <div className="relative min-w-[300px]" ref={wrapperRef}>
        <Input
          id="basic-command-interface"
          placeholder="Type / for menu"
          className="px-2 py-1 w-full outline-none rounded"
          onChange={handleOnChange}
          ref={inputRef}
          onFocus={handleFocus}
          onKeyDown={handleArrowUpAndDownKeys}
          onKeyPress={handleInputKeyPress}
          value={inputValue}
        />
        <div
          className={`absolute top-10 min-h-[${MODAL_WIDTH}] w-full left-0 bg-lightCyan rounded-b-lg transition ${
            isCommandPromptOpen
              ? `max-h-[400px] opacity-100`
              : "max-h-0 invisible opacity-0"
          } transition-all duration-200 ease overflow-hidden`}
          style={{ left: position.x }}
        >
          <li className="p-2 list-none font-semibold">Insert</li>
          <ul>{renderMenuOptions()}</ul>
        </div>
      </div>
    </div>
  );
}
