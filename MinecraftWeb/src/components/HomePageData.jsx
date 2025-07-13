import NoData from './NoData'

const HomePageData = ({data}) => {
    if(data.length === 0) return <NoData />

    return (
    <div >
        {data.map(item => 
        <div className="p-3 mt-3 dark-bg rounded" key={item.id}>
            <h1>{item.title}</h1>
            <hr />
            <p>{item.text}</p>
            <div className='opacity-50 d-flex justify-content-end me-2'>
                <span>{item.datum}</span>
            </div>
        </div>
        )}   
    
    </div>
    )
}

export default HomePageData