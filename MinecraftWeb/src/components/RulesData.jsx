import ReactMarkdown from 'react-markdown';

const RulesData = ({data}) => (
    <div>
        <h1>Server Rules</h1>
        <ReactMarkdown>{data.text}</ReactMarkdown>
    </div>
)

export default RulesData