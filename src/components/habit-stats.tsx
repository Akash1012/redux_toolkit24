import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchHabits } from "../store/habit-slice";
import { LinearProgress, Paper, Typography } from "@mui/material";

const HabitStats: React.FC = () => {
  const habits_ = useSelector((state: RootState) => state.habits);

  const { habits, isLoading, error } = habits_;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.reduce((acc, habit) => {
      return habit.completedDates.includes(today) ? acc + 1 : acc;
    }, 0);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>
      <Typography variant="body1">Total Habits:{habits.length}</Typography>
      <Typography variant="body1">
        Completed Today:{getCompletedToday()}
      </Typography>
    </Paper>
  );
};

export default HabitStats;
