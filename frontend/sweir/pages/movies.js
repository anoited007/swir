import {Swiper, SwiperSlide} from "swiper/react";
import Layout from "../components/layout";
import MovieComponent from "../components/movies";
import 'swiper/swiper-bundle.min.css'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import {Card} from "react-bootstrap";

SwiperCore.use([Navigation, Pagination ]);

export default function Movies () {
    return(
     <Layout>
         <Swiper
             spaceBetween={50}
             slidesPerView={3}
             navigation
             pagination={{ clickable: true }}
             scrollbar={{ draggable: true }}
         >
             <MovieComponent />
         </Swiper>

         <Swiper
             spaceBetween={50}
             slidesPerView={3}
             navigation
             pagination={{ clickable: true }}
             scrollbar={{ draggable: true }}
             onSwiper={(swiper) => console.log(swiper)}
             onSlideChange={() => console.log('slide change')}
         >
             <SwiperSlide>
                 <Card>
                     <Card.Body>
                         <span> Slide 1</span>
                     </Card.Body>
                 </Card>
             </SwiperSlide>
             <SwiperSlide>Slide 2</SwiperSlide>
             <SwiperSlide>Slide 3</SwiperSlide>
             <SwiperSlide>Slide 4</SwiperSlide>
             <SwiperSlide>Slide 5</SwiperSlide>
             <SwiperSlide>Slide 6</SwiperSlide>
             ...
         </Swiper>
     </Layout>

    )

}