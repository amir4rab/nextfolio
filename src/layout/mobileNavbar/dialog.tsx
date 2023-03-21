import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import { IoChevronDown, IoMenu, IoSettings } from 'react-icons/io5';

import classes from './mobileNavbar.module.scss';

interface Props {
  displayed: boolean;
  setDisplayed: Dispatch<SetStateAction<boolean>>;
}

const NavbarDialog = ({ displayed, setDisplayed }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    let closingCallback: NodeJS.Timeout;

    if (dialog === null) return;

    if (dialog.getAttribute('open') && displayed) return;

    if (displayed) {
      dialog.setAttribute('data-closing', 'false');
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.setAttribute('data-closing', 'true');
      document.body.style.overflow = 'auto';
      closingCallback = setTimeout(() => {
        dialog.close();
      }, 150);
    }

    return () => {
      closingCallback && clearTimeout(closingCallback);
    };
  }, [displayed]);

  return (
    <dialog
      onClose={(e) => {
        e.preventDefault();
        setDisplayed(false);
      }}
      className={classes.dialog}
      ref={dialogRef}>
      <div className={classes.contents}>
        <div ref={contentWrapperRef} className={classes.contentWrapper}></div>
      </div>
      <div className={classes.controls}>
        <button data-active={true}>
          <IoSettings />
        </button>
        <button data-active={false}>
          <IoMenu />
        </button>
        <button onClick={() => setDisplayed(false)}>
          <IoChevronDown />
        </button>
      </div>
    </dialog>
  );
};

export default NavbarDialog;
