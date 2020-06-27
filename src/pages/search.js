import React, { useState } from "react";
import Layout from "../components/layout";
// import Image from "../components/image";
// import SEO from "../components/seo";

const IndexPage = () => {
  // Build Time Data Fetching
  //   const gatsbyRepoData = useStaticQuery(graphql`
  //     query {
  //       github {
  //         repository(name: "gatsby", owner: "gatsbyjs") {
  //           id
  //           nameWithOwner
  //           url
  //         }
  //       }
  //     }
  //   `);
  // Client-side Runtime Data Fetching
  const [reps, setReps] = useState({});
  const formData = {
    address: "",
  };

  const key = "AIzaSyCZHujzaczbqT71RKxHvmbefgqTSr5Z65I";

  const handleSubmit = (event) => {
    event.preventDefault();
    const address = formData.address;
    const endpoint = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`;

    fetch(endpoint)
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        console.log(resultData);
        setReps(resultData);
      });
    // set data for the number of stars
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
        {/* <p>Runtime Data: Star count for the Gatsby repo {starsCount}</p> */}
      </section>
    </Layout>
  );
};
export default IndexPage;
