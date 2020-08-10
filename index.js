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
    const q = `query listForRepo($owner:String!, $repo:String!){
        repository(owner: $owner, name: $repo){
            issues(last: 5) {
                edges {
                    node {
                        title
                    }
                }
            }
        }
    }`;

    const v = {
      repo: ctx.repo.repo,
      owner: ctx.repo.owner,
    };

    const { repository } = await octokit.graphql(q, v);

    repository.issues.edges.forEach((el) => {
      console.log(el);
    });
  } catch (error) {
    console.log(error.message);
  }
}

run();
