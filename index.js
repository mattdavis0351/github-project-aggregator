const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const token = core.getInput("token");
  //   const labels = core
  //     .getInput("labels")
  //     .split(",")
  //     .map((i) => {
  //       return i.trim();
  //     });
  //   const repos = core.getInput("repos");
  //   const projectName = core.getInput("projectName");
  const octokit = github.getOctokit(token);
  const ctx = github.context;

  try {
    const { lastIssues } = await octokit.graphql(
      `query {
          repository(owner:${ctx.repo.owner}, name:${ctx.repo.repo}) {
            issues(last:5) {
              edges {
                node {
                  title
                }
              }
            }
          }
        }`
    );

    console.log(typeof lastIssues);
  } catch (error) {
    core.debug(error.message);
  }
}

run();
