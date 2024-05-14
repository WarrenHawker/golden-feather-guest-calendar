/* 
  Overlay component

  Wraps around the GuestForm component as a pop-up overlay. 
  It opens/closes by linking directly to the isOverlayOpen useState 
  in the App.tsx file.
*/

import { ReactNode, SyntheticEvent, useEffect } from 'react';

type Props = {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: (input: boolean) => void;
};

const Overlay = ({ children, isOpen, setIsOpen }: Props) => {
  useEffect(() => {
    import('./Overlay.css'); //overlay.css file is only loaded on pages that uses the component
  }, []);

  const closeOverlay = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('overlay') ||
      target.classList.contains('overlay-content-container')
    ) {
      setIsOpen(false); //allows the overlay to close when the user clicks outside the form
    }
  };

  return (
    <div
      className={isOpen ? 'overlay open' : 'overlay'}
      onClick={(e) => closeOverlay(e)}
    >
      <div className="overlay-content-container">
        <div className="overlay-content">
          <i
            className="fa fa-window-close"
            id="overlay-close"
            onClick={() => setIsOpen(false)}
          ></i>
          <div className="overlay-content-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
