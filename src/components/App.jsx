import { LineWave } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import { GlobalStyle } from './styles';
import { Box } from './Box/Box';

import { FetchedCards } from './fetchedCards/FetchedCards';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/imageGallryList';
import { ImageGalleryItem } from './ImageGallery/ImageGalleryItem';
import { LoadMoreBtn } from './Button/Button';
import { Modal } from './Modal/Modal';

export default function App() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    FetchedCards(query, page, perPage)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          Notiflix.Notify.info(
            `Sorry, we do not have any photos with mention ${query}`
          );
          setShowBtn(false);
          return;
        }
        setCards(cards => [...cards, ...hits]);

        const totalPages = Math.floor(totalHits / hits.length);
        page === totalPages ? setShowBtn(false) : setShowBtn(true);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [page, query, perPage]);

  const handleSubmit = async data => {
    try {
      if (data.trim() === '') {
        Notiflix.Notify.info(`Please fill the field`);
        return;
      }
      setCards([]);
      setQuery(data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadMore = async () => {
    setPage(page => page + 1);
  };
  const toggleModal = () => {
    setShowModal(state => !state);
  };
  const openModal = data => {
    setModalUrl(data);
    toggleModal();
  };
  return (
    <Box>
      <GlobalStyle />
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery>
        <ImageGalleryItem cards={cards} onClick={openModal} />
      </ImageGallery>
      {!loading && showBtn && (
        <Box display="flex" justifyContent="center" alignItems="center" p={5}>
          <LoadMoreBtn click={loadMore} />
        </Box>
      )}
      <Box display="flex" justifyContent="center" alignItems="center">
        {loading && (
          <LineWave
            color="black"
            height={110}
            width={610}
            ariaLabel="three-circles-rotating"
          />
        )}
        {showModal && <Modal url={modalUrl} onClose={toggleModal} />}
      </Box>
    </Box>
  );
}
