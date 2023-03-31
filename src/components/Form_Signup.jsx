import React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Email } from '@material-ui/icons';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"
import { useNavigate } from 'react-router-dom';

function Form_Signup({ stateChanger }) {

    const [err, setErr] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        // const cpass = e.target[3].value;
        // console.log(name+email+pass);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (e) {
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
            <h1>Register</h1>
            {loading && <div className="loading" ><img src="https://em-content.zobj.net/source/microsoft-teams/337/hourglass-not-done_23f3.png" alt="Loading..." /></div>}
            <form onSubmit={handleSubmit}>
                <TextField id="name" label="Name" variant="standard" required type="text" />
                <TextField id="email" label="Email" variant="standard" required type="email" />

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

                {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" className='pass' required>
                    <InputLabel htmlFor="confirmation-password">Confirm Password</InputLabel>
                    <Input
                        id="confirmation-password"
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
                </FormControl> */}



                <button className="btn">Signup</button>
                {err && <p className="error">Something went wrong. Please try again.</p>}
            </form>
            <p className="createacc">Already have an account? <a onClick={() => stateChanger(true)}>Login</a></p>
        </div>
    );
}

export default Form_Signup;