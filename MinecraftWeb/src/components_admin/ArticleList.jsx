import { Pencil, Trash } from "phosphor-react"

const ArticleList = ({data, handleEdit, handleDelete}) => {
    return (
        <>
            {data.map(item => 
                <div className="row" key={item.id}>
                    <div className="col-sm mb-1">
                        <strong>{item.title}</strong> {item.datum && <span>- {item.datum}</span>}
                    </div>
                    <div className="col-sm text-end">
                        <button className="none" onClick={() => handleEdit(item.id)}><Pencil size={20} /></button>
                        <button className="none" onClick={() => handleDelete(item.id)}><Trash size={20} /></button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ArticleList