import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';

import './mp.css'

const WeekWrapper = styled("div") ({
    paddingTop: '20px'
})

function get_bg (item, day) {
    const currentTime = new Date();
    const day_i = currentTime.getDay();
    console.log("day_today", ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"][day_i])
    console.log("day_from_arg", day)
    if (["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"][day_i] !== day)
        return "not_today"

    const time_by_min = currentTime.getHours() * 60 + currentTime.getMinutes();

    if (item.time === "-")
        return "disabled"
    
    const time_down =  item.time.h1 * 60 + item.time.m1;
    const time_up = item.time.h2 * 60 + item.time.m2;

    if (time_down <= time_by_min && time_by_min <= time_up)
        return `grad_${ parseInt((time_by_min - time_down) / (time_up - time_down ) * 100) }_per`

    return time_by_min > time_up ? "passed" : "not_started"
}

function time_to_str (time_dict) {
    if (time_dict === "-")
        return time_dict
    if (time_dict.m1 < 10)
        time_dict.m1 = `0${time_dict.m1}`;
    if (time_dict.m2 < 10)
        time_dict.m2 = `0${time_dict.m2}`;
    return `${time_dict.h1}:${time_dict.m1} - ${time_dict.h2}:${time_dict.m2}`;
}


export default function MainPage() {
    const navigate = useNavigate();
    const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    const get_day_data = (key) => { return JSON.parse(localStorage.getItem(key)) || [{ id: 0, time: "-", event: "-", task: "-" }] }

    useEffect(() => {
        if (localStorage.getItem('auth') !== 'true') {
            navigate('/login');
            toast.error("Вы должны быть авторизованы для просмотра данной страницы!")
        }
    }, [navigate]);

    return (
        <WeekWrapper>
            {days.map((day) => {
                return (
                    <>
                        <Typography variant='h6' sx={{ marginLeft: '50px' }}>{day}</Typography>
                        <TableContainer component={Paper} sx={{ width: "60vw", margin: "10px 50px 20px 20px" }}>
                            <Table sx={{ width: "60vw" }} aria-label="simple table" size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>№</TableCell>
                                        <TableCell>Время</TableCell>
                                        <TableCell>Событие</TableCell>
                                        <TableCell>Задание</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {get_day_data(day).map((data) => {
                                        return (
                                            <TableRow
                                                key={day+(data.id+1) || 1}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                className={get_bg(data, day)}
                                                >
                                                
                                                <TableCell component="th" scope="row">
                                                    {data.id || data.id === 0 ? data.id : "-"}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {time_to_str(data.time)}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {data.event}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {data.task}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )
            })}
        </WeekWrapper>
    );
}