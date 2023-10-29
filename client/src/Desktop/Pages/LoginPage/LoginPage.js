import { TextField, Typography, Divider, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import './lp.css';
import { toast } from "react-toastify";


const Link = styled("span") ({
    color: "cornflowerblue",
    margin: '0 0.25em',
    cursor: 'pointer',
    userSelect: 'none',
    ":hover": {
        textDecoration: 'underline'
    }
})

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#password').value;
        if (
            login === localStorage.getItem("login") &&
            password === localStorage.getItem("password")
        ) {
            localStorage.setItem("auth", "true")
            toast.success("успешный вход!")
            navigate("/editor")
        } else {
            localStorage.setItem("auth", "false")
            toast.error("Логин или пароль неверные !")
        }
    }

    return (
    <div className="wrapper">
        <div className="form-wrapper">
            <center>
                <Typography variant="h5">Авторизация</Typography>
            </center>
            <Divider />
            <TextField id="login" variant="outlined" label="Логин"/>
            <TextField id="password" variant="outlined" label="Пароль"/>
            <Button variant="contained" onClick={handleLogin}>Войти</Button>
            <Divider />
            <center>
                <Typography>
                    Еще нет аккаунта? 
                     <Link 
                            onClick={()=>{navigate('/register')}}
                            sx={{"&:hover": {textDecoration: 'underline'}}}
                        >
                        Зарегестрируйтесь
                    </Link>
                </Typography>
            </center>
        </div>
    </div>
    );
}