const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

// exports.onCreateNode = ({ node, actions }) => {
//   if (node.internal.type === "PrismicTalkingPoint") {
//     const { createNodeField } = actions;

//     // const fileNode = getNode(node.parent);
//     // console.log(`\n`, fileNode.relativePath);
//     var slug = "talking-point/" + node.slugs[0];
//     createNodeField({ node, name: "slug", value: slug });
//   }
// };
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;

// Query all Pages with their IDs and template data.

// const pageTemplates = {
//   Light: path.resolve(__dirname, "src/templates/light.js"),
//   Dark: path.resolve(__dirname, "src/templates/dark.js"),
// };

// Create pages for each Page in Prismic using the selected template.
// pages.data.allPrismicPage.nodes.forEach((node) => {
//   createPage({
//     path: `/${node.uid}`,
//     component: pageTemplates[node.template],
//     context: {
//       id: node.id,
//     },
//   });
// });

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allPrismicTalkingPoint {
        nodes {
          id
          uid
        }
      }
    }
  `);
  console.log(JSON.stringify(result, null, 4));
};
