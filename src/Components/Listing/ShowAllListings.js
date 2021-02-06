import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Truncate from "react-truncate";
import "./ShowAllListings.css";
class ShowAllListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: this.props.listing,
      currentListing: [{}],
    };
    this.handleListing = this.handleListing.bind(this);
  }

  handleListing() {
    let storageArr = [];
    storageArr.push();
    var listing = {
      currentProperty: this.state.listing.PropertyID[0],
      currentDesc: this.state.listing.Information[0].LongDescription[0],
      currentFloorPlan: this.state.listing.Floorplan[0],
      currentILSType: this.state.listing.ILS_Identification[0].$.ILS_IdentificationType
    };
    storageArr.push(listing);
    localStorage.setItem("currentListing", JSON.stringify(storageArr));
    console.log(this.state.currentListing);
  }
  componentDidMount() {}
  render() {
    const { listing } = this.state;

    return (
      <div className="show-listing-div">
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <Link
                onClick={(e) => {
                  this.handleListing();
                }}
                to={{
                  pathname:
                    "/view-listing/" +
                    `${listing.Floorplan[0].Identification[0].IDValue}`,
                  state: this.state.currentListing,
                }}
              >
                <Card.Img
                  variant="top"
                  className="zoom"
                  width={220}
                  height={220}
                  src={listing.Floorplan[0].File[0].Src[0]}
                />
              </Link>
              <Card.Body></Card.Body>
             {/**<Card.Body>
                <Link
                  to={{
                    pathname:
                      "/view-listing/" +
                      `${listing.Floorplan[0].Identification[0].IDValue}`,
                    state: this.state.currentListing,
                  }}
                >
                  <Button
                    onClick={(e) => {
                      this.handleListing();
                    }}
                  >
                    View More
                  </Button>
                </Link>
              </Card.Body> */} 
              <Card.Body>
                <span className="">
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <Button variant="danger">
                        {listing.Information[0].LongDescription[0].slice(0, 20)}
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </span>
                <Card.Title>
                <i class="fa fa-map-marker" width="inherit"></i>&nbsp;
                  {listing.PropertyID[0].Address[0].Address[0]},
                  {listing.PropertyID[0].Address[0].City[0]},
                  {listing.PropertyID[0].Address[0].State[0]},
                  {listing.PropertyID[0].Address[0].PostalCode[0]}
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className="price">
                  $
                  {
                    listing.Floorplan[0].Deposit[0].Amount[0].ValueRange[0].$
                      .Exact
                  }
                  /Month
                </ListGroup.Item>
                <ListGroup.Item>
                  <i
                    className="fas fa-bath"
                    style={{ padding: "5px", fontSize: "20px", color: "#000" }}
                  ></i>
                  {listing.Floorplan[0].Room[1].Comment[0]}
                  <br />
                  <i
                    className="fas fa-bed"
                    style={{ padding: "5px", fontSize: "20px", color: "#000" }}
                  ></i>
                  {listing.Floorplan[0].Room[0].Comment[0]}
                </ListGroup.Item>
              </ListGroup>
              
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ShowAllListings;

/** {/**<Truncate
                lines={3}
                ellipsis={
                  <span>
                    ... <br />
                    <Link
                      onClick={(e) => {
                        this.handleListing();
                      }}
                      to={{
                        pathname:
                          "/view-listing/" +
                          `${listing.Floorplan[0].Identification[0].IDValue}`,
                        state: this.state.currentListing,
                      }}
                    >
                      View More
                    </Link>
                  </span>
                }
              >
                <Card.Text>
                  {listing.Information[0].LongDescription[0]}
                </Card.Text>
              </Truncate> */
