import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutTimer = () => {
    const [time, setTime] = useState({minutes: 59, seconds: 59});
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const expirationDate = sessionStorage.getItem("serverAdminTokenExp");
            const currentDate = new Date();
            const rest = expirationDate - currentDate;

            let minutes = Math.floor(rest / ( 1000 * 60 ));
            let seconds = Math.floor((rest % ( 1000 * 60 )) / 1000);

            if(minutes <= 0 && seconds <= 0){
                console.log("logout now");
                clearInterval(interval);
                navigate("/Logout");
                return;
            }

            seconds = seconds < 10 ? "0" + seconds : seconds;
            minutes = minutes < 10 ? "0" + minutes : minutes;

            setTime({minutes, seconds})
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (<>
        {time.minutes}:{time.seconds}
    </>)
}

export default LogoutTimer;