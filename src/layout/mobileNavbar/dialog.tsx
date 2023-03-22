import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react';

import classes from './mobileNavbar.module.scss';

interface Props {
  displayed: boolean;
  setDisplayed: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
}

const NavbarDialog = ({ displayed, setDisplayed, children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (
          target?.id === '__mobileNavbarDialog' ||
          target?.className?.includes('gridRow')
        )
          setDisplayed(false);
      }}
      onClose={(e) => {
        e.preventDefault();
        setDisplayed(false);
      }}
      className={classes.dialog}
      ref={dialogRef}
      id='__mobileNavbarDialog'>
      {children}
    </dialog>
  );
};

export default NavbarDialog;
