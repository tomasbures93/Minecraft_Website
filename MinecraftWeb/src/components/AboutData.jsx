import ReactMarkdown from 'react-markdown';

const AboutData = ({data}) => (
    <div className="p-2 mt-3 card-default article-card">
        <div className='ms-2'>
            <h2 className='border-under'>About</h2>
            <ReactMarkdown>{data.text}</ReactMarkdown>
        </div>
    </div>)

export default AboutData