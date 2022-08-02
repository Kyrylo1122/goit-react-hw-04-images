export const ImageGalleryItem = ({ cards, onClick }) => {
  return (
    <>
      {cards.map(data => (
        <li
          key={data.id}
          className="ImageGalleryItem"
          onClick={() => {
            onClick(data);
          }}
        >
          <img
            src={data.webformatURL}
            alt={data.user}
            className="ImageGalleryItem-image "
          />
        </li>
      ))}
    </>
  );
};
