import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PointSliceType } from './interface';
import { API } from 'utils/API';

const initialState: PointSliceType = {
  points: 0
};
export const fetchPointData = createAsyncThunk(
  'websocket/fetchData',
  async (_, { dispatch }) => {
    const [data] = await getPoints()
    dispatch(setPoints(Number(data.item.totalPoints)))
  }
);
const getPoints = () => {
  return new API({
    url: `attendance`
  }).get();
};
const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {

    setPoints: (state, action: PayloadAction<number>) => {
      state.points = action.payload;
    },
  },
});

export const { setPoints } = pointsSlice.actions;

export default pointsSlice.reducer;
