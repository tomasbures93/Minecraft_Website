import ReactMarkdown from 'react-markdown';

const Preview = ({text}) => {
    return (
            <div className="mt-3 p-4 dark-bg rounded warning-card shadow">
                <h2>Preview</h2>
                <hr />
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
    )
}

export default Preview