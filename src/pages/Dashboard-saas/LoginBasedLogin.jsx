import React, { useEffect, useState } from 'react';
import EmployeeLoginModal from './EmployeeLoginModal'; // Assuming it's in the same directory.

const LocationBasedLogin = (props) => {
  const [isLocationValid, setIsLocationValid] = useState(false);
  const allowedPostalCodes = ["12345", "67890"]; // Update with your list.

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handlePosition, handleError);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handlePosition = (position) => {
    const { latitude, longitude } = position.coords;
    getPostalCodeFromLatLong(latitude, longitude);
  };

  const handleError = (error) => {
    console.error('Error getting location', error);
  };

  const getPostalCodeFromLatLong = (latitude, longitude) => {
    const geocoder = new google.maps.Geocoder();
    const latLng = { lat: latitude, lng: longitude };

    geocoder.geocode({ 'location': latLng }, (results, status) => {
      if (status === 'OK') {
        const addressComponents = results[0].address_components;
        const postalCodeObj = addressComponents.find(comp => comp.types.includes('postal_code'));
        if (postalCodeObj) {
          const postalCode = postalCodeObj.long_name;
          checkPostalCode(postalCode);
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  };

  const checkPostalCode = (postalCode) => {
    if (allowedPostalCodes.includes(postalCode)) {
      setIsLocationValid(true);
    } else {
      alert("You're not within the allowed postal code area.");
    }
  };

  return (
    <>
      {isLocationValid && <EmployeeLoginModal {...props} />}
    </>
  );
};

export default LocationBasedLogin;
