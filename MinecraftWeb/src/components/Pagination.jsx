const Pagination = ({page, pagination, handlePage}) => (
    <div className="mt-3 d-flex justify-content-center">
        <ul className="pagination shadow">
            {Array.from({ length: pagination.pagesTotal }, (_, i) => i + 1).map((page) => (
                <li key={page} className="page-item">
                    <button className="page-link text-white darker-bg" type="button" onClick={() => handlePage(page)}>{page}</button>
                </li>))}
        </ul>
    </div>
)

export default Pagination;