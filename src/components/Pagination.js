const Pagination = ({ cardsPerPage, totalCards, paginate, curretPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    if (i < curretPage + 3 && i > curretPage - 3) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          className="pagination__button"
          onClick={() => paginate(number)}
          key={number}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
