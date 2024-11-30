// 검색결과
import '../styles/common.css';
import { Wrap, Main } from '../styles/StyledComponent';
import Menu from '../components/slices/Menu';
import Footer from '../components/slices/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../features/movies/moviesSlice';
import { useSearchParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import MovieCard from '../components/slices/Moviecard';

function SearchResults() {
   const [searchParams] = useSearchParams(); // query 파라미터 값 가져오기
   const query = searchParams.get('query');

   const dispatch = useDispatch();
   const { searchResults, loading, error } = useSelector((state) => state.movies);

   const [page, setPage] = useState(1);

   //검색어가 변경될 때마다 페이지 검색결과 초기화 및 새로운 검색 실행
   useEffect(() => {
      setPage(1); //페이지 초기화
      dispatch(fetchSearchResults({ query, page }));
   }, [query, dispatch]);

   //페이지가 변경될 때마다 새로운 결과 로딩
   useEffect(() => {
      // 페이지가 2페이지 이상일때만 실행
      if (page > 1) {
         dispatch(fetchSearchResults({ query, page }));
      }
   }, [page, dispatch, query]);

   //더보기 버튼 클릭시 페이지 증가
   const loadMore = useCallback(() => {
      setPage((prevPage) => prevPage + 1);
   }, []);

   if (loading && page === 1)
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>검색 중...</h2>
            </Main>
            <Footer />
         </Wrap>
      );

   if (error)
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>오류 발생: {error}</h2>
            </Main>
            <Footer />
         </Wrap>
      );

   return (
      <Wrap>
         <Menu />
         <Main $padding="30px 0">
            {searchResults.length > 0 ? (
               <>
                  <MovieCard movies={searchResults} />
                  <Button variant="outlined" sx={{ margin: '20px auto', display: 'block', width: '500px' }} onClick={loadMore}>
                     더보기
                  </Button>
               </>
            ) : (
               <h2>검색 결과가 없습니다.</h2>
            )}
         </Main>
         <Footer />
      </Wrap>
   );
}

export default SearchResults;
