# Conversation Starter

-   [Live Demo](https://jim-moody.github.io/conversation-starter)

## Description

Ever have a hard time thinking of what to say to someone?  You want to talk to them but you just can't find the words?

Thanks to Conversation Starter, you don't need to worry anymore.  Find the best conversation starters around, curated by you and your peers!

## Approach

Here is my schedule:

-   Day 1 - Finish Posts API
-   Day 2 - Finish Auth API and relate posts to auth
-   Day 3 - Create client for posts
-   Day 4 - Create client for auth
-   Day 5 - Add styling and cleanup bugs

I ended up sticking to this schedule for the most part. The one thing I didn't have in here is voting.  Because I was a little ahead of schedule I ended up implementing voting which took me longer than pretty much everything else combined.

My biggest struggled with this project was dealing with complexities with the user experience. There are a few things with the experience that are a little "jarring" and I would like to ease those transitions, but it is difficult because you also want to keep your data in sync with the backend.

## Unsolved Problems

-   See [issues](https://github.com/jim-moody/conversation-starter/issues)

## Features

| Name              | Description                                                           |
| ----------------- | --------------------------------------------------------------------- |
| Persistent Login  | User will stay logged in until they close the browser                 |
| Admin Roles       | I have an admin role so I can delete or edit offensive posts          |
| Loading animation | Show a loader for slow networks                                       |
| Groupings         | Sort/filter for different views of the data                           |
| Input focus       | Focus on the create line input automatically so user can start typing |
| Error Handling    | Show user an error if they try to vote without logging in             |
| Header animation  | If user scrolls down, the top part of the header is hidden            |
| Responsive        | Fully responsive, displays on all device screen sizes                 |

## User Stories

-   As a user I want to be able to sign in so I can contribute to the site
-   As a user I want to be able to sign out so that no one can access my account
-   As a user I want to be able to change my password so that I can keep my account secure
-   As a user I want to be able to vote on conversation starters so I can give my own feedback
-   As a user I want to be able to delete conversation starters that I have added so that others can no longer see it
-   As a user I want to be able to edit my conversation starters so that I can correct typos

## Wireframes

[Proto.io Wireframe](https://pr.to/1N29MD/)

## API

The API was written in Ruby on Rails, check out the [source code](https://github.com/jim-moody/conversation-starter-api)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
2.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
