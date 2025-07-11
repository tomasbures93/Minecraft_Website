import ReactMarkdown from 'react-markdown';
import NoData from "./NoData";

const ChangeLogData = ({inhalt}) => {
    if(inhalt.length == 0) return <NoData />
    return (
    inhalt.map(object => (
    <div key={object.id}>
        <h1>{object.datum}</h1>
        <ReactMarkdown>{object.text}</ReactMarkdown>
    </div>)
))
}

export default ChangeLogData;