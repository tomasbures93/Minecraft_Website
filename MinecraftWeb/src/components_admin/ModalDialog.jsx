const ModalDialog = ({handleDelete, id, text}) => {
    return (
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog card-default danger-card">
    <div className="modal-content">
      <div className="modal-header darker-bg text-white">
        <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body dark-bg text-white">
        Do you really want to detele that {text} ?
      </div>
      <div className="modal-footer darker-bg">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
        <button type="button" onClick={() => handleDelete(id)}  className="btn btn-primary" data-bs-dismiss="modal">Yes</button>
      </div>
    </div>
  </div>
</div>
    )
}

export default ModalDialog