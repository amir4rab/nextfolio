import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties
} from 'react';

// react-icons
import type { IconType } from 'react-icons';

// mantine
import classes from './iconsRow.module.scss';

export interface IconsRowProps {
  stopOnHover?: boolean;
  title?: string | boolean;
  linker?: boolean;
  sidePadding?: number;
  icons: {
    icon: IconType;
    href: string;
  }[];
}

/** Calculates amount of delay needed for equal padding between items */
const getTiming = (
  arrayLength: number,
  wrapperWidth: number,
  isDesktop: boolean,
  sidePadding: number
) => {
  const animationDuration = isDesktop ? 20 : 10;
  const elementWidth = 40; // 2.5rem * 16 = 40px
  const wrapperWidthWithPadding = wrapperWidth + sidePadding * 2 * 16;
  const speed = wrapperWidthWithPadding / animationDuration; // path / duration of path

  const emptySpace = wrapperWidthWithPadding - elementWidth * arrayLength;
  const emptySpacePerItem = emptySpace / arrayLength;

  const durationNeededForPadding = (emptySpacePerItem + elementWidth) / speed;

  return parseFloat(durationNeededForPadding.toFixed(2));
};

interface IconWrapperProps {
  href?: string;
  key?: string | number;
  style?: CSSProperties;
  className: string;
  children: ReactNode;
}

const IconWrapper = ({ children, ...props }: IconWrapperProps) => {
  return (
    <a
      {...props}
      target='_blank'
      rel='noreferrer'
      className={[classes.iconWrapper, classes.icon].join(' ')}>
      {children}
    </a>
  );
};

const IconsRow = ({
  icons,
  title,
  linker = true,
  stopOnHover = true,
  sidePadding = 3.125
}: IconsRowProps) => {
  const [hovered, setHovered] = useState(false);
  const [delayLength, setDelayLength] = useState<null | number>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperWidth = useRef(0);

  const animationCalculations = useCallback(() => {
    if (wrapperRef.current === null) return;

    const isDesktop = window.matchMedia('(min-width: 966px)').matches;
    const width = wrapperRef.current.getBoundingClientRect().width;
    wrapperWidth.current = width;

    const delay = getTiming(icons.length, width, isDesktop, sidePadding);
    setDelayLength(delay);

    wrapperRef.current.style.setProperty('--el-width', `${width}px`);
    wrapperRef.current.style.setProperty('--side-padding', `${sidePadding}rem`);
  }, [icons.length, sidePadding]);

  useEffect(() => {
    if (wrapperRef.current === null || typeof window === 'undefined') return;

    delayLength === null && animationCalculations();

    window.addEventListener('resize', animationCalculations);

    return () => {
      window.removeEventListener('resize', animationCalculations);
    };
  }, [animationCalculations, delayLength]);

  return (
    <div ref={wrapperRef} className={classes.iconsRow}>
      {title !== false && (
        <p className={classes.title}>
          {typeof title !== 'undefined' ? title : 'Experienced with'}
        </p>
      )}
      <div
        data-hidden={delayLength === 0}
        onMouseEnter={() => stopOnHover && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={classes.iconsWrapper}>
        {delayLength !== null &&
          icons.map(({ icon, href }, i) => {
            const I = icon;

            return (
              <IconWrapper
                href={linker ? href : undefined}
                key={i}
                style={{ animationDelay: `${i * delayLength}s` }}
                className={[hovered && classes.iconPaused].join(' ')}>
                <I />
              </IconWrapper>
            );
          })}
      </div>
    </div>
  );
};

export default IconsRow;
