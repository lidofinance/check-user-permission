const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const github = require('@actions/github');

const token = core.getInput('token');
const octokit = new Octokit({ auth: `token ${token}` });
const context = github.context;

const permissions = ['read', 'write', 'admin'];

const checkPermission = (require, permission) => {
  const requireNo = permissions.indexOf(require);
  const permissionNo = permissions.indexOf(permission);
  return requireNo <= permissionNo;
};

async function run() {
  try {
    const { owner, repo } = context.repo;
    const require = core.getInput('require');
    const username = context.actor;

    if (!username || username.trim() === '') {
      core.setFailed('Invalid username');
    }

    const {
      data: { permission },
    } = await octokit.repos.getCollaboratorPermissionLevel({
      owner,
      repo,
      username,
    });

    const isAllowed = checkPermission(require, permission);

    if (!isAllowed) {
      core.setFailed('Insufficient permissions to use this workflow');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
