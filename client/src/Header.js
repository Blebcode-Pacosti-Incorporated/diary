import { Button } from '@mui/material';
import styled from '@emotion/styled';
import logo from './logo.png'
import { useNavigate } from 'react-router-dom';

const Head = styled("div") ({
    maxWidth: '100vw',
    height: '70px',
    background: '#000000',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 3em',
    borderBottom: '2px solid #BEBEBE'
})
const LogoImg = styled("img") ({
    height: "70px",
    cursor: "pointer"
})
const ButtonWrapper = styled("div") ({
    display: 'grid',
    gap: "15px",
    gridTemplateColumns: '1fr 1fr'
})

export default function Header () {
    const navigate = useNavigate();
    return (
        <Head>
            <LogoImg src={logo} onClick={()=>{navigate('/week')}} />
            <ButtonWrapper>
                {
                    localStorage.getItem('auth') === "true" ?
                    <Button variant="outlined" onClick={()=>{localStorage.setItem('auth', ''); navigate('/login')}}> Выйти </Button>
                    :
                    <>
                        <Button variant="outlined" onClick={()=>{navigate('/login')}}> Sign in </Button>
                        <Button variant="contained" onClick={()=>{navigate('/register')}}> Sign up </Button>
                    </>
                }
                
            </ButtonWrapper>
        </Head>
    )
}