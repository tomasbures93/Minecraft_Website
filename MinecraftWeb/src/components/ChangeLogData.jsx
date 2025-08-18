import ReactMarkdown from 'react-markdown';
import NoData from "./NoData";
import { Calendar } from 'phosphor-react';
import { useState } from 'react';

const ChangeLogData = ({inhalt}) => {
    const [showId, setShow] = useState(false);

    const handleShow = (id) => {
        setShow(prev => prev === id? null : id);
    }

    if(inhalt.length == 0) return <NoData />
    
    return (
    <div className="p-3 mt-3 card-default warning-card ">
        <h2 className='border-under'>Changelog</h2>
        {inhalt.map(object => (
        <div key={object.id} className='pt-3'>
            <h5 onClick={() => handleShow(object.id)} className="show-cursor"><Calendar size={20}/>  {object.title}</h5>
            {showId === object.id &&
                <div><hr />
                <ReactMarkdown>{object.text}</ReactMarkdown>
                </div>
            }
        </div>))}
    </div>)
}

export default ChangeLogData;