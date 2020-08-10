const core = require("@actions/core");
const github = require("@actions/github");
const { context } = require("@actions/github/lib/utils");

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
    const { lastIssues } = await octokit.graphql(
      {
        query: `query lastIssues($owner: String!, $repo: String!, $num: Int = 3) {
          repository(owner:$owner, name:$repo) {
            issues(last:$num) {
              edges {
                node {
                  title
                }
              }
            }
          }
        }`,
      },
      { owner: context.repo.owner, repo: context.repo.repo }
    );
    console.log("success");
  } catch (error) {
    core.debug(error.message);
  }
}

run();
