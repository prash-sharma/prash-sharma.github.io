---
id: "deployments"
hide_title: true
---

# Deployments

## Status

accepted

## Context

The modularity of our web application affords us the ability to speed up the deployment process.

By avoiding the deployment of modules which haven't changed since the previous release, or in the
context of rollbacks, modules which are still deployed and available, we can maintain a quick
deployment pipeline as features increase.

## Decision

Deployments may take place away from the source of the web app repository, so steps involved should
only depend on released NPM modules and deployment scripts.

The steps involved for each deployment are as follows.

1.  Pull down and unpack the `shell` module from NPM. If no version is specified we pull down the
    latest otherwise target the version defined. e.g. `npm pack @appcurator/shell@1.0.0-1802.1`
1.  In the unpacked `dist` folder of `shell` will be a `package.json` this defines all ui modules
    required and their explicit versions.
1.  Run `npm install --production --no-optional` or `yarn install --production --ignore-optional` in
    the `dist` folder to pull down these packages.
1.  For each package pulled down determine its short name. For example if the name is
    `@appcurator/header` then the short name is `header`.
1.  For each package collect the names of all assets in their `dist` directory and associate these
    with their short name. We'll upload assets to an S3 bucket pathed under their short name e.g.
    `dist/index.4da23f.js` -> `header/index.4da23f.js`
1.  For each content hashed filename (i.e. `<name>.<7-char-hash>.<ext>`) do a `HEAD` request to see
    if it's already deployed to the S3 bucket. If so move on, otherwise uploaded it. For any
    non-hashed filename always upload.
1.  When uploading files set their `Cache-Control` lifespan to 1 year if they have a content hashed
    filename, otherwise give them a `no-cache, no-store` lifespan.
1.  Upload any assets under `dist/pub` of the `shell` module to the root of the S3 bucket.
1.  Finally populate the `dist/index.template.html` file in the `shell` package with references to
    these freshly deployed assets and upload it as `index.html` to the root of the `S3` bucket.

## Consequences

Using `NPM` to pull down packages allows us to leverage its inbuilt cache mechanism to avoid
downloading modules previously deployed.

Providing the `--production` and `--no-optional` arguments when installing packages will avoid
downloading any indirect dependencies. Instead we only download the prepared assets to be uploaded
during deployment.

By doing HEAD checks where feasible we can avoid costly upload times of assets previously deployed.

These measures should improve deployment times and maintain these as we scale to many more modules.
