import ReactMarkdown from 'react-markdown';

const AboutData = ({data}) => (
    <div className="p-2 mt-3 card-default article-card">
        <div className='ms-2'>
            <h2>About</h2>
            <hr />
            <ReactMarkdown>{data.text}</ReactMarkdown>
        </div>
    </div>)

export default AboutData