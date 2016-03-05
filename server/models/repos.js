'use strict';
const DateDiff = require('date-diff');
const Promise = require('bluebird');
const _ = require('lodash');
var dateFormat = require('dateformat');
var db = require('../db/database');

var Repos = function() {
  this._repos = [];
  this._lastUpdateDate = new Date('1/1/2015');
};

Repos.prototype.getRepos = function () {
  var self = this;
  var hoursSinceLastFetch = new DateDiff(new Date(), this._lastUpdateDate).hours();

  if (this._repos.length === 0 ||
   hoursSinceLastFetch > 1) {
    return db.raw(`select * from repos`)
            .then((results) => {
              var RowDataArray = Object.keys(results[0]).map(k => results[0][k]);
              this._repos = RowDataArray.map(RowData => {
                var regObj = {};
                Object.keys(RowData).forEach(key => regObj[key] = RowData[key]);
                return regObj;
              })
              this._lastUpdateDate = new Date();
              return this._repos;
            });
  } else {
    return new Promise((resolve) => resolve(this._repos));
  }
};

var convertRepoToDbRepo = function(obj, headers) {
  //reduce down to properties we care about
  obj = _.pick(obj, ['id','name','language','description','stargazers_count',
          'watchers_count', 'has_wiki', 'has_pages','open_issues','forks','created_at',
          'updated_at','pushed_at','html_url']);
  _.each(obj, function(value, key) {
    if(typeof value === "boolean") {
      obj[key] = Number(value);
    }
  });

  //Convert dates to JS dates so knex can reconvert back to mysql
  var mysqlDateFormat = 'yyyy-mm-dd HH:MM:ss';
  obj.created_at = dateFormat(obj.created_at, mysqlDateFormat);
  obj.updated_at = dateFormat(obj.updated_at, mysqlDateFormat);
  obj.pushed_at = dateFormat(obj.pushed_at, mysqlDateFormat);
  obj.data_refreshed_at = dateFormat(new Date(), mysqlDateFormat);


  //Parse repo and org name out of URL
  var repoPath = path.parse(obj.html_url);
  obj.org_name = path.parse(repoPath.dir).base;

  //Add header information if provided
  if (headers) {
    obj.etag = headers.etag;
  }

  return obj;
};

Repos.prototype.insertRepoAsync = function() {
    var repo = testRepo;
    repo = convertRepoToDbRepo(repo);
    // Function to map user properties to usable SQL strings
    let userKeys = [];
    let userVals = [];
     _.each(repo,(val,key) => {
      userKeys.push( key + '');
      userVals.push( '"' + val + '"');
     })
    return db.raw(`INSERT INTO repos ( ${userKeys.join()} ) VALUES (${userVals.join()})`)
}

Repos.prototype.getRepoByIdAsync = function(repo_id) {
  return db.raw(`SELECT * FROM repos WHERE id = ${repo_id};`)
           .then((results) => {
            if(results[0][0]){
              Object.keys(results[0][0]).forEach((key) => {
                this._repos[key] = results[0][0][key];
              });
            }
            return this._repos;
           });
}

module.exports = Repos;

