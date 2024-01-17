import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Importación de imágenes
import logoImage from '../assets/images/logo.png';
import car1Image from '../assets/images/car_img1.png';
import car2Image from '../assets/images/car_img2.png';
import car3Image from '../assets/images/car_img3.png';
import mateoImage from '../assets/images/foto_mateo.jpg';
import andyImage from '../assets/images/foto_Andy.jpeg';
import comillasImage from '../assets/images/te1.png';

const CustomArrow = ({ onClick, label, className }) => (
   <button className={`custom-arrow ${className}`} onClick={onClick}>
     {label}
   </button>
 );
 
 const LandingPage = () => {
   const sliderRef = useRef(null);
 
   useEffect(() => {
     const interval = setInterval(() => {
       sliderRef.current.slickNext();
     }, 5000);
 
     return () => clearInterval(interval);
   }, []);
 
   const sliderSettings = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
     prevArrow: <CustomArrow label="Anterior" className="prev-arrow" />,
     nextArrow: <CustomArrow label="Siguiente" className="next-arrow" />,
   };

  return (
    <div className="main-layout">
      {/*Encabezado*/}
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="logo m-4">
            <Link to="/">
              <img src={logoImage} alt="logo de la empresa" className="w-16" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-300 text-dark text-base px-4 py-2 uppercase">
                  Página principal
                </Link>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-gray-300 text-dark text-base px-4 py-2 uppercase">
                  ¿Por qué nosotros?
                </a>
              </li>
              <li>
                <a href="#proyectos" className="hover:text-gray-300 text-dark text-base px-4 py-2 uppercase">
                  Otros proyectos
                </a>
              </li>
            </ul>
          </nav>
          <div className="sign_btn">
            <Link to="/login" className="text-white bg-blue-500 px-4 py-2 rounded mr-4">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </header>
      {/*Fin Encabezado*/}
      {/*Sección de la imagen principal*/}
      <section className="banner_main">
        <div className="container">
          <div className="row d_flex">
            <div className="col-md-12">
              <div className="text-bg">
                <h1>Encuentra o renta el mejor vehículo</h1>
                <strong>La mejor decisión la tienes tú</strong>
                <span>CarGod operando desde 2023</span>
                <p>
                  Explora nuevos horizontes con nuestra oferta de renta de vehículos. En nuestra plataforma, encontrarás una
                  amplia selección de coches para adaptarse a cualquier aventura que tengas en mente. Desde autos compactos
                  ideales para la ciudad hasta SUVs espaciosos para viajes en familia, te ofrecemos la llave para la libertad de
                  movimiento. Con opciones de alquiler flexibles, tarifas competitivas y un proceso de reserva sin complicaciones,
                  planificar tu próximo viaje nunca ha sido tan sencillo. Ya sea que estés planeando un escape de fin de semana o
                  un viaje de negocios, estamos aquí para hacer que tu experiencia de alquiler sea cómoda, confiable y emocionante.
                  Descubre la facilidad de recorrer nuevos caminos con nosotros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Fin Sección de la imagen principal*/}
      {/*Variedad de vehículos*/}
      <div className="car">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Variedad de vehículos</h2>
                <span>Explora nuestra amplia gama de vehículos para encontrar la opción perfecta que se adapte a tu estilo y necesidades.</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 padding_leri">
              <div className="car_box">
                <figure><img src={car1Image} alt="#"/></figure>
                <h3>Hyundai</h3>
              </div>
            </div>
            <div className="col-md-4 padding_leri">
              <div className="car_box">
                <figure><img src={car2Image} alt="#"/></figure>
                <h3>Audi</h3>
              </div>
            </div>
            <div className="col-md-4 padding_leri">
              <div className="car_box">
                <figure><img src={car3Image} alt="#"/></figure>
                <h3>Bmw x5</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fin Variedad de vehículos*/}
      {/*¿Por qué nosotros?*/}
      <div className="choose ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 id="nosotros">¿Por qué nosotros?</h2>
                <span>
                  Somos una empresa comprometida en proporcionar a nuestros clientes una experiencia de conducción excepcional. Con una
                  amplia flota de vehículos que se adaptan a diversas necesidades, ofrecemos la libertad de elegir el compañero de viaje
                  perfecto.
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="choose_box">
                <span>01</span>
                <p>
                  <strong>Variedad de Opciones:</strong> Nuestra extensa flota abarca desde autos compactos hasta opciones más amplias,
                  brindándote la flexibilidad para elegir el vehículo que mejor se ajuste a tus preferencias y necesidades específicas
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="choose_box">
                <span>02</span>
                <p>
                  <strong>Tarifas Competitivas:</strong> Ofrecemos tarifas competitivas y transparentes, sin costos ocultos ni sorpresas
                  desagradables. Creemos en la honestidad y la simplicidad en nuestros precios para que planificar tu viaje sea sencillo y
                  sin complicaciones.
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="choose_box">
                <span>03</span>
                <p>
                  <strong>Proceso de Reserva Sencillo:</strong> Hacemos que la reserva de tu vehículo sea fácil y rápida. Con nuestro proceso
                  de reserva intuitivo, puedes planificar tu viaje en cuestión de minutos, permitiéndote concentrarte en disfrutar de la
                  carretera sin preocupaciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fin ¿Por qué nosotros?*/}
      {/*Desarrolladores del proyecto*/}
      <div className="cutomer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Desarrolladores del proyecto</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div id="myCarousel" className="carousel slide cutomer_Carousel" data-ride="carousel" data-interval="5000">
                <Slider {...sliderSettings} ref={sliderRef}>
                  <div className="carousel-item text-center">
                    <div className="container">
                      <div className="carousel-caption">
                        <div className="desarrolladores flex items-center justify-center">
                          <figure><img src={mateoImage} alt="#"/></figure>
                        </div>
                        <div className="our cross_layout mx-auto">
                          <div className="test_box">
                            <h4>Mateo Congo</h4>
                            <span>Frontend</span>
                            <p>
                              Estudiante de la carrera de Desarrollo de Software en la Escuela Politécnica Nacional
                            </p>
                            <i className="flex items-center justify-center"><img src={comillasImage} alt="#"/></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item text-center">
                    <div className="container">
                      <div className="carousel-caption">
                        <div className="desarrolladores flex items-center justify-center">
                          <figure><img src={andyImage} alt="#"/></figure>
                        </div>
                        <div className="our cross_layout mx-auto">
                          <div className="test_box">
                            <h4>Andy Loor</h4>
                            <span>Backend</span>
                            <p>
                              Estudiante de la carrera de Desarrollo de Software en la Escuela Politécnica Nacional
                            </p>
                            <i className="flex items-center justify-center"><img src={comillasImage} alt="#"/></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fin Desarrolladores del proyecto*/}
      {/*Pie de página*/}
      <footer>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="cont_call">
                  <h3 id="proyectos">
                    <strong className="multi color_chang">Revisa otros proyectos</strong>
                    <br />
                    <a href="https://github.com/Einarr07" target="_blank">
                      GitHub Mateo
                    </a>
                    <br />
                    <a href="https://github.com/Andineitor" target="_blank">
                      GitHub Andy
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <p>Trabajo de integración curricular</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Fin Pie de página*/}
    </div>
  );
};

export default LandingPage;