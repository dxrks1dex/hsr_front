import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

interface Props {
  ref: MutableRefObject<HTMLElement | null>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const useOutsideDetect = ({ ref, setIsOpen }: Props): void => {
  useEffect(() => {
    function isClickOutside(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", isClickOutside);
    return () => {
      document.removeEventListener("mousedown", isClickOutside);
    };
  }, [ref, setIsOpen]);
};
