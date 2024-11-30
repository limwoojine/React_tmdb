import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchMovie, getMovieDetails } from '../../api/tmdbApi';
// 영화 검색
/*
createAsyncThunk의 async 함수에서 매개변수로 2개 이상의 값을 받으려면 객체 혹은 배열로 전달한다.
*/
export const fetchSearchResults = createAsyncThunk('movies/fetchSearchResults', async ({ query, page }) => {
   const response = await searchMovie(query, page);
   return response.data.results;
});

export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (movieId) => {
   const response = await getMovieDetails(movieId);
   return response.data;
});

const moviesSlice = createSlice({
   name: 'movies',
   initialState: {
      loading: false,
      error: null,
      searchResults: [], // 검색한 영화 목록(받아오는 값이 배열일 때 초기 state를 빈 배열로 준다.)
      moiveDetails: null, // 영화 상세 정보(json 객체는 초기 state를 null로)
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchSearchResults.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.loading = false;

            // 페이지가 1페이지 일때(맨 처음 검색 했을 때)
            if (action.meta.arg.page === 1) {
               state.searchResults = action.payload;
            } else {
               // 페이지가 2이상일 때는 기존 데이터 + 새로운 데이터로 state 업데이트
               state.searchResults = [...state.searchResults, ...action.payload];
            }
         })
         .addCase(fetchSearchResults.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(fetchMovieDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.moiveDetails = action.payload;
         })
         .addCase(fetchMovieDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         });
   },
});

export default moviesSlice.reducer;
