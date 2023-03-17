import {
  useState,
  useEffect,
  useRef,
  useCallback,
  RefObject,
  Dispatch,
  SetStateAction
} from 'react';

const defaultStartEvent = 'mouseenter';
const defaultEndEvent = 'mouseleave';

const useHover = <T extends HTMLElement>({
  startEvent = defaultStartEvent,
  endEvent = defaultEndEvent
}: {
  startEvent?: string;
  endEvent?: string;
} = {}): [boolean, RefObject<T>, Dispatch<SetStateAction<boolean>>] => {
  const [hovering, setHovering] = useState(false);
  const ref = useRef<T>(null);

  const hoverStart = useCallback(() => setHovering(true), []);
  const hoverEnd = useCallback(() => setHovering(false), []);

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;

      el.addEventListener(startEvent, hoverStart);
      el.addEventListener(endEvent, hoverEnd);

      return () => {
        el.removeEventListener(startEvent, hoverStart);
        el.removeEventListener(endEvent, hoverEnd);
      };
    }
  }, [ref, hoverStart, hoverEnd, endEvent, startEvent]);

  return [hovering, ref, setHovering];
};

export default useHover;
