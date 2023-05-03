import React, { useState } from "react";
import "./AgeCalc.css";

export default function AgeCalc() {
  const [userData, setUserData] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [userAge, setUserAge] = useState({
    days: "--",
    months: "--",
    years: "--",
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);

    setUserAge({
      years: years(today, birthDate),
      months: month(today, birthDate),
      days: day(today, birthDate),
    });
  }

  function years(today, dob) {
    var y = today.getFullYear() - dob.getFullYear();
    var m = today.getMonth() - dob.getMonth();
    var d = today.getDate() - dob.getDate();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      y--;
    }
    return y;
  }

  function month(today, dob) {
    var m = today.getMonth() - dob.getMonth();
    var d = today.getDate() - dob.getDate();

    if (today.getDate() < dob.getDate() && m < 0) {
      var mm = 12 + m;
      mm--;
      return mm;
    } else if (today.getDate() < dob.getDate() && m > 0) {
      var mm = m - 1;

      return mm;
    } else if (m < 0) {
      var mon = 12 + m;

      return mon;
    }

    return m;
  }

  function day(today, dob) {
    var m = today.getMonth() - dob.getMonth();
    var d = today.getDate() - dob.getDate();

    if (d < 0 && today.getMonth() == 0) {
      var dd = 31 + d;
      return dd;
    } else if (d < 0 && today.getMonth() == 2) {
      var dd = 28 + d;
      return dd;
    } else if (d < 0) {
      var dd = 30 + d;
      return dd;
    } else return d;
  }

  return (
    <div className="age-calc__container">
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="day">day</label>
          <input
            id="day"
            name="day"
            type="text"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <label htmlFor="month">month</label>
          <input
            id="month"
            name="month"
            type="text"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <label htmlFor="year">year</label>
          <input
            id="year"
            name="year"
            type="text"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <hr className="w-100" />
      <div className="row">
        <div className="col-xs-12">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() =>
              getAge(`${userData.year}/${userData.month}/${userData.day}`)
            }
          >
            Get My Age
          </button>
        </div>
      </div>
      <div className="row w-100">
        <div className="col-xs-12">
          <h1>
            <mark>{userAge.years}</mark> years
          </h1>
          <h1>
            <mark>{userAge.months}</mark> months
          </h1>
          <h1>
            <mark>{userAge.days}</mark> days
          </h1>
        </div>
      </div>
    </div>
  );
}
