---
id: "app-permissions"
hide_title: true
---

# App Permissions

## Status

accepted

## Context

Within the web app different users will have different levels of permissions inside each org, an
admin will be able to toggle functionality on and off for non admin users e.g. access to the
developer section, or the ability to delete a tribe. An admin will also be able to create custom
user groups and assign them different permissions.

There are 2 problems to solve with permissions,

1. Whole pages or sections of the site are blocked
2. Certain interactions on a page are disabled or hidden.

## Decision

To cover the above the problems we suggest the following approach.

### Data shape

The shape of data returned from orca will follow the below pattern.

```flow js
[
	{
		key: 'SchedulingAndTargetingOfExperience.allow',
		groupIds: ['abc123', 'xyz789']
	},
	{
		key: 'SchedulingAndTargetingOfExperience.allow.publish',
		groupIds: ['abc123', 'xyz789']
	},
	{
		key: 'CreationAndMgtOfTemplate.allow',
		groupIds: ['abc123', 'xyz789']
	},
	{
		key: 'CreationAndMgtOfTemplate.allow.delete',
		groupIds: ['abc123', 'xyz789']
	}
];
```

The reason for the above data shape is so we can have a consistent api which simply has the
permission in a nested format and the groups which have this permission.

### Fetching the data

On Sign-in we will fetch the users group and the permissions for that group, delaying the render of
the app until those are fetched. Once we have the data we need we will then allow the app to render.
Reason for preventing render is so we don't see different content flasing on to the screen once we
know if a user has permission.

### Permission Hook

This will basically check if the user is an admin, if admin show the content if not check non admin
permissions against passed in permissions.

Can be used like

```flow js
const hasRights = usePermissions('delete-tribe');

{
	hasRights && <button>Delete Tribe</button>;
}
```

or if you want to block a route

```flow js
 const hasRights = usePermissions('experiences');

 ...
 <switch>
  {hasRights && <Route path={PATH.experiences} />}
</switch>
```

We went with a hook as it feels less verbose than having a component wrapping other components, its
simpler and easier to read.

Its more flexible as well, you can easily pair the perimssions check with some other check as if
needed, or choose to show something if the permission is not met.

If needed we can also extend this down the line to take a group as a param `authors` for example, or
if needed even elevate this up to permissions based on space.

## Consequences

We will have a simple and robust way of checking if a user can view content.
