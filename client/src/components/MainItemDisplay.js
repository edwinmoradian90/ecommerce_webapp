import React from "react";
import { Card, Container, Spinner, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function MainItemDisplay(props) {
  let styleCard = {
    display: " flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflowX: "hidden"
  };

  const styleContainer = {
    width: " 100%",
    height: 300,
    paddingTop: "20px",
    backgroundColor: "white"
  };

  let scrollLeft = () => {
    let scroll = document.getElementById(props.selector);
    scroll.scrollBy({ left: 400, behavior: "smooth" });
  };
  let scrollRight = () => {
    let scroll = document.getElementById(props.selector);
    scroll.scrollBy({ left: -400, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      {props.isLoad ? (
        <Container style={styleContainer}>
          <h3 style={{ fontWeight: 250 }}>{props.title}</h3>
          <div style={{ position: "relative" }}>
            <Button
              variant="light"
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(100%)",
                opacity: 0.9,
                fontSize: "2em"
              }}
              onClick={scrollRight}
            >
              〈
            </Button>
            <Button
              variant="light"
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(100%)",
                opacity: 0.9,
                fontSize: "2em"
              }}
              onClick={scrollLeft}
            >
              〉
            </Button>
          </div>
          <div id={props.selector} style={styleCard}>
            {props.imgs.map((item, i) => (
              <div key={i}>
                <div key={i} style={{ width: "18rem", marginRight: "30px" }}>
                  <img
                    alt=""
                    onClick={e => {
                      props.history.push(
                        `/products/${e.target.getAttribute("name")}`
                      );
                    }}
                    name={props.names[i]}
                    style={{
                      cursor: "pointer",
                      margin: "20px"
                    }}
                    variant="top"
                    height={200}
                    src={item}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <Container
          onClick={e => {
            e.preventDefault();
          }}
          style={{
            width: " 100%",
            height: 300,
            paddingTop: "20px",
            boxShadow: "1px 1px 10px lightgrey"
          }}
        >
          <div style={styleCard}>
            {props.imgs.map((item, i) => (
              <Card style={{ width: "18rem" }} key={i}>
                <div style={styleCard}>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      )}
    </React.Fragment>
  );
}

export default withRouter(MainItemDisplay);
