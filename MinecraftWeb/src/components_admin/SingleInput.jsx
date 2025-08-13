const SingleInput = ({labelText, placeholder, idName, value, handleChange}) => {
    return (
    <div className="mt-2">
        <label htmlFor={idName} className="form-label">{labelText}</label> 
        <input type="text" name={idName} id={idName} className="form-control dark-input shadow" placeholder={placeholder} value={value} onChange={handleChange}/>
    </div>)
}

export default SingleInput;