import ReactMarkdown from 'react-markdown';
import NoData from "./NoData";
import { Calendar } from 'phosphor-react';

const ChangeLogData = ({inhalt}) => {
    if(inhalt.length == 0) return <NoData />
    return (
    <div className="p-3 mt-3 card-default warning-card ">
        <h2>Changelog</h2>
        {inhalt.map(object => (
        <div key={object.id} className='pt-3'>
            <h5><Calendar size={20}/>  {object.datum}</h5>
            <hr />
            <ReactMarkdown>{object.text}</ReactMarkdown>
        </div>))}
    </div>)
}

export default ChangeLogData;