// 영화 상세페이지
import '../styles/common.css';
import { Wrap } from '../styles/StyledComponent';
import Menu from '../components/slices/Menu';
import Footer from '../components/slices/Footer';
import Moivedetail from './MovieDetails';

function Detail() {
   return (
      <Wrap>
         <Menu />
         <Moivedetail />
         <Footer />
      </Wrap>
   );
}

export default Detail;
