import React from "react";
import CountryOrCityPicker from "../CountryOrCityPicker";
import StateInformation from "../data/StateInformation";
import GeneralInputNoLabel from "../GeneralInputNoLabel";
import { Button } from "react-bootstrap";

function AddressAdder(props) {
  let address = props.editItem;
  return (
    <>
      {!props.edit ? (
        <>
          <div>
            <CountryOrCityPicker
              style={{ paddingBottom: "20px" }}
              listName="Choose your state"
              options={StateInformation}
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="name"
              placeholder="Full Name"
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="userAddress"
              placeholder="Address, street and number, P.O. box, etc."
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="userAddress2"
              placeholder="Apartment, suite, building, floor, unit"
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="city"
              placeholder="City"
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="state"
              placeholder="State, region, or province"
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
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
            <Button onClick={props.onSubmit}>Add Address</Button>
            <Button onClick={props.back} variant="outline-info">
              Back
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>
            <CountryOrCityPicker
              style={{ paddingBottom: "20px" }}
              listName="Choose your state"
              options={StateInformation}
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="name"
              placeholder="Full Name"
              defaultValue={address.name}
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="userAddress"
              placeholder="Address, street and number, P.O. box, etc."
              defaultValue={address.userAddress}
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="userAddress2"
              placeholder="Apartment, suite, building, floor, unit"
              defaultValue={address.userAddress2}
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="city"
              placeholder="City"
              defaultValue={address.city}
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="state"
              placeholder="State, region, or province"
              defaultValue={address.state}
            />

            <GeneralInputNoLabel
              onChange={props.onChange}
              name="zip"
              placeholder="Zip code"
              defaultValue={address.zip}
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
            <Button onClick={props.onSubmit}>Save Changes</Button>
            <Button onClick={props.back} variant="outline-info">
              Back
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default AddressAdder;
