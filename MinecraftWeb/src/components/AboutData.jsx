import ReactMarkdown from 'react-markdown';

const AboutData = ({data}) => (
    <div>
        <ReactMarkdown>{data.text}</ReactMarkdown>
    </div>)

export default AboutData