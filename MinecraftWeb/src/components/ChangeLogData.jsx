import ReactMarkdown from 'react-markdown';
import NoData from "./NoData";

const ChangeLogData = ({inhalt}) => {
    if(inhalt.length == 0) return <NoData />
    return (
    <div className="p-3 mt-3 dark-bg rounded">
        <h1>Changelog</h1>
        {inhalt.map(object => (
        <div key={object.id} className='pt-3'>
            <h5>{object.datum}</h5>
            <hr />
            <ReactMarkdown>{object.text}</ReactMarkdown>
        </div>))}
    </div>)
}

export default ChangeLogData;