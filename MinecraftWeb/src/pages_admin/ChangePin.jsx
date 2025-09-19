import NavbarAdmin from "../components_admin/NavbarAdmin";

const ChangePin = () => (
        <div className="mt-3 p-4 card-default danger-card">
        <NavbarAdmin />
        <div className="p-2 d-flex justify-content-center">
            <div>
            <h2>Change PIN</h2>
                <form>
                    <input className="form-control dark-input shadow" placeholder="Old PIN"/>
                    <input className="form-control dark-input shadow mt-3" placeholder="New PIN"/>
                    <input className="form-control dark-input shadow mt-3" placeholder="New PIN again"/>
                    <input className="form-control dark-input shadow mt-3" placeholder="Password"/>
                    <input type="submit" value="Change PIN" className="form-control btn btn-success shadow mt-3" />
                </form>
            </div>
        </div>
    </div>)

export default ChangePin