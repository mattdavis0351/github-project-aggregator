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
    // const lastIssues = await octokit.issues.listForRepo({
    //   owner: ctx.repo.owner,
    //   repo: ctx.repo.repo,
    // });

    const q = `query listForRepo($repo:String!, $owner:String!){
        repository(owner: $owner, name:$repo){
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
    console.log(q);
    console.log(`owner: ${ctx.repo.owner} repo: ${typeof ctx.repo.repo}`);
    const gql = await octokit.graphql(q, v);

    console.log(gql);
  } catch (error) {
    console.log(error.message);
  }
}

run();
