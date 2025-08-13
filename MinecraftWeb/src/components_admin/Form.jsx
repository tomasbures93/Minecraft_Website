import ButtonNormal from "./ButtonNormal"
import ButtonSubmit from "./ButtonSubmit"
import ButtonLoading from "./ButtonLoading"
import Preview from "./Preview"
import ErrorForm from "./ErrorForm"
import TextArea from "./TextArea"

const Form = ({handleSubmit, handleChange, formData, formError, preview, update, handlePreview, textSubmit, textLoading}) => {
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" id="title" onChange={handleChange} className="form-control dark-input shadow mt-2" value={formData.title} name="title" placeholder="Title"/>
                {formError.title && <ErrorForm text={formError.title} />}
                <TextArea handleChange={handleChange} value={formData.text}/>
                {formError.text && <ErrorForm text={formError.text} />}
                {preview && <Preview text={formData.text} /> }
                {update ?
                <ButtonLoading text={textLoading} />
                :
                <ButtonSubmit text={textSubmit} />}    
                <ButtonNormal text="Preview" style="mt-3 ms-2 btn btn-secondary shadow" onClick={handlePreview}/>                   
            </form>    
        </>
    )
}

export default Form