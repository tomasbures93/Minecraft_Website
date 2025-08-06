const ButtonNormal = ({text, onClick, style}) => (
    <button type="button" onClick={onClick} className={style}>
        {text}
    </button>
) 

export default ButtonNormal