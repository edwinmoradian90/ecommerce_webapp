import React from "react";
import { Row, Container, Button, Spinner } from "react-bootstrap";
import PageTitle from "./PageTitle";
import AddToCart from "./AddToCart";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductPageItem.css";

function ProductPageItem(props) {
  return (
    <div>
      {props.isLoaded ? (
        <>
          <PageTitle name={props.name} description={props.description} />
          <div id="container">
            <img src={props.img} height={400} alt="colors" />
            <span
              style={{
                padding: "30px 20px 30px 70px",
                backgroundColor: "white",
                color: "grey"
              }}
            >
              <h4
                style={{
                  fontWeight: 250
                }}
              >
                Description
              </h4>
              {props.description}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "40px"
                }}
              >
                <span
                  style={{
                    fontWeight: 250,
                    color: "#333",
                    fontSize: "2em"
                  }}
                >
                  ${props.price}
                </span>
                <span style={{ display: "flex", flexDirection: "row" }}>
                  <AddToCart />
                  {props.categoryPage ? (
                    <Link to={`/categories/${props.match.params.category}`}>
                      <Button>Back</Button>
                    </Link>
                  ) : (
                    <Link to="/">
                      <Button style={{ marginLeft: "20px" }}>Back</Button>
                    </Link>
                  )}
                </span>
              </div>
            </span>
          </div>
        </>
      ) : (
        <>
          <PageTitle />
          <Container>
            <Row style={{ position: "fixed", top: "50%", left: "50%" }}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Row>
            <Row />
            <Row />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "40px"
              }}
            />
          </Container>
        </>
      )}
    </div>
  );
}

export default withRouter(ProductPageItem);
