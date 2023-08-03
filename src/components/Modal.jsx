import { useEffect } from 'react';
import css from './service/styles.module.css';

export const Modal = ({ id, images, handleClose, tags }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, [handleClose]);

  return (
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>
        <img
          src={images.filter(img => img.id === id)[0].largeImageURL}
          alt={tags}
        />
      </div>
    </div>
  );
};
