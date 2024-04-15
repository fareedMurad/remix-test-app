import { Dialog as DialogBase, Transition } from "@headlessui/react";
import type { FC, ReactNode } from "react";
import { Fragment } from "react";
import CloseIcon from "../../assets/icons/CloseRedIcon.svg";
import { cn } from "../../utils/utils";

type DialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  title?: ReactNode;
  hasTitleUnderline?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  extraClasses?: string;
  hasCloseIcon?: boolean;
  titleClassName?: string;
  overlayclassName?: string;
  externalCloseIcon?: string;
  closeBtnClassName?: string;
  closeIconClassName?: string;
  headerClassName?: string;
  childrenClassName?: string;
};

const Dialog: FC<DialogProps> = ({
  children,
  footer,
  isOpen,
  onClose = () => {},
  title,
  extraClasses,
  hasTitleUnderline = true,
  hasCloseIcon = false,
  titleClassName,
  overlayclassName,
  externalCloseIcon,
  closeBtnClassName,
  closeIconClassName,
  headerClassName,
  childrenClassName,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <DialogBase as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={cn(
              "flex min-h-full items-center justify-center p-4 text-center",
              overlayclassName
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogBase.Panel
                className={cn(
                  "w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 pt-11 pl-11 pr-14 text-left align-middle shadow-xl transition-all",
                  extraClasses
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-between",
                    headerClassName
                  )}
                >
                  <DialogBase.Title
                    as="h3"
                    className={cn(
                      "text-xl font-bold text-black uppercase",
                      titleClassName
                    )}
                  >
                    {title}
                  </DialogBase.Title>
                  {hasCloseIcon && (
                    <button
                      onClick={onClose}
                      className={cn("outline-none", closeBtnClassName)}
                    >
                      <img
                        src={externalCloseIcon || CloseIcon}
                        alt="CloseIcon"
                        className={cn("h-6 w-6", closeIconClassName)}
                      />
                    </button>
                  )}
                </div>
                {hasTitleUnderline && (
                  <div className="h-1 w-full bg-orange"></div>
                )}
                <div
                  className={cn("mt-2 flex items-center", childrenClassName)}
                >
                  {children}
                </div>

                {footer && <div className="mt-8">{footer}</div>}
              </DialogBase.Panel>
            </Transition.Child>
          </div>
        </div>
      </DialogBase>
    </Transition>
  );
};

export default Dialog;
