import ReactMarkdown from 'react-markdown';

const RulesData = ({data}) => (
    <div className="p-2 mt-3 card-default article-card">
        <div className='ms-2'>
            <h2>Server Rules</h2>
            <hr />
            <ReactMarkdown>{data.text}</ReactMarkdown>
        </div>
    </div>
)

export default RulesData