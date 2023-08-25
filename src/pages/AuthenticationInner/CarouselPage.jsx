import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col } from "reactstrap";
import logoLightPng from "../../assets/images/logo-light.png";
const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={9} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <div className=" ">
          <div className="w-100">
            <img src={logoLightPng} alt='' />
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
