import React, { Component } from "react";
import { fetchWrapper } from "../../_helper/fetchWrapper";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ShowAllListings from "./ShowAllListings";
import Form from "react-bootstrap/Form";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import "./AllListings.css";
import Container from "react-bootstrap/Container";

class AllListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Floorplan: [],
      Information: [],
      PropertyID: [],
      General_ID: [],
      Identification: [],
      ILS_Identification: [],
      data: [],
      bathAmount: 0,
      bedAmount: 0,
      roomType: "",
      userSearchPostal: "",
      rangeSliderVal: 700,
    };

    this._handleBedChange = this._handleBedChange.bind(this);
    this._handleBathChange = this._handleBathChange.bind(this);
    this._handlePostalCode = this._handlePostalCode.bind(this);
    this._handleRoomTypeChange = this._handleRoomTypeChange.bind(this);
    //this._handleSubmit = this._handleSubmit.bind(this);
    //this.strCompare = this.strCompare.bind(this);
    this._handleRangeSlider = this._handleRangeSlider.bind(this);
  }
  _handleRangeSlider(e) {
    e.preventDefault();

    this.setState({ rangeSliderVal: e.target.value });
    console.log(this.state.rangeSliderVal);
  }
  _handlePostalCode(e) {
    e.preventDefault();
    //console.log(e.target.value);
    this.setState({ userSearchPostal: e.target.value });
  }
  _handleRoomTypeChange(e) {
    e.preventDefault();
    this.setState({ roomType: e.target.value });
  }
  _handleBedChange(e) {
    e.preventDefault();
    this.setState({ bedAmount: e.target.value });
  }
  _handleBathChange(e) {
    e.preventDefault();
    this.setState({ bathAmount: e.target.value });
  }
  /*
  _handleSubmit(e) {
    e.preventDefault();
  }
  strCompare(str1, str2) {
    return str1 === str2;
  }*/
  componentDidMount() {
    const URL =
      "https://alleghenycityrealty.managebuilding.com/Resident/PublicPages/XMLRentals.ashx";
    fetchWrapper.get(URL).then((data) => {
      data.map((house) => {
        this.setState({ Floorplan: house.Floorplan });
        this.setState({ Information: house.Information });
        this.setState({ PropertyID: house.PropertyID });
        this.setState({ General_ID: house.General_ID });
        this.setState({ Identification: house.Identification });
        this.setState({ ILS_Identification: house.ILS_Identification });
        this.setState({ data: [...data] });
      });
    });
  }
  render() {
    const { data } = this.state;
    //filter user search criteria
    
    const items = data
      .filter((data) => {
        if (
          this.state.bathAmount === 0 &&
          this.state.bedAmount === 0 &&
          this.state.userSearchPostal === "" &&
          this.state.roomType === "" &&
          parseInt(this.state.rangeSliderVal) === 700
        ) {
          return data;
        } else if (this.state.userSearchPostal != "") {
          if (
            parseInt(data.PropertyID[0].Address[0].PostalCode[0]) ==
              parseInt(this.state.userSearchPostal) ||
            data.PropertyID[0].Address[0].City[0].includes(
              this.state.userSearchPostal
            ) ||
            data.PropertyID[0].Address[0].State[0].includes(
              this.state.userSearchPostal
            ) ||
            data.ILS_Identification[0].$.ILS_IdentificationType.includes(
              this.state.roomType
            )
          ) {
            return data;
          }
        } else if (this.state.rangeSliderVal != 700) {
          if (
            parseInt(
              data.Floorplan[0].Deposit[0].Amount[0].ValueRange[0].$.Exact
            ) === parseInt(this.state.rangeSliderVal)
          ) {
            return data;
          }
        } else if (this.state.bathAmount != 0 || this.state.bedAmount != 0) {
          if (
            parseInt(data.Floorplan[0].Room[1].Count[0]) ==
              parseInt(this.state.bathAmount) ||
            parseInt(data.Floorplan[0].Room[0].Count[0]) ==
              parseInt(this.state.bedAmount)
          ) {
            return data;
          }
        } else if (this.state.roomType != "") {
          console.log(
            this.state.roomType,
            data.ILS_Identification[0].$.ILS_IdentificationType
          );
          if (
            this.state.roomType.includes(
              data.ILS_Identification[0].$.ILS_IdentificationType
            )
          ) {
            return data;
          }
        }
      })
      .map((data, index) => {
        //return filtered data
        return (
          <Container fluid="md" id="page-content-wrapper">
            <Row>
              <Col>
                <ShowAllListings listing={data} index={index} />
              </Col>
            </Row>
          </Container>
        );
      });
    return (
      <div>
        {/** main listings*/}
        <Row>
          <Col xs={12} md={12}>
            <Form
              className="filter-form"
              onSubmit={(e) => {
                this._handleSubmit(e);
              }}
            >
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label># Bed Rooms</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    this._handleBedChange(e);
                  }}
                  custom
                >
                  <option value="0">Beds</option>
                  <option value="0">0+</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label># Bath Rooms</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    this._handleBathChange(e);
                  }}
                  custom
                >
                  <option value="0">Baths</option>
                  <option value="0">0+</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Room Type</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    this._handleRoomTypeChange(e);
                  }}
                  custom
                >
                  <option value="">Type</option>
                  <option value="Mid Rise">Mid Rise</option>
                  <option value="4plex">4plex</option>
                  <option value="High Rise">High Rise</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicRangeCustom">
                <Form.Label>Price</Form.Label>
                <RangeSlider
                  value={this.state.rangeSliderVal}
                  min={700}
                  max={1800}
                  step={25}
                  onChange={(e) => {
                    this._handleRangeSlider(e);
                  }}
                />
                {this.state.rangeSliderVal}
              </Form.Group>
              <div className="search">
                <input
                  type="text"
                  placeholder="Enter a zip/code or city/state..."
                  id="search"
                  onChange={(e) => {
                    this._handlePostalCode(e);
                  }}
                />
                <i className="fa fa-search"></i>
              </div>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            {items}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AllListings;
