import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type Habit = {
    id: number,
    name: string,
    frequency: "daily" | "weekly",
    completedDates: string[],
    createdAt: string
}


type HabitState = {
    habits: Habit[],
    newData: number[]
    isLoading: boolean,
    error: string | null
}

const initialState: HabitState = {
    habits: [],
    newData: [],
    isLoading: false,
    error: null,

}

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
    await new Promise((resolve,) => setTimeout(resolve, 10000));

    const mockHabits: Habit[] = [
        {
            id: 1,
            name: "Read",
            frequency: "daily",
            completedDates: [],
            createdAt: new Date().toISOString()
        }
    ]
    return mockHabits;
})

const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        addHabit: (state, action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>) => {
            const newHabit: Habit = {
                id: new Date().getTime(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDates: [],
                createdAt: new Date().toISOString()
            }
            state.habits.push(newHabit);
        },

        toogleHabit: (state, action: PayloadAction<{ id: number; date: string }>) => {
            const habit = state.habits.find((habit) => habit.id === action.payload.id);
            if (habit) {
                const index = habit.completedDates.indexOf(action.payload.date);
                // debugger
                if (index !== -1) {
                    habit.completedDates.splice(index, 1);
                } else {
                    habit.completedDates.push(action.payload.date);
                }
            }
        },

        removeHabit: (state, action: PayloadAction<{ id: number }>) => {
            const index = state.habits.findIndex((habit) => habit.id === action.payload.id);
            if (index !== -1) {
                state.habits.splice(index, 1);
            }
        },

        addData: (state, action: PayloadAction<{ count: number }>) => {
            state.newData.push(action.payload.count);
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchHabits.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchHabits.fulfilled, (state, action) => {
            state.isLoading = false;
            state.habits = action.payload;
        }).addCase(fetchHabits.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch habits'
        })
    },
})


export const { addHabit, addData, toogleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer
