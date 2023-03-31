import React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

function Form_Login({ stateChanger }) {

    const [err, setErr] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (err) {
            setLoading(false);
            setErr(true);
        }
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
            navigate("/home");
        } catch (err) {
            setLoading(false);
            setErr(true);
        }
    };


    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="form">
            <h1>Welcome</h1>
            {loading && <div className="loading" ><img src="https://em-content.zobj.net/source/microsoft-teams/337/hourglass-not-done_23f3.png" alt="Loading..." /></div>}

            <form onSubmit={handleSubmit}>
                <TextField id="email" label="Email" variant="standard" required text="email" />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" className='pass' required  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <button className="btn">Login</button>
                {err && <p className="error">Something went wrong. Please try again.</p>}
            </form>

            <p>or</p>
            <button className="btn" onClick={handleGoogleLogin}>Sign In using Google</button>
            <p className="createacc">New User? <a onClick={() => stateChanger(false)}>Create Account</a></p>
        </div>
    );
}

export default Form_Login;