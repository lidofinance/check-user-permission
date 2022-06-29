const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const github = require('@actions/github');
const { checkPermission } = require('actions-util');

// **********************************************************
const token = core.getInput('token');
const octokit = new Octokit({ auth: `token ${token}` });
const context = github.context;

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

    // core.info(`${username} permission is ${permission}.`);

    const isAllowed = checkPermission(require, permission);

    if (!isAllowed) {
      core.setFailed('Insufficient permissions to use this workflow');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
