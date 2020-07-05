import React from "react";
import Layout from "../components/layout";
import { Consumer } from "../context/RepresentativeContext";

const IndexPage = () => {
  const formData = {
    address: "",
  };

  const handleSubmit = (event, setReps) => {
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
        setReps(resultData);
      });
  };

  const handleChange = (event) => {
    formData.address = event.target.value;
  };

  return (
    <Layout>
      <Consumer>
        {(context) => (
          <section>
            <form>
              <label>
                Address
                <input type="text" name="address" onChange={handleChange} />
              </label>
              <button onClick={(e) => handleSubmit(e, context.setReps)}>
                Submit
              </button>
            </form>
            {/* {context.reps.officials &&
              context.reps.officials.map((rep) => {
                return <p>{rep.name}</p>;
              })} */}
            <>{JSON.stringify(context.reps)}</>
          </section>
        )}
      </Consumer>
    </Layout>
  );
};
export default IndexPage;
