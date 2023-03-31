import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"
import User from "./User";
import useLoadData from "./useLoadData";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Home() {
    const { currentUser } = useContext(AuthContext);

    const [pageno, setPageno] = React.useState(1);
    const { loading, data } = useLoadData(pageno);

    const observer = React.useRef();
    const ref = React.useCallback(e => {
        console.log(e);
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log("Visible");
                setPageno(prev => prev + 1);
            }
        });
        if (e) observer.current.observe(e);
    }, [loading]);

    return (
        <div className="homepage">
            <div className="container" >
                <h1>Contacts</h1>

                {data.map((user, index) => {
                    if (data.length === index + 1) {
                        return (
                            <div key={user.login.uuid} ref={ref}>
                                <User
                                    id={user.login.uuid}
                                    src={user.picture.thumbnail}
                                    name={user.name.first + " " + user.name.last}
                                    email={user.email}
                                />
                                <hr />
                            </div>
                        );
                    } else {
                        return (
                            <div key={user.login.uuid}>
                                <User
                                    id={user.login.uuid}
                                    src={user.picture.thumbnail}
                                    name={user.name.first + " " + user.name.last}
                                    email={user.email}
                                />
                                <hr />
                            </div>
                        );
                    }
                })}

                {loading &&
                    <img className="loading" src="https://em-content.zobj.net/source/microsoft-teams/337/hourglass-not-done_23f3.png" alt="Loading..." />
                }

            </div>
            <div className="navbar">
                <span>User: {currentUser.email}</span>
                <span className="logout" onClick={() => signOut(auth)}>Click here to logout</span>
            </div>
        </div>
    );
}

export default Home;

