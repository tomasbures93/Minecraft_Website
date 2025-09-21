const Pagination = ({pagination, handlePage}) => (
    <div className="mt-3 d-flex justify-content-center">
        <ul className="pagination shadow">
            {Array.from({ length: pagination.pagesTotal }, (_, i) => i + 1).map((pageNumber) => (
                <li key={pageNumber} className="page-item">
                    <button 
                        className={`page-link text-white darker-bg 
                            ${pageNumber === pagination.currentPage ? "active-mc" : ""}`}
                        type="button" 
                        onClick={() => handlePage(pageNumber)}>{pageNumber}</button>
                </li>))}
        </ul>
    </div>
)

export default Pagination;