import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Carousel, Spinner } from "react-bootstrap";
import { RemoveScroll } from "react-remove-scroll";

const CarouselledItems = props => {
  let style = {
    height: 700,
    width: "100%",
    cursor: "pointer"
  };
  return (
    <React.Fragment>
      {props.isLoad ? (
        <Container>
          <Carousel>
            <Carousel.Item>
              <img
                className="img-fluid"
                onClick={e => {
                  props.history.push(
                    `/products/${e.target.getAttribute("name")}`
                  );
                }}
                name={props.names[0]}
                src={props.featuredImgs[0]}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Shop</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img-fluid"
                onClick={e => {
                  props.history.push(
                    `/products/${e.target.getAttribute("name")}`
                  );
                }}
                name={props.names[1]}
                src={props.featuredImgs[1]}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Till You</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img-fluid"
                onClick={e => {
                  props.history.push(
                    `/products/${e.target.getAttribute("name")}`
                  );
                }}
                name={props.names[2]}
                src={props.featuredImgs[2]}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Drop</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      ) : (
        <Container>
          <RemoveScroll />
          <Carousel>
            <Carousel.Item>
              <div style={style}>
                <div style={{ position: "fixed", left: "50%", top: "50%" }}>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              </div>
              <Carousel.Caption>
                <h3>Shop</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      )}
    </React.Fragment>
  );
};
export default withRouter(CarouselledItems);
