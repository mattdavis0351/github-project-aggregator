const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const token = core.getInput("token");
  const labels = core
    .getInput("labels")
    .split(",")
    .map((i) => {
      return i.trim();
    });
  const repos = core.getInput("repos");
  const projectName = core.getInput("projectName");
  const octokit = github.getOctokit(token);
  const ctx = github.context;

  try {
    // const query = `query issues($label: [String!]){
    //     viewer {
    //       issues(labels: $label, first: 50) {
    //         edges {
    //           node {
    //             title,
    //             repository{
    //               nameWithOwner
    //             }

    //           }
    //         }
    //       }
    //     }
    //   }`;
    // const vars = {
    //   label: labels,
    // };
    console.log(labels);
    const { issues } = await octokit.graphql(
      `{
        viewer {
          issues(labels: "bug", first: 5) {
            edges {
              node {
                title
                repository {
                  nameWithOwner
                }
              }
            }
          }
        }
      }`
    );
    // core.info(labels);
    console.log(JSON.stringify(issues.title));
  } catch (error) {
    core.debug(error.message);
  }
}

run();
