---
title: A Simple Script for Deploying Code With Github's WebHooks
layout: post
---

Learning source control with Git has completely changed how I build things. I was recently trying to hunt down an easy way to push up new code to my servers rather than sitting in an SSH session repeatedly running `git pull` to grab the latest files.

Enter [WebHooks](https://help.github.com/articles/post-receive-hooks). The idea is that when code gets committed to a repo, Github will send a POST request to a URL. In this (very simple) case, you can have it hit a script that can execute your `git pull` command.

I originally came across [Jonathan Stark's article](http://jonathanstark.com/blog/deploying-code-automatically-with-github-webhooks), but it took some hacking to get everything working, so I thought I'd share how to get this working.

[The latest version of the PHP script will be maintained at this Gist](https://gist.github.com/marcelosomers/8305065).

```php
<?php
/**
  * This script is for easily deploying updates to Github repos to your local server. It will automatically git clone or
  * git pull in your repo directory every time an update is pushed to your $BRANCH (configured below).
  *
  * INSTRUCTIONS:
  * 1. Edit the variables below
  * 2. Upload this script to your server somewhere it can be publicly accessed
  * 3. Make sure the apache user owns this script (e.g., sudo chown www-data:www-data webhook.php)
  * 4. (optional) If the repo already exists on the server, make sure the same apache user from step 3 also owns that
  *    directory (i.e., sudo chown -R www-data:www-data)
  * 5. Go into your Github Repo > Settings > Service Hooks > WebHook URLs and add the public URL
  *    (e.g., http://example.com/webhook.php)
  *
**/

// Set Variables
$LOCAL_ROOT         = "/path/to/repo/parent/directory";
$LOCAL_REPO_NAME    = "REPO_NAME";
$LOCAL_REPO         = "{$LOCAL_ROOT}/{$LOCAL_REPO_NAME}";
$REMOTE_REPO        = "git@github.com:username/reponame.git";
$BRANCH             = "master";

if ( $_POST['payload'] ) {
  // Only respond to POST requests from Github

  if( file_exists($LOCAL_REPO) ) {

    // If there is already a repo, just run a git pull to grab the latest changes
    shell_exec("cd {$LOCAL_REPO} && git pull");

    die("done " . mktime());
  } else {

    // If the repo does not exist, then clone it into the parent directory
    shell_exec("cd {$LOCAL_ROOT} && git clone {$REMOTE_REPO}");

    die("done " . mktime());
  }
}
?>
```

How the script works is that if the Github hook hits the script, it'll check if your repo exists. If it does, it'll `cd` into the directory and run a `git pull`. If the repo doesn't exist, it'll clone it.

Here's how to get things working:

1. Download the script, and configure the variables at the beginning.
2. Upload the script somewhere on your server where it's accessible via http.
3. The apache user must own this script. On my Ubuntu server, this was a matter of running `sudo chown www-data:www-data webhook.php`, where www-data is your apache user and webhook.php is the path to your script (or just the filename if you are in the script's directory).
4. If the repo already exists, the directory and all files in it need to be owned by the same Apache user on step 3. You can do that by running `sudo chown -R www-data:www-data /path/to/repo`.
5. Go into your Github Repo's Settings > Service Hooks > WebHook URLs and add the public URL (i.e., http://example.com/webhook.php)

And voilà! Each time you make a commit to the branch you configured in your `$BRANCH` variable, it should automatically update. To test that things are working, just push up a commit and see if your changed files are updated on the server.

One quick point: changing directory ownership to the apache user means you won't be able to FTP into your server using your personal account and make changes to your file. I set this up a long time ago, but I believe it would help to add your personal user account to the www-data group to allow you to be able to edit your files.

If you're using WordPress and a caching plugin, you will probably have to flush the cache to get changes to show up.

If you're having any issues (I did while I was testing this), you can run `tail -f /path/to/apache/error/log`, and visit your WebHook URL setting page where you can test the hook. This error log will show if there are any problems such as syntax errors in your script.
