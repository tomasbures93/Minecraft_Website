import NoData from './NoData'

const HomePageData = ({data}) => {
    if(data.length === 0) return <NoData />

    return (
    <div >
        {data.map(item => 
        <div className="p-3 mt-3 card-default article-card" key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <div className='opacity-50 d-flex justify-content-end me-2'>
                <span className='darker-text'>{item.datum}</span>
            </div>
        </div>
        )}   
    
    </div>
    )
}

export default HomePageData