const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const token = core.getInput("token");
  const labels = core.getInput("labels").split(",");
  const repos = core.getInput("repos");
  const projectName = core.getInput("projectName");
  const octokit = github.getOctokit(token);
  const ctx = github.context;

  try {
    const query = `query issues($labels: [String!]{ 
        viewer { 
          issues(labels: $labels, first: 50) {
            edges {
              node {
                title,
                repository{
                  nameWithOwner
                }
                
              }
            }
          }
        }
      }`;
    const vars = {
      labels: labels,
    };
    console.log(labels);
    const issuesQuery = await octokit.graphql(query, vars);
    console.log(issuesQuery);
  } catch (error) {
    core.debug(error.message);
  }
}

run();
