const AboutData = ({data}) => (
    <div>
        <h1>About</h1>
        <ReactMarkdown>{data.text}</ReactMarkdown>
    </div>)

export default AboutData