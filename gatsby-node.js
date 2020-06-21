const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allPrismicIssue {
        nodes {
          id
          uid
          data {
            title {
              html
            }
          }
        }
      }
    }
  `);
  console.log(result);
  result.data.allPrismicIssue.nodes.forEach((node) => {
    console.log(node);
    createPage({
      path: `talking-point/${node.uid}`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        title: node.data.title.html,
      },
    });
  });
};
