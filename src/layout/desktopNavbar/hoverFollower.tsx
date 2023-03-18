import { useState, useContext, useEffect } from 'react';

// navbar context
import { NavbarContext } from './context';

// styles
import classes from './styles.module.scss';

const HoverFollower = () => {
  const { hoveredElStats, wrapperHovering } = useContext(NavbarContext);
  const [hoverElStyles, setHoverElStyles] = useState({
    transform: '',
    transition: '',
    opacity: 0,
    width: 0,
    height: 0
  });

  useEffect(() => {
    const { width, left, height } = hoveredElStats;
    let sTimeout: NodeJS.Timeout;
    let eTimeout: NodeJS.Timeout;

    if (wrapperHovering) {
      if (hoverElStyles.opacity === 0) {
        setHoverElStyles((per) => ({
          ...per,
          width: width,
          height: height,
          transform: `translateX(${left}px)`
        }));

        sTimeout = setTimeout(() => {
          setHoverElStyles((per) => ({
            ...per,
            opacity: 0.1,
            transition: ''
          }));
        }, 5);
      } else {
        setHoverElStyles((per) => ({
          ...per,
          width: width,
          height: height,
          opacity: 0.1,
          transform: `translateX(${left}px)`,
          transition:
            'transform .15s cubic-bezier(0.33, 1, 0.68, 1), width .05s ease, opacity .15s ease-in-out'
        }));
      }
    } else {
      // exit
      setHoverElStyles((per) => ({
        ...per,
        opacity: 0,
        transition: 'opacity .15s ease-in-out'
      }));

      eTimeout = setTimeout(() => {
        setHoverElStyles((per) => ({
          ...per,
          transition: per.opacity === 0 ? '' : per.transition
        }));
      }, 150);
    }

    return () => {
      clearTimeout(sTimeout);
      clearTimeout(eTimeout);
    };
  }, [hoverElStyles.opacity, wrapperHovering, hoveredElStats]);

  // useEffect(() => {
  //   if (
  //     hoverElStyles.transform !== '' ||
  //     typeof firstEl.current === 'undefined'
  //   )
  //     return;

  //   setHoverElStyles((per) => ({
  //     ...per,
  //     transform: `translate(${pos.x}px, ${pos.y}px)`
  //   }));
  // }, [hoverElStyles.transform]);

  return (
    <div
      className={classes.hoverEl}
      style={{
        ...hoverElStyles
      }}
    />
  );
};

export default HoverFollower;
