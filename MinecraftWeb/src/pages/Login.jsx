const Login = () => (
    <div className="p-3 mt-3 dark-bg rounded d-flex justify-content-center">
        <form method="post">
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputUserName"/>
            <label htmlFor="floatingInputUserName">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingInputPassword"/>
            <label htmlFor="floatingInputPassword">Password</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingInputPIN"/>
            <label htmlFor="floatingInputPIN">PIN</label>
            </div>
            <input type="submit" value="Login" className="form-control btn btn-primary" />
        </form>
    </div>
)

export default Login