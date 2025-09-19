import NavbarAdmin from "../components_admin/NavbarAdmin"

const ChangePassword = () => (
    <div className="mt-3 p-4 card-default danger-card">
        <NavbarAdmin />
        <div className="p-2 d-flex justify-content-center">
            <div>
            <h2>Change Password</h2>
                <form>
                    <input className="form-control dark-input shadow" placeholder="Old Password"/>
                    <input className="form-control dark-input shadow mt-3" placeholder="New Password"/>
                    <input className="form-control dark-input shadow mt-3" placeholder="New Password again"/>
                    <input className="form-control dark-input shadow mt-3" placeholder="PIN"/>
                    <input type="submit" value="Change Password" className="form-control btn btn-success shadow mt-3" />
                </form>
            </div>
        </div>
    </div>
)

export default ChangePassword