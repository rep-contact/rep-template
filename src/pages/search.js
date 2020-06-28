import React, { useState } from "react";
import Layout from "../components/layout";

const IndexPage = () => {
  const [reps, setReps] = useState({});
  const formData = {
    address: "",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const address = formData.address;

    fetch("/.netlify/functions/civicsCall", {
      method: "POST",
      body: address,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json()) // parse JSON from request
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
