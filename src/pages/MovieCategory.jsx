// 인기영화, 현재 상영중 영화, 개봉예정 영화
import '../styles/common.css';
import { Wrap, Main } from '../styles/StyledComponent';
import Menu from '../components/slices/Menu';
import Footer from '../components/slices/Footer';

function MovieCategory() {
   return (
      <Wrap>
         <Menu />
         <Main $padding="30px 0">MovieCategory 페이지</Main>
         <Footer />
      </Wrap>
   );
}

export default MovieCategory;
