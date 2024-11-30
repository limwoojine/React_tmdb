// api request를 하는 소스코드

import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const AUTH_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGU4NTAzMzIzZjY1YTlmNmUwMjY4MzMwZWM4NTg5YSIsIm5iZiI6MTczMTcxOTMwMS41NTY5MTcsInN1YiI6IjY3MmYwZjU0MTc3MGIwMzUxZGUzNzJmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WYfXah0BXokn4ShroLxUPNs51hv3PrrBCSTqY_aqcRI';

const tmdbApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      accept: 'application/json', // response 데이터를 json 객체로 달라고 요청
      Authorization: `Bearer ${AUTH_KEY}`,
   },
});

const fetchFromApi = async (url, params = {}) => {
   try {
      const response = await tmdbApi.get(url, { params });
      return response;
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`);
      throw error;
   }
};

// API Call은 항상 비동기 함수를 사용해야 함. (비동기 = 순차적으로 실행하지 않는다는 뜻)
// API를 통해 영화목록을 가져오는 함수

//영화검색 API 호출
export const searchMovie = (query, page = 1) => {
   return fetchFromApi('/search/movie', {
      query, //검색어
      include_adult: false, //성인 콘텐츠 제외
      language: 'ko-KR',
      page,
      region: 'KR',
   });
};

export const getMovieDetails = async (movieId) => {
   const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
         language: 'ko-KR',
      },
   });
   return response;
};

export default tmdbApi;
