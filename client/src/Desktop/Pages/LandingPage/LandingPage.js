import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Slide = styled("div") ({
    background: "#fdeed4",
    width: "100vw",
    height: "calc(100vh - 71px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
})

export default function Landing () {
    return (
        <Slide>
            <Typography variant='h3'>Личное рассписание</Typography>
        </Slide>
    );
}