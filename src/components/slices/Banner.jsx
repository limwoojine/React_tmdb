import '../css/Banner.css';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Banner() {
   const [searchQuery, setSearchQuery] = useState('');
   const navigate = useNavigate();

   const handleInputChange = useCallback((event) => {
      setSearchQuery(event.target.value);
   }, []);

   const handleSearch = (event) => {
      event.preventDefault(); // 기본 submit 버튼의 성질 방지
      if (searchQuery.trim()) {
         // 공백 제거 함수
         // navigate(이동할 경로)
         navigate(`/search?query=${searchQuery}`); // 검색어를 query 파라미터로 전달
      }
   };

   return (
      <div style={{ width: '100%', height: '400px', backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(/images/banner.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
         <div className="search">
            <h1 className="header_msg">환영합니다! 수백만 개의 영화를 지금 살펴보세요.</h1>

            <form style={{ marginTop: '20px' }} className="search_form" onSubmit={handleSearch}>
               <TextField
                  sx={{ backgroundColor: 'white' }}
                  fullWidth
                  label="영화검색"
                  id="fullWidth"
                  value={searchQuery}
                  InputLabelProps={{
                     shrink: true, // 항상 라벨이 위쪽으로 위치
                     style: { fontSize: '16px' }, // 라벨의 크기를 조정
                  }}
                  onChange={handleInputChange}
               />

               <Button sx={{ width: 100, height: 56, backgroundColor: 'white' }} variant="outlined" startIcon={<SearchIcon />} type="submit">
                  검색
               </Button>
            </form>
         </div>
      </div>
   );
}

export default Banner;
