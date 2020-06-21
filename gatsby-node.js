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
      allPrismicSubissue {
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
  result.data.allPrismicIssue.nodes.forEach((node) => {
    console.log(node);
    createPage({
      path: `issue/${node.uid}`,
      component: path.resolve(`./src/templates/issue.js`),
      context: {
        id: node.id,
        title: node.data.title.html,
        subissues: {
          data.subissues
        }
      },
    });
  });

  result.data.allPrismicSubissue.nodes.forEach((node) => {
    console.log(node);
    createPage({
      path: `sub-issue/${node.uid}`,
      component: path.resolve(`./src/templates/subissue.js`),
      context: {
        id: node.id,
        title: node.data.title.html,
      },
    });
  });
};
