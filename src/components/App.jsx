import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { getAllImages } from './api/api';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { LoadMoreButton } from './Button';
import css from './service/styles.module.css';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchRequiring, setSearchRequiring] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (
      (searchRequiring && setSearchRequiring() !== searchRequiring) ||
      (page && setPage !== page)
    ) {
      setIsLoading(true);
      const fetch = () => {
        try {
          getAllImages(searchRequiring, page).then(({ data }) => {
            const photos = data.hits.map(photo => ({
              id: nanoid(),
              webformatURL: photo.webformatURL,
              largeImageURL: photo.largeImageURL,
            }));

            setTotalPage(data.totalHits);
            setIsLoading(false);
            setPage(page);
            setPhotos([...photos, ...photos]);
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetch();
    }
  }, [searchRequiring, page]);

  const handleOpen = id => {
    setIsModalOpen(id);
  };
  const handleClose = e => {
    if (e.target.nodeName === 'IMG' || e.code === 'Escape') {
      setIsModalOpen();
    }
  };
  const handleSubmit = query => {
    setSearchRequiring(query.trim());
    setPage(1);
    setPhotos([]);
  };

  LoadMoreButton = () => {
    setPage(page + 1);
    setIsLoading(false);
  };

  return (
    <>
      <div className={css.App}>
        <Searchbar handleSubmit={handleSubmit} />
        <ImageGallery images={setPhotos} handleOpen={handleOpen} />
        {photos.length !== 0 && this.state.page * 12 <= totalPage && (
          <LoadMoreButton LoadMoreButton={LoadMoreButton} />
        )}
      </div>
      {isLoading && <Loader />}
      {isModalOpen !== false && (
        <Modal images={photos} id={isModalOpen} handleClose={handleClose} />
      )}
    </>
  );
};
