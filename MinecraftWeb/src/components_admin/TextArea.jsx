import { useRef } from "react";
import { TextBolder, TextHThree, TextItalic, TextHOne, TextHTwo, TextHFour, TextHFive, TextHSix, LinkSimple, Minus } from "phosphor-react"


const TextArea = ({handleChange, value}) => {
    const textAreaRef = useRef(null);

    const handleText = (e) => {
        e.preventDefault();

        const textArea = textAreaRef.current;
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const text = textArea.value.substring(start, end);
        const before = textArea.value.substring(0, start);
        const after = textArea.value.substring(end);

        const button = e.currentTarget;
        const formatType = button.getAttribute('data-format');

        let prefix = "";
        let postfix = "";

        switch(formatType){
            case 'bold':
                prefix = "**";
                postfix = "**";
                break;
            case 'italic':
                prefix = "*";
                postfix = "*";
                break;
            case 'link':
                prefix = "[Name](https://xxxx)";
                break;
            case 'h1':
                prefix = "# ";
                break;
            case 'h2':
                prefix = "## ";
                break;
            case 'h3':
                prefix = "### ";
                break;
            case 'h4':
                prefix = "#### ";
                break;
            case 'h5':
                prefix = "##### ";
                break;
            case 'h6':
                prefix = "###### ";
                break;
            case 'hr':
                prefix = "___";
                break;
            default:
                return;
        }

        const textToInsert = before + prefix + text + postfix + after;

        const syntheticEvent = {
            target: {
                name: 'text',
                value: textToInsert
            }
        };

        textArea.focus();

        handleChange(syntheticEvent);
    }

    return (
        <>
            <div className="mt-2">
                <button onClick={handleText} className="btn text-white border me-1 mb-1" data-format="bold"><TextBolder size={20} className="markDown"/></button>
                <button onClick={handleText} className="btn text-white border me-1 mb-1" data-format="italic"><TextItalic size={20} className="markDown"/></button>
                <button onClick={handleText} className="btn text-white border me-1 mb-1" data-format="link"><LinkSimple size={20} className="markDown"/></button>
                <button onClick={handleText} className="btn text-white border me-1 mb-1" data-format="h1"><TextHOne size={20} className="markDown"/></button>
                <button onClick={handleText} className="btn text-white border me-1 mb-1" data-format="h2"><TextHTwo size={20} className="markDown"/></button>
                <button onClick={handleText} className="btn text-white border me-1 mb-1" data-format="h3"><TextHThree size={20} className="markDown" /></button>
                <button onClick={handleText} className="btn text-white border me-1 mb-1" data-format="h4"><TextHFour size={20} className="markDown"/></button>
                <button onClick={handleText} className="btn text-white border me-1 mb-1" data-format="h5"><TextHFive size={20} className="markDown"/></button>
                <button onClick={handleText} className="btn text-white border me-1 mb-1" data-format="h6"><TextHSix size={20} className="markDown"/></button>
                <button onClick={handleText} className="btn text-white border me-1 mb-1" data-format="hr"><Minus size={20} className="markDown"/></button>
            </div>
            <textarea ref={textAreaRef} className="form-control dark-input shadow" rows="15" name="text" onChange={handleChange} value={value}></textarea>
        </>
    )
}

export default TextArea