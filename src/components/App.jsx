import { LineWave } from 'react-loader-spinner';
import { Component } from 'react';
import Notiflix from 'notiflix';

import { GlobalStyle } from './styles';
import { Box } from './Box/Box';

import { FetchedCards } from './fetchedCards/FetchedCards';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/imageGallryList';
import { ImageGalleryItem } from './ImageGallery/ImageGalleryItem';
import { LoadMoreBtn } from './Button/Button';
import { Modal } from './Modal/Modal';

class App extends Component {
  state = {
    cards: [],
    query: '',
    page: 1,
    perPage: 12,
    isLoading: false,
    error: false,
    isShownBtn: false,
    showModal: false,
  };
  modalUrl = null;
  addCards = async () => {
    try {
      const { page, perPage, query } = this.state;
      const { hits, totalHits } = await FetchedCards(query, page, perPage);
      return { hits, totalHits };
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  };

  hideBtn = (hits, totalHits) => {
    const totalPages = Math.floor(totalHits / hits.length);
    if (this.state.page === totalPages) {
      this.setState({ isShownBtn: false });
    }
  };
  isArrayEmpty = arr => {
    if (!arr.length) {
      Notiflix.Notify.info(
        `Sorry, we do not have any photos with mention ${this.state.query}`
      );

      this.setState({ isShownBtn: false });
      return;
    }
  };
  handleSubmit = async data => {
    try {
      if (data.trim() === '') {
        Notiflix.Notify.info(`Please fill the field`);
        return;
      }
      await this.setState({ query: data, cards: [], page: 1, isLoading: true });
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }

    const { hits, totalHits } = await this.addCards();

    this.setState({ cards: [...hits], isLoading: false, isShownBtn: true });
    this.isArrayEmpty(hits);
    this.hideBtn(hits, totalHits);
  };
  loadMore = async () => {
    await this.setState(p => ({
      page: p.page + 1,
      isLoading: true,
    }));

    const { hits, totalHits } = await this.addCards();
    this.setState(p => ({ cards: [...p.cards, ...hits], isLoading: false }));
    this.hideBtn(hits, totalHits);
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  openModal = data => {
    this.modalUrl = data;
    this.toggleModal();
  };

  render() {
    const { cards, isLoading, isShownBtn, showModal } = this.state;
    return (
      <Box>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery>
          <ImageGalleryItem cards={cards} onClick={this.openModal} />
        </ImageGallery>
        {!isLoading && isShownBtn && (
          <Box display="flex" justifyContent="center" alignItems="center" p={5}>
            <LoadMoreBtn click={this.loadMore} />
          </Box>
        )}
        <Box display="flex" justifyContent="center" alignItems="center">
          {isLoading && (
            <LineWave
              color="black"
              height={110}
              width={610}
              ariaLabel="three-circles-rotating"
            />
          )}
          {showModal && (
            <Modal url={this.modalUrl} onClose={this.toggleModal} />
          )}
        </Box>
      </Box>
    );
  }
}
export default App;
