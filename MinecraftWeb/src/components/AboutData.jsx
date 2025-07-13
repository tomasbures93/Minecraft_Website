import ReactMarkdown from 'react-markdown';

const AboutData = ({data}) => (
    <div className="p-2 mt-3 dark-bg rounded">
        <div className='ms-2'>
            <h1>About</h1>
            <hr />
            <ReactMarkdown>{data.text}</ReactMarkdown>
        </div>
    </div>)

export default AboutData