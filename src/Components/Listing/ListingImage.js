import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "./ListingImage.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
const ListingImage = ({ floorplan, length }) => {

  
  const [lgShow, setLgShow] = useState(false);
  const [source, setSource] = useState("");
  useEffect(() => {
    console.log(lgShow);
  });
//displays carousel in big screen if user click image
  return (
    <div>
      {(() => {
        if (lgShow) {
          return (
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                {" "}
                <div className="item">
                  <Image src={source} fluid />
                </div>
              </Modal.Body>
              <Modal.Body>
                {" "}
                <Modal.Title id="example-modal-sizes-title-sm">
                  <OwlCarousel
                    className="owl-theme"
                    id="owl-theme"
                    loop
                    margin={10}
                    nav
                  >
                    {floorplan.map((property, index) => (
                      <div className="item">
                        {index + 1}{" "}
                        <Figure>
                          <Figure.Image
                            alt="171x180"
                            src={`${property.Src[0]}`}
                            width={220}
                            height={220}
                            onClick={() => {
                              setSource(property.Src[0]);
                            }}
                          />
                        </Figure>
                      </div>
                    ))}
                  </OwlCarousel>
                </Modal.Title>
              </Modal.Body>
            </Modal>
          );
        } else {
          return (
            <div>
              <Row>
                <Col xs={12} md={12}>
                  <OwlCarousel
                    className="owl-theme"
                    id="owl-theme"
                    loop
                    margin={10}
                    nav
                  >
                    {floorplan.map((propertyImage, index) => (
                      <div className="item">
                        {index + 1}{" "}
                        <Figure>
                          <Figure.Image
                            alt="171x180"
                            src={`${propertyImage.Src[0]}`}
                            width={220}
                            height={220}
                            onClick={() => {
                              setLgShow(true);
                            }}
                          />
                        </Figure>
                      </div>
                    ))}
                  </OwlCarousel>
                </Col>
              </Row>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default ListingImage;
