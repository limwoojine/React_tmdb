import Grid from '@mui/material/Grid2';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../features/movies/moviesSlice';
import { useEffect } from 'react';

function Moivedetail() {
   const { movieId } = useParams();
   const dispatch = useDispatch();
   const { Moviedetails, loading, error } = useSelector((state) => state.movies);

   useEffect(() => {
      if (movieId) {
         dispatch(fetchMovieDetails(movieId));
      }
   }, [dispatch, movieId]);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;
   return (
      <Grid container spacing={2}>
         <Grid size={3}></Grid>
         <Grid size={9}>
            <h2 style={{ marginBottm: '10px' }}></h2>
            <h3 style={{ marginTop: '10px' }}>줄거리</h3>
            <h3 style={{ marginTop: '10px' }}>장르</h3>
            <h3 style={{ marginTop: '10px' }}>개봉일</h3>
            <h3 style={{ marginTop: '10px' }}>평점</h3>
            <p>
               <Rating name="read-only" value={3} readOnly />
            </p>
         </Grid>
      </Grid>
   );
}

export default Moivedetail;
