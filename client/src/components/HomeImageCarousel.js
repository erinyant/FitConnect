// import React from "react"; 
// import { useNavigate } from "react-router-dom";
// import Carousel from 'react-bootstrap/Carousel';
// import Image1 from "../assets/Image1.jpg";
// import Image2 from "../assets/Image2.jpg";
// import Image3 from "../assets/Image3.jpg";
// import Image4 from "../assets/Image4.jpg";


// function HomeImageCarousel() {
    
//     const navigate = useNavigate();

//     function handleGetStarted() {
//         navigate("/signup")
//       }

//   return (
//     <div className="carousel-container">
//         <Carousel>
//             <Carousel.Item interval={3000}>
//                 <img
//                     className="carousel-image"
//                     src={Image1}
//                     alt="First slide"
//                 />
//             </Carousel.Item>
//             <Carousel.Item interval={3000}>
//                 <img
//                     className="carousel-image"
//                     src={Image2}
//                     alt="Second slide"
//                 />
//             </Carousel.Item>
//             <Carousel.Item interval={3000}>
//                 <img
//                     className="carousel-image"
//                     src={Image3}
//                     alt="Third slide"
//                 />
//             </Carousel.Item>
//             <Carousel.Item interval={3000}>
//                 <img
//                     className="carousel-image"
//                     src={Image4}
//                     alt="Fourth slide"
//                 />
//             </Carousel.Item>
//         </Carousel>
//         <div className="overlay">
//             <h1>
//                 Time to sweat
//             </h1>
//             <h4>
//                 FitConnect connects you to fitness opportunities near you.
//             </h4>
//             <button className="button" onClick={handleGetStarted}>Get Started</button>
//         </div>
//     </div>
//   );
// }

// export default HomeImageCarousel;