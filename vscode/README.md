# GitHub by CodeStream

CodeStream is a developer collaboration platform that integrates essential dev
tools, such as GitHub Enterprise, GitHub Cloud, Slack, Teams, Jira, Trello and
more, into VS Code. Eliminate context-switching and simplify code discussion and
code review by putting collaboration tools in your IDE.

# Create and Review GitHub Pull Requests in VS Code

Create, review and merge GitHub pull requests inside VS Code, with full
source-tree and full file access, your favorite keybindings, built-in diff tool,
and code intelligence. Works with both GitHub Enterprise and GitHub Cloud.

![Pull Request](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/animated/PullRequest-VSC.gif)

# Features Include

- CodeStream requires a current version of [Visual Studio Code](https://code.visualstudio.com/), and is also available for [JetBrains](https://plugins.jetbrains.com/plugin/12206-codestream) or [Visual Studio](https://marketplace.visualstudio.com/items?itemName=CodeStream.codestream-vs).
- Your repository must be managed by Git, or a Git hosting service like GitHub.

* [In-IDE access to preconfigured lists of your most relevant PRs](#In-IDE-access-to-your-most-relevant-PRs)
* [Customize your lists of PRs](#Customize-your-list-of-PRs)
* [Load a PR from a URL](#Load-a-PR-from-a-URL) to view any PR, regardless of whether or not it’s in one of your lists
* [View and manage PRs from multiple sources](#View-and-manage-PRs-from-multiple-sources) (e.g. GitHub Cloud, GitHub Enterprise, GitLab, and Bitbucket) in one place
* View all PR commits
* [Manage the PR](#Manage-a-PR) by adding reviewers or assignees, changing labels, setting a milestone, etc.
* [Review changes in diff hunk view](#Review-changes-in-diff-hunk-view)
* [Add comment in diff hunk view](#Review-changes-in-diff-hunk-view)
* [Review changes in tree View](#Review-changes-in-tree-view) (not available on GitHub)
* [Review changes in list View](#Review-changes-in-list-view) (not available on GitHub)
* [See full-file side-by-side diffs](#Review-changes-with-a-full-file-side-by-side-diff) (not available on GitHub)
* [Add comments in side-by-side diff view, including on lines of code outside the change set](#Review-changes-with-a-full-file-side-by-side-diff) (not available on GitHub)
* [Merge the PR](#Merge-the-PR)
* [View PR comments as annotations along-side your codebase](#View-PR-comments-as-annotations-along-side-your-codebase)
* Update PR settings to only show those open in your IDE
* [View your GitHub Issues](#View-your-GitHub-Issues)
* [View GitHub Issues alongside those from other issue trackers (like Jira, Trello, Linear, etc.)](#View-your-GitHub-Issues)
* Create custom filters for viewing issues
* [Start work](#Start-work-by-creating-a-feature-branch-for-an-issue-and-update-your-status-on-Slack) by creating a feature branch for an issue and update your status on Slack
* [Create a new GitHub issue](#Create-a-new-GitHub-issue,-linked-to-a-block-of-code,-from-your-IDE), linked to a block of code, from your IDE
* [One-click from an issue on GitHub to view referenced code in IDE](#One-click-from-an-issue-on-GitHub-to-view-referenced-code-in-IDE)

# In-IDE access to your most relevant PRs

All of the PRs relevant to you are easily accessible in the four default
sub-sections:

- Waiting on my Review - All open PRs where you are a reviewer.
- Assigned to Me - All open PRs where you are an assignee.
- Created by Me - All open PRs that you created.
- Recent - The five most recent PRs, regardless of their current state.

![Pull Requests](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/PullRequestsSection.png)

# Customize your list of PRs

The default sections outlined above are just a starting point. You can delete
any of them, or create your own by clicking on the funnel icon in the heading of
this section and creating a custom query. For example, you might want to see
all open PRs for a specific project. Click the gear icon if you’d like to see
only PRs for repos you have open in your IDE.

![Custom Query](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/PRCustomQuery.png)

# Load a PR from a URL

You aren’t limited to just the PRs listed in the Pull Requests section. You can
open any PR in CodeStream by grabbing the URL and pasting it into the “Load PR
from URL” section.

![Load from URL](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/PRLoadFromURL.png)

# View and manage PRs from multiple sources

Do you have repos on both GitHub and GitLab? Or maybe GitHub’s cloud service and
GitHub Enterprise? You can be connected to multiple code hosts at the same
time, and access all of your PRs.

![Multiple Sources](https://assets.website-files.com/5c3c1d73652ba045d765cdb1/606db134c9f500b02820f82a_mifuNfqQFj-tfgaObNLZuLpW40aGgGL3okcwTyUtp4TjBF-ZxXb4x8lKL72hx2ljnVIBn4SF2gkteRHPqSxF3M8UfJF8vSiVe5OXtbCIX05m6R4h1KIZRG6GMUWtxbEeo6e3Qzwt.png)

# Manage a PR

Click on any PR from the Pull Requests section to view the PR in its entirety,
just as you would on GitHub. You can even edit the PR. Add a reviewer or an
assignee, change labels, set a milestone, etc.

![Manange a PR](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/PRDetails-GH.png)

# Review changes in diff hunk view

Click on the Files Changed tab to start reviewing the changes. You can view the
changes in Diff Hunks view, just as you would on GitHub, where you see just the
code that changed. And you can comment by clicking on the + button that appears
in the gutter.

![Diff Hunk View](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-PRHunkView.png)

# Review changes in list view

Use List view to see all the files in the changeset in a single list.

![List View](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-PRListView.png)

# Review changes in tree view

Use Tree view to see all the files in the changeset organized by folder.

![Tree View](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-PRTreeView.png)

# Review changes with a full-file side-by-side diff

When in tree or list views, you’ll get a full-file side-by-side diff, and you
can comment on the changes simply by selecting some code from the right side of
the diff and then clicking on the comment button that appears to the left.
Unlike on GitHub, you can even comment on lines of code outside of the
changeset.

![Side-by-Side Diff](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-PRDiff.png)

# Merge the PR

Right from CodeStream you can merge the changes (assuming you have appropriate
permissions).

![Merge the PR](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-PRMerge.png)

# View PR comments as annotations along-side your codebase

CodeStream gives PR comments a second life by displaying them alongside the
blocks of code that they refer to, so that developers working on that code can
reference the past discussions to give them insight into why the code looks the
way it does.

![View PR Comments](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-PRCommentHover.png)

To display PR comments, click on the gear menu in the heading of the Codemarks
section of the CodeStream pane, and then select “Show icons in editor gutter” >
“Pull Request comments”.

# View your GitHub Issues

Access GitHub issues assigned to you in your IDE. If your team uses multiple
issue trackers, like Jira, Trello, Linear, and 11 others, you can view those as
well.

![Issues Section](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-IssuesSection.png)

# Start work by creating a feature branch for an issue and update your status on Slack

Click on an issue and if you haven’t started working on it yet you’ll be able to
create a new feature branch and update your Slack status in one step. The name
of the branch is based on a configurable template.

![Start Work](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-StartWork.png)

# Create a new GitHub issue, linked to a block of code, from your IDE

You can also create a GitHub issue, connected to a block of code, without
leaving your IDE. Maybe you come across a bug in the code, or see some tech debt
you want to flag. Just select some code and click the Bug icon.

![Create an Issue](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-CreateIssue.png)

![Issue Form](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-IssueForm.png)

# One-click from an issue on GitHub to view referenced code in IDE

When creating an issue from CodeStream highlighted code is included in the issue
on GitHub. Click on the “Open in IDE” link to open that file in your IDE and be
automatically scrolled to the block of code where you need to do your work.

![Issue on GitHub](https://raw.githubusercontent.com/TeamCodeStream/codestream-guide/develop/docs/src/assets/images/GHE-IssueOnGHE.png)

# Frequently Asked Questions

### What are the system requirements?

- CodeStream requires a current version of [Visual Studio Code](https://code.visualstudio.com/), and is also available for [JetBrains](https://plugins.jetbrains.com/plugin/12206-codestream) or [Visual Studio](https://marketplace.visualstudio.com/items?itemName=CodeStream.codestream-vs).
- Your repository must be managed by Git, or a Git hosting service like GitHub.

### What integrations does CodeStream offer?

- **Issue Trackers:** Asana, Azure DevOps, Clubhouse, GitHub, GitHub Enterprise, Jira, Linear, Trello, YouTrack
- **Messaging Services:** Slack, Microsoft Teams

### Where are messages stored?

Your team’s codemarks, which include the message text and the code snippet, are stored in the cloud on CodeStream’s servers. CodeStream uses best practices when it comes to [security](https://www.codestream.com/security).

# Help & Feedback

Check out the [user guide](https://docs.codestream.com/userguide/) for more information on getting started with CodeStream. Please follow [@teamcodestream](http://twitter.com/teamcodestream) for product updates and to share feedback and questions. You can also email us at support@codestream.com.

<p align="center">
  <br />
  <a title="Learn more about CodeStream" href="https://codestream.com?utm_source=vscmarket&utm_medium=banner&utm_campaign=codestream"><img src="https://alt-images.codestream.com/codestream_logo_vscmarketplace_ghe.png" alt="CodeStream Logo" /></a>
</p>
