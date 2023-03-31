
function User(props) {
    return (
        <div className="user">
            <img src={props.src} alt={props.name} />
            <p>{props.name}</p>
            {/* <p>{props.email}</p> */}
        </div>
    );
}

export default User;
