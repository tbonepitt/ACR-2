import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./ViewListing.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import {
  EmailShareButton,
  FacebookShareButton,
  FacebookShareCount,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  TwitterShareCount,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
import ListingImage from "./ListingImage";
import { Link } from "react-router-dom";

let imageArr = [];
class ViewListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListingImages: [],
      searchData: JSON.parse(localStorage.getItem("currentListing") || "[]"),
      imageLength: 0,
    };
    this.handleONRequest = this.handleONRequest.bind(this);
    this.handleONApply = this.handleONApply.bind(this);
  }
  
  handleONApply(e) {
    window.location.href = `https://alleghenycityrealty.managebuilding.com/Resident/rental-application/apply?listingId=
    ${this.state.searchData.currentFloorPlan.Identification[0].IDValue}`;
  }
  handleONRequest(e) {
    window.location.href = this.state.searchData.currentFloorPlan.FloorplanAvailabilityURL[0];
  }
  componentDidMount() {
    this.setState({
      seachData: JSON.parse(localStorage.getItem("currentListing") || "[]"),
    });
    this.state.searchData[0].currentFloorPlan.File.map((image) => {
      this.setState({ currentListingImages: image });
      imageArr.push(image);
    });
    this.setState({
      imageLength: this.state.searchData[0].currentFloorPlan.File.length,
    });

    
  }
  render() {
    return (
      <div className="view-listing-div">
        <Row>
          <Col xs={12} md={2}>
            <Link
              to={{
                pathname: "/",
              }}
            >
              <Button className="back-button">
                {" "}
                <i class="fa fa-chevron-left"></i>Back
              </Button>
            </Link>
          </Col>
          <Col xs={12} md={10}>
            <h1 className="intro_title">
              {this.state.searchData[0].currentProperty.Address[0].Address[0]},
              {this.state.searchData[0].currentProperty.Address[0].State[0]},
              {
                this.state.searchData[0].currentProperty.Address[0]
                  .PostalCode[0]
              }
              &nbsp;
              <a
                href={
                  "https://maps.google.com/?q=" +
                  this.state.searchData[0].currentProperty.Address[0]
                    .Address[0] +
                  ", USA"
                }
              >
                <i class="fa fa-map-marker"></i>
              </a>
            </h1>
            {this.state.searchData[0].currentFloorPlan.Amenity.map(
              (amenity) => {
                return (
                  <Button disabled="true" className="amenity_info">
                    {amenity.Description[0]}
                  </Button>
                );
              }
            )}
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col xs={12} md={8} className="listing-description-col">
            <h2 className="property_title">Description</h2>
            <p className="description">
              {this.state.searchData[0].currentDesc}
            </p>
            {console.log(this.state.searchData[0].currentFloorPlan.File.length)}
          </Col>{" "}
          <Col xs={12} md={4} className="listing-buttons-col">
            <Button disabled="true" className="rental_price_btn">
              $
              {this.state.searchData[0].currentFloorPlan.Deposit[0].Amount[0].ValueRange[0].$.Exact.slice(
                0,
                3
              )}
              /Month
            </Button>

            <a
              href={`${this.state.searchData[0].currentFloorPlan.FloorplanAvailabilityURL[0]}`}
            >
              <Button className="infoRequest">Request Information</Button>
            </a>
            <a
              href={`https://alleghenycityrealty.managebuilding.com/Resident/rental-application/apply?listingId=
              ${this.state.searchData[0].currentFloorPlan.Identification[0].IDValue}`}
            >
              <Button>Apply for suit</Button>
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <ListingImage
              floorplan={this.state.searchData[0].currentFloorPlan.File}
              length={this.state.imageLength}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <h2 style={{ textAlign: "center" }}>Extra Facilities</h2>
          </Col>
        </Row>
        <Row className="room_info_row">
          <Col xs={12} md={4}>
            <p>
              <strong>Bathrooms</strong>
            </p>
            <i
              className="fas fa-bath"
              style={{
                padding: "5px",
                fontSize: "28px",
                color: "#000",
              }}
            ></i>
            {this.state.searchData[0].currentFloorPlan.Room[1].Comment[0]}
          </Col>
          <Col xs={12} md={4}>
            <p>
              <strong>Bedrooms</strong>
            </p>{" "}
            <i
              className="fas fa-bed"
              style={{
                padding: "5px",
                fontSize: "28px",
                color: "#000",
              }}
            ></i>
            {this.state.searchData[0].currentFloorPlan.Room[0].Comment[0]}
          </Col>
          <Col xs={12} md={4}>
            <ul className="sq_feet" style={{ textTransform: "uppercase" }}>
              <p>
                <strong>Area</strong>
              </p>
              {this.state.searchData[0].currentFloorPlan.SquareFeet.map(
                (measurement, x) => {
                  return (
                    <div key={x}>
                      {console.log(this.state.searchData[0].currentFloorPlan)}
                      <li>Max: {measurement.$.Max}</li>
                    </div>
                  );
                }
              )}
            </ul>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <p
              style={{ textTransform: "uppercase" }}
              className="security_deposit"
            >
              <strong>Security Deposit of</strong>:&nbsp;
              {"$" +
                this.state.searchData[0].currentFloorPlan.Deposit[0].Amount[0]
                  .ValueRange[0].$.Exact}{" "}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <FacebookShareButton
              url={`http://localhost:3000/view-listing/${this.state.searchData[0].currentFloorPlan.Identification[0].IDValue}`}
              quote={`Beautiful Listing available @ ${this.state.searchData[0].currentProperty.Address[0].Address[0]}`}
              hashtag="#listing-avail"
            >
              <FacebookIcon size={36} />
            </FacebookShareButton>

            <TwitterShareButton
              url={`http://localhost:3000/view-listing/${this.state.searchData[0].currentFloorPlan.Identification[0].IDValue}`}
              caption={`Beautiful Listing available @ ${this.state.searchData[0].currentProperty.Address[0].Address[0]}`}
              hashtag="#listing-avail"
              title={`Beautiful Listing available @ ${this.state.searchData[0].currentProperty.Address[0].Address[0]}`}
            >
              <TwitterIcon size={36} />
            </TwitterShareButton>

            <LinkedinShareButton
              source={`http://localhost:3000/view-listing/${this.state.searchData[0].currentFloorPlan.Identification[0].IDValue}`}
              summary={`Beautiful Listing available @ ${this.state.searchData[0].currentDesc}`}
              title={`Beautiful Listing available @ ${this.state.searchData[0].currentProperty.Address[0].Address[0]}`}
              url={`http://localhost:3000/view-listing/${this.state.searchData[0].currentFloorPlan.Identification[0].IDValue}`}
            >
              <LinkedinIcon size={36} />
            </LinkedinShareButton>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewListing;
