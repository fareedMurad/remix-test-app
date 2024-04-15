import { useCallback, useState } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  Controller,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Properties<C extends FieldValues> {
  readonly title: string;
  readonly label: string;
  readonly name: Path<C>;
  readonly control: Control<C>;
  readonly errorMessage?: string;
  readonly disabled?: boolean;
}

const hasError = (errorMessage?: string) => errorMessage?.trim()?.length;

const ScrollField = <C extends FieldValues = FieldValues>({
  title,
  label,
  name,
  control,
  errorMessage,
  disabled,
}: Properties<C>) => {
  const [canCheck, setCanCheck] = useState(false);

  const handleScroll = useCallback(
    (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target;
      if (scrollHeight - scrollTop === clientHeight && !disabled) {
        setCanCheck(true);
      }
    },
    [disabled, setCanCheck]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur } }) => {
        return (
          <div>
            <label
              className={twMerge(
                "text-base font-semibold mb-2 block",
                disabled && "opacity-[30%]"
              )}
            >
              {title}
            </label>
            <section
              className="h-80 overflow-y-scroll bg-light mb-3 rounded p-4 scrollbar-thin scrollbar-thumb-orange scrollbar-track-black scrollbar-w-1 scrollbar-h-1"
              onScroll={handleScroll}
            >
              <h3 className="text-3xl font-TimesNewRoman tracking-widest font-bold mb-6">
                Terms of Use
              </h3>
              <p>
                PLEASE READ THIS AGREEMENT CAREFULLY. BY ACCESSING OR USING THIS
                SITE OR OUR SERVICES OR OTHERWISE AGREEING TO THIS AGREEMENT,
                YOU UNDERSTAND AND AGREE TO BE BOUND BY THIS AGREEMENT AND
                RECOGNIZE THAT YOU MAY BE WAIVING CERTAIN RIGHTS.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <h3>Why do we use it?</h3>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </section>
            <p
              className={twMerge(
                "text-xs flex items-center",
                !canCheck && "text-gray",
                canCheck && "text-black"
              )}
            >
              <input
                onBlur={onBlur}
                onChange={onChange}
                disabled={!canCheck}
                className="mr-3 w-3 h-3 cursor-pointer"
                type="checkbox"
              />
              <span>{label}</span>
            </p>
            {hasError(errorMessage) ? (
              <p className="text-alert">{errorMessage}</p>
            ) : (
              <></>
            )}
          </div>
        );
      }}
    />
  );
};

export default ScrollField;
