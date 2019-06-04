import React from "react";
import CountryOrCityPicker from "../CountryOrCityPicker";
import StateInformation from "../data/StateInformation";
import GeneralInputNoLabel from "../GeneralInputNoLabel";
import { Button } from "react-bootstrap";

function AddressesEdit(props) {
  return (
    <>
      <h1>Edit</h1>
      <div>
        <CountryOrCityPicker
          style={{ paddingBottom: "20px" }}
          listName="Choose your state"
          options={StateInformation}
        />

        <GeneralInputNoLabel
          onChange={this.onChange}
          name="name"
          placeholder="Full Name"
        />

        <GeneralInputNoLabel
          onChange={this.onChange}
          name="userAddress"
          placeholder="Address, street and number, P.O. box, etc."
        />

        <GeneralInputNoLabel
          onChange={this.onChange}
          name="userAddress2"
          placeholder="Apartment, suite, building, floor, unit"
        />

        <GeneralInputNoLabel
          onChange={this.onChange}
          name="city"
          placeholder="City"
        />

        <GeneralInputNoLabel
          onChange={this.onChange}
          name="state"
          placeholder="State, region, or province"
        />

        <GeneralInputNoLabel
          onChange={this.onChange}
          name="zip"
          placeholder="Zip code"
        />
      </div>

      <div
        style={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "row",
          justofyContent: "space-between"
        }}
      >
        <Button onClick={this.onSubmit}>Add Address</Button>
        <Button onClick={this.back} variant="outline-info">
          Back
        </Button>
      </div>
    </>
  );
}

export default AddressesEdit;
