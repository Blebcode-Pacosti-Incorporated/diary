import { TextField, Typography, Divider, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
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

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = () => {
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#password').value;
        const confirm = document.querySelector('#confirm').value;
        if (password !== confirm)
            toast.error("Пароли не совпадают!")
        else {
            toast.success("Успешная регистрация")
            localStorage.setItem("login", login)
            localStorage.setItem("password", password)
            navigate('/editor')
        }
    }

    return (
    <div className="wrapper">
        <div className="form-wrapper">
            <center>
                <Typography variant="h5">Регистрация</Typography>
            </center>
            <Divider />
            <TextField id="login" variant="outlined" label="Логин"/>
            <TextField id="password" variant="outlined" label="Пароль"/>
            <TextField id="confirm" variant="outlined" label="Подтверждение пароля"/>
            <Button variant="contained" onClick={handleRegister}>Зарегестрироваться</Button>
            <Divider />
            <center>
                <Typography>
                    Уже зарегестрированны?
                     <Link 
                        onClick={()=>{navigate('/login')}}
                        sx={{"&:hover": {textDecoration: 'underline'}}}
                    >
                        Войти
                    </Link>
                </Typography>
            </center>
        </div>
    </div>
    );
}