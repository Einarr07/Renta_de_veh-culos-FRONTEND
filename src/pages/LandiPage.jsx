import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
      <body className="main-layout">
        <header>
         <div class="header">
            <div class="container">
               <div class="row">
                  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                     <div class="full">
                        <div class="center-desk">
                           <div class="logo">
                              <a href="index.html"><img src="./src/assets/images/logo.png" alt="#" /></a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                     <nav class="navigation navbar navbar-expand-md navbar-dark ">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarsExample04">
                           <ul class="navbar-nav mr-auto">
                              <li class="nav-item">
                                 <a class="nav-link" href="index.html">Página principal</a>
                              </li>
                              <li class="nav-item">
                                 <a class="nav-link" href="#nosotros">¿Por qué nosotros?</a>
                              </li>
                              <li class="nav-item">
                                 <a class="nav-link" href="#proyectos">Otros proyectos</a>
                              </li>
                              <li class="sign_btn">
                                <Link to="/login" href="#">Iniciar sesión</Link>
                              </li>
                           </ul>
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      </header>
      <section class="banner_main">
         <div class="container">
            <div class="row d_flex">
               <div class="col-md-12">
                  <div class="text-bg">
                     <h1>Encuentra o renta el mejor vehículo</h1>
                     <strong>La mejor decisión la tienes tu</strong>
                     <span>CarGod operando desde 2023</span>
                     <p>
                        Explora nuevos horizontes con nuestra oferta de renta de vehículos. 
                        En nuestra plataforma, encontrarás una amplia selección de coches para 
                        adaptarse a cualquier aventura que tengas en mente. Desde autos compactos
                        ideales para la ciudad hasta SUVs espaciosos para viajes en familia, 
                        te ofrecemos la llave para la libertad de movimiento. Con opciones de alquiler flexibles,
                        tarifas competitivas y un proceso de reserva sin complicaciones, planificar tu 
                        próximo viaje nunca ha sido tan sencillo. Ya sea que estés planeando un escape de fin 
                        de semana o un viaje de negocios, estamos aquí para hacer que tu experiencia de alquiler 
                        sea cómoda, confiable y emocionante. Descubre la facilidad de recorrer nuevos caminos con nosotros. 
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <div  class="car">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2>Variedad de vehículos</h2>
                     <span>Explora nuestra amplia gama de vehículos para encontrar la opción perfecta que se adapte a tu estilo y necesidades.</span>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-md-4 padding_leri">
                  <div class="car_box">
                     <figure><img src="./src/assets/images/car_img1.png" alt="#"/></figure>
                     <h3>Hyundai</h3>
                  </div>
               </div>
               <div class="col-md-4 padding_leri">
                  <div class="car_box">
                     <figure><img src="./src/assets/images/car_img2.png" alt="#"/></figure>
                     <h3>Audi</h3>
                  </div>
               </div>
               <div class="col-md-4 padding_leri">
                  <div class="car_box">
                     <figure><img src="./src/assets/images/car_img3.png" alt="#"/></figure>
                     <h3>Bmw x5</h3>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="choose ">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2 id="nosotros">¿Por qué nosotros?</h2>
                     <span>
                        Somos una empresa comprometida en proporcionar a nuestros clientes una experiencia de conducción excepcional.
                        Con una amplia flota de vehículos que se adaptan a diversas necesidades, ofrecemos la libertad 
                        de elegir el compañero de viaje perfecto. 
                     </span>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-md-12">
                  <div class="choose_box">
                     <span>01</span>
                     <p>
                        <strong>Variedad de Opciones:</strong> Nuestra extensa flota abarca desde autos compactos hasta opciones más amplias, 
                        brindándote la flexibilidad para elegir el vehículo que mejor se ajuste a tus preferencias y necesidades específicas
                     </p>
                  </div>
               </div>
               <div class="col-md-12">
                  <div class="choose_box">
                     <span>02</span>
                     <p>
                        <strong>Tarifas Competitivas:</strong>Ofrecemos tarifas competitivas y transparentes, sin costos ocultos ni sorpresas desagradables. 
                        Creemos en la honestidad y la simplicidad en nuestros precios para que planificar tu viaje sea sencillo y sin complicaciones.
                     </p>
                  </div>
               </div>
               <div class="col-md-12">
                  <div class="choose_box">
                     <span>03</span>
                     <p>
                        <strong>Proceso de Reserva Sencillo:</strong>Hacemos que la reserva de tu vehículo sea fácil y rápida. Con nuestro proceso de reserva intuitivo, 
                        puedes planificar tu viaje en cuestión de minutos, permitiéndote concentrarte en disfrutar de la carretera sin preocupaciones.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="cutomer">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2>Desarrolladores del proyecto</h2>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-md-12">
                  <div id="myCarousel" class="carousel slide cutomer_Carousel " data-ride="carousel" data-interval="5000">
                     <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                     </ol>
                     <div class="carousel-inner">
                        <div class="carousel-item active">
                           <div class="container">
                              <div class="carousel-caption ">
                                 <div class="desarrolladores">
                                    <figure><img src="./src/assets/images/foto_mateo.jpg" alt="#"/></figure>
                                 </div>
                                 <div class="our cross_layout">
                                    <div class="test_box">
                                       <h4>Mateo Congo</h4>
                                       <span>FrontEnd</span>
                                       <p>
                                          Estudiante de la carrera de Desarrollo de Software en la Escuela Politécnica Nacional
                                       </p>
                                       <i><img src="./src/assets/images/te1.png" alt="#"/></i>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="carousel-item">
                           <div class="container">
                              <div class="carousel-caption">
                                 <div class="desarrolladores">
                                    <figure><img src="./src/assets/images/foto_Andy.jpeg" alt="#"/></figure>
                                 </div>
                                 <div class="our cross_layout">
                                    <div class="test_box">
                                       <h4>Andy Loor</h4>
                                       <span>BackEnd</span>
                                       <p>
                                          Estudiante de la carrera de Desarrollo de Software en la Escuela Politécnica Nacional
                                       </p>
                                       <i><img src="./src/assets/images/te1.png" alt="#"/></i>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        
                     </div>
                     <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span class="sr-only">Previous</span>
                     </a>
                     <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
                     <span class="sr-only">Next</span>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <footer>
         <div class="footer">
            <div class="container">
               <div class="row">
                  <div class="col-md-12">
                     <div class="cont_call">
                        <h3 id="proyectos"> 
                           <strong class="multi color_chang">
                              Revisa otros proyectos
                           </strong><br/>
                           <a href="https://github.com/Einarr07" target="_blank">
                              GitHub Mateo
                           </a><br/>
                           <a href="https://github.com/Andineitor" target="_blank">
                              GitHub Andy
                           </a>
                        </h3>
                     </div>
                  </div>
               </div>
            </div>
            <div class="copyright">
               <div class="container">
                  <div class="row">
                     <div class="col-md-12">
                        <p>Trabajo de integración curricular</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
      </body>
  );
};
