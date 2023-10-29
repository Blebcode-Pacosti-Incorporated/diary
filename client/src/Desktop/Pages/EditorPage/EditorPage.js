import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';

const WeekWrapper = styled("div") ({
  paddingTop: '20px'
});

const MainPage = () => {
  const navigate = useNavigate();
  const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

  const [weekData, setWeekData] = useState({
    Понедельник: [{ id: 0, time: { h1: 0, m1: 0, h2: 0, m2: 0 }, event: "", task: "" }],
    Вторник: [{ id: 0, time: { h1: 0, m1: 0, h2: 0, m2: 0 }, event: "", task: "" }],
    Среда: [{ id: 0, time: { h1: 0, m1: 0, h2: 0, m2: 0 }, event: "", task: "" }],
    Четверг: [{ id: 0, time: { h1: 0, m1: 0, h2: 0, m2: 0 }, event: "", task: "" }],
    Пятница: [{ id: 0, time: { h1: 0, m1: 0, h2: 0, m2: 0 }, event: "", task: "" }],
    Суббота: [{ id: 0, time: { h1: 0, m1: 0, h2: 0, m2: 0 }, event: "", task: "" }],
    Воскресенье: [{ id: 0, time: { h1: 0, m1: 0, h2: 0, m2: 0 }, event: "", task: "" }],
  });

  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      navigate('/login');
      toast.error("Вы должны быть авторизованы для просмотра данной страницы!");
    }
  }, [navigate]);

  const addRow = (day) => {
    const newId = weekData[day][weekData[day].length - 1].id + 1;
    const newRow = { id: newId, time: { h1: 0, m1: 0, h2: 0, m2: 0 }, event: "", task: "" };
    setWeekData(prevState => ({
      ...prevState,
      [day]: [...prevState[day], newRow],
    }));
  };

  const handleInputChange = (day, rowIndex, field, value) => {
    setWeekData(prevState => {
      const updatedData = [...prevState[day]];
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        [field]: value,
      };
      return {
        ...prevState,
        [day]: updatedData,
      };
    });
  };

  const saveData = () => {
    console.log(weekData)
    localStorage.setItem("Понедельник", JSON.stringify(weekData["Понедельник"]))
    localStorage.setItem("Вторник", JSON.stringify(weekData["Вторник"]))
    localStorage.setItem("Среда", JSON.stringify(weekData["Среда"]))
    localStorage.setItem("Четверг", JSON.stringify(weekData["Четверг"]))
    localStorage.setItem("Пятница", JSON.stringify(weekData["Пятница"]))
    localStorage.setItem("Суббота", JSON.stringify(weekData["Суббота"]))
    localStorage.setItem("Воскресенье", JSON.stringify(weekData["Воскресенье"]))
    toast.success("Значения сохранены!")
    toast.info("Перейдите на /week")
  };

  return (
    <WeekWrapper>
      {days.map(day => (
        <div key={day}>
          <h6 style={{ marginLeft: '50px' }}>{day}</h6>
          <TableContainer component={Paper} sx={{ width: '60vw', margin: '10px 50px 20px 20px' }}>
            <Table sx={{ width: '60vw' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell>Время</TableCell>
                  <TableCell>Событие</TableCell>
                  <TableCell>Задание</TableCell>
                </TableRow>
              </TableHead>
              <TableBody id={`body_${day}`}>
                {weekData[day].map((data, rowIndex) => (
                  <TableRow key={day + (data.id + 1) || 1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {data.id || "-"}
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ width: '250px', display: 'flex' }}>
                      <TextField
                        
                        variant="outlined"
                        label="HH-1"
                        value={data.time.h1}
                        onChange={(event) => handleInputChange(day, rowIndex, 'time', { ...data.time, h1: event.target.value })}
                      />
                      <TextField
                        variant="outlined"
                        label="MM-1"
                        value={data.time.m1}
                        onChange={(event) => handleInputChange(day, rowIndex, 'time', { ...data.time, m1: event.target.value })}
                      />
                      <TextField
                        variant="outlined"
                        label="HH-2"
                        value={data.time.h2}
                        onChange={(event) => handleInputChange(day, rowIndex, 'time', { ...data.time, h2: event.target.value })}
                      />
                      <TextField
                        variant="outlined"
                        label="MM-2"
                        value={data.time.m2}
                        onChange={(event) => handleInputChange(day, rowIndex, 'time', { ...data.time, m2: event.target.value })}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        variant="outlined"
                        label="Событие"
                        value={data.event}
                        onChange={(event) => handleInputChange(day, rowIndex, 'event', event.target.value)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        variant="outlined"
                        label="Задание"
                        value={data.task}
                        onChange={(event) => handleInputChange(day, rowIndex, 'task', event.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Button onClick={() => addRow(day)} variant="contained" color="primary">
                      Добавить строку
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
      <Button onClick={saveData} variant="contained" color="primary">
        Сохранить
      </Button>
    </WeekWrapper>
  );
};

export default MainPage;