var testRepo = JSON.parse('{"id":53220481,"name":"test123","full_name":"orlandoc01/test123","owner":{"login":"orlandoc01","id":14842987,"avatar_url":"https://avatars.githubusercontent.com/u/14842987?v=3","gravatar_id":"","url":"https://api.github.com/users/orlandoc01","html_url":"https://github.com/orlandoc01","followers_url":"https://api.github.com/users/orlandoc01/followers","following_url":"https://api.github.com/users/orlandoc01/following{/other_user}","gists_url":"https://api.github.com/users/orlandoc01/gists{/gist_id}","starred_url":"https://api.github.com/users/orlandoc01/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/orlandoc01/subscriptions","organizations_url":"https://api.github.com/users/orlandoc01/orgs","repos_url":"https://api.github.com/users/orlandoc01/repos","events_url":"https://api.github.com/users/orlandoc01/events{/privacy}","received_events_url":"https://api.github.com/users/orlandoc01/received_events","type":"User","site_admin":false},"private":false,"html_url":"https://github.com/orlandoc01/test123","description":"good first bug, beginer, easy, easyfix, good-first-pr, goodfirst-issue, first-timers-only, easy pic","fork":false,"url":"https://api.github.com/repos/orlandoc01/test123","forks_url":"https://api.github.com/repos/orlandoc01/test123/forks","keys_url":"https://api.github.com/repos/orlandoc01/test123/keys{/key_id}","collaborators_url":"https://api.github.com/repos/orlandoc01/test123/collaborators{/collaborator}","teams_url":"https://api.github.com/repos/orlandoc01/test123/teams","hooks_url":"https://api.github.com/repos/orlandoc01/test123/hooks","issue_events_url":"https://api.github.com/repos/orlandoc01/test123/issues/events{/number}","events_url":"https://api.github.com/repos/orlandoc01/test123/events","assignees_url":"https://api.github.com/repos/orlandoc01/test123/assignees{/user}","branches_url":"https://api.github.com/repos/orlandoc01/test123/branches{/branch}","tags_url":"https://api.github.com/repos/orlandoc01/test123/tags","blobs_url":"https://api.github.com/repos/orlandoc01/test123/git/blobs{/sha}","git_tags_url":"https://api.github.com/repos/orlandoc01/test123/git/tags{/sha}","git_refs_url":"https://api.github.com/repos/orlandoc01/test123/git/refs{/sha}","trees_url":"https://api.github.com/repos/orlandoc01/test123/git/trees{/sha}","statuses_url":"https://api.github.com/repos/orlandoc01/test123/statuses/{sha}","languages_url":"https://api.github.com/repos/orlandoc01/test123/languages","stargazers_url":"https://api.github.com/repos/orlandoc01/test123/stargazers","contributors_url":"https://api.github.com/repos/orlandoc01/test123/contributors","subscribers_url":"https://api.github.com/repos/orlandoc01/test123/subscribers","subscription_url":"https://api.github.com/repos/orlandoc01/test123/subscription","commits_url":"https://api.github.com/repos/orlandoc01/test123/commits{/sha}","git_commits_url":"https://api.github.com/repos/orlandoc01/test123/git/commits{/sha}","comments_url":"https://api.github.com/repos/orlandoc01/test123/comments{/number}","issue_comment_url":"https://api.github.com/repos/orlandoc01/test123/issues/comments{/number}","contents_url":"https://api.github.com/repos/orlandoc01/test123/contents/{+path}","compare_url":"https://api.github.com/repos/orlandoc01/test123/compare/{base}...{head}","merges_url":"https://api.github.com/repos/orlandoc01/test123/merges","archive_url":"https://api.github.com/repos/orlandoc01/test123/{archive_format}{/ref}","downloads_url":"https://api.github.com/repos/orlandoc01/test123/downloads","issues_url":"https://api.github.com/repos/orlandoc01/test123/issues{/number}","pulls_url":"https://api.github.com/repos/orlandoc01/test123/pulls{/number}","milestones_url":"https://api.github.com/repos/orlandoc01/test123/milestones{/number}","notifications_url":"https://api.github.com/repos/orlandoc01/test123/notifications{?since,all,participating}","labels_url":"https://api.github.com/repos/orlandoc01/test123/labels{/name}","releases_url":"https://api.github.com/repos/orlandoc01/test123/releases{/id}","deployments_url":"https://api.github.com/repos/orlandoc01/test123/deployments","created_at":"2016-03-05T19:57:45Z","updated_at":"2016-03-05T20:01:13Z","pushed_at":"2016-03-05T20:02:11Z","git_url":"git://github.com/orlandoc01/test123.git","ssh_url":"git@github.com:orlandoc01/test123.git","clone_url":"https://github.com/orlandoc01/test123.git","svn_url":"https://github.com/orlandoc01/test123","homepage":null,"size":1742,"stargazers_count":0,"watchers_count":0,"language":"JavaScript","has_issues":true,"has_downloads":true,"has_wiki":true,"has_pages":false,"forks_count":1,"mirror_url":null,"open_issues_count":1,"forks":1,"open_issues":1,"watchers":0,"default_branch":"master","network_count":1,"subscribers_count":1}');
