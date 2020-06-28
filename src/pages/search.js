import React, { useState } from "react";
import Layout from "../components/layout";

const IndexPage = () => {
  const [reps, setReps] = useState({});
  const formData = {
    address: "",
  };

  const key = "AIzaSyCZHujzaczbqT71RKxHvmbefgqTSr5Z65I";

  const handleSubmit = (event) => {
    event.preventDefault();
    const address = formData.address;
    const endpoint = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`;

    fetch("http://localhost:50680/.netlify/functions/civicsCall", {
      method: "POST",
      body: address,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => console.log(response.json())) // parse JSON from request
      .then((resultData) => {
        console.log(resultData);
        return;
        setReps(resultData);
      });
  };

  const handleChange = (event) => {
    formData.address = event.target.value;
  };

  return (
    <Layout>
      <section>
        <form>
          <label>
            Address
            <input type="text" name="address" onChange={handleChange} />
          </label>
          <button onClick={handleSubmit}>Submit</button>
        </form>
        {reps.officials &&
          reps.officials.map((rep) => {
            return <p>{rep.name}</p>;
          })}
      </section>
    </Layout>
  );
};
export default IndexPage;
