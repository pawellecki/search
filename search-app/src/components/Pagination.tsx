import { FC, useEffect, useState } from 'react';

type Props = {
  isLoading: boolean;
  page: number;
  setPage: (index: number) => void;
  totalPages?: number;
};

export const Pagination: FC<Props> = ({ isLoading, page, totalPages, setPage }) => {
  const [tempTotalPages, setTempTotalpages] = useState(0);

  useEffect(() => {
    if (totalPages) {
      setTempTotalpages(totalPages);
    }
  }, [totalPages, setTempTotalpages]);

  if (tempTotalPages === 1 || !tempTotalPages || (!isLoading && totalPages === 0)) return null;

  const renderNumbersOfPages = Array.from({ length: tempTotalPages }, (_, i) => {
    const index = i + 1;

    return (
      <button
        key={index}
        className="button"
        disabled={isLoading || page === index}
        onClick={() => setPage(index)}
      >
        {index}
      </button>
    );
  });

  return (
    <div className="pagination">
      <button
        className="button"
        disabled={isLoading || page === 1}
        onClick={() => setPage(page - 1)}
      >
        PREV
      </button>
      <div className="paginationNumbers">{renderNumbersOfPages}</div>
      <button
        className="button"
        disabled={isLoading || page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        NEXT
      </button>
    </div>
  );
};
