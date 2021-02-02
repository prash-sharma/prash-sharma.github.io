# App URL Pathing

To improve the customer and user experience as they traverse through the layers & sections of our
application and platform we should consider **shorter, user friendly (readable) URLs**. These URLs
will need to support **deep linking**.

_The below is a simplification of the data hierarchy for the purpose of url pathing. It doesn't
explain fringe cases._

- **Organization:** will consist of one or more members. It can contain zero or more spaces.
- **Space:** is contextually bound to a parent organization. It is sandboxed to that org.
- **User:** may be a member of zero or more organizations (and spaces).
- **Context:** the system will remember the user's last visited organization, space, etc.

This presents an opportunity for us to decide whether we want our paths to be verbose describing our
hierarchial grouping, or instead be succinct relative to the user's active context.

To begin with let's compare IDs vs Names for our top level data structure: _Organizations_.

#### Unique Resource Identifiers

36 character GUIDs aren't suitable for our resource based URLs. Ideally IDs in our paths will be
betwen 7-12 characters long. _(assuming they can be considered unique with a reasonable amount of
certainty and clash avoidance)._

> This will require collaboration with the backened developers making the micro-services.

_The structure of an ID could potentially differ depending on the data type._

| URL                                                                      | Preference |
| ------------------------------------------------------------------------ | ---------- |
| https://_my_.appcurator.com/org/**8eace563-7939-424c-a761-fff3e8dbf69c** | ❌         |
| https://_my_.appcurator.com/org/**GlaHquq0**                             | ✅         |

Instead of showing an organization ID within our urls we could instead use the name.

| URL                                     | Preference | Notes / Caveats                                                                                                                                        |
| --------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| https://_my_.appcurator.com/**org/bbc** | ✅         | The org prefix could be considered redundant, however it allows us to avoid wildcard naming conflicts with platform reserved paths.                    |
| https://_my_.appcurator.com/**bbc**     | ✅         | React-router will need to handle both known paths and an organization wildcard. Org names will need to be managed to avoid naming conflicts.           |
| https://**bbc**.appcurator.com          | ❓         | Sub-domains look clean but will need to be managed and reserved. If the user switches organizations the sub-domain will change which may seem strange. |

> For this to work we'd need to reserve each organization name on a first-in-first-served basis, or
> alternatively suffix a short id on the end.

The sub domain option is favourable, however it _may_ seem abrupt if/when users switch between
organisations they have membership with, or when they move outside of the organization context (e.g
when managing their own account).

| URL                                        | Suitable | Purpose                                                                               |
| ------------------------------------------ | -------- | ------------------------------------------------------------------------------------- |
| https://**bbc**.appcurator.com             | ☑️       | User has access to BBC organization.                                                  |
| https://**abc**.appcurator.com             | ☑️       | User has access to ABC organiztion.                                                   |
| https://**abc**.appcurator.com/**account** | ❌       | Not suitable to maintain organization sub domain when outside of the org context.     |
| https://_my_.appcurator.com/**account**    | ✅       | User is allowed to manipulate their account, agnostic of any organization membership. |

#### URL Brevity

Going another layer deep allows us to form our opinion.

> Spaces are contextually bound to an organization with unique IDs, so in terms of deep linking, we
> don't necessarily need to include the org within our url.

| URL                                               | Preference | Notes / Caveats                                                                                                     |
| ------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| https://_my_.appcurator.com/**account**           | ✅         | The active user's ID is available via authentication so it doesn't need to be in the url.                           |
| https://_my_.appcurator.com/**bbc**_/space/3kTMd_ | ❔         | The space keyword describes what the ID relates to.                                                                 |
| https://_my_.appcurator.com/**bbc**_/3kTMd_       | ❔         | Orgs contain spaces. The space keyword could be considered redundant since they're sandboxed to a single org.       |
| https://_my_.appcurator.com/**bbc**_/space-name_  | ✅         | We could choose to use the space's name instead of id to match our treatment of organizations.                      |
| https://_my_.appcurator.com/_space/3kTMd_         | ❔         | The organization would need to be inferred from the space's relationship (or a reference inside the Session Token). |
| https://**bbc**.appcurator.com/_space/3kTMd_      | ❔         | Both the organization and space hieracrhy are maintained.                                                           |
| https://**bbc**.appcurator.com/_3kTMd_            | ❔         | Short and sweet, but has the disadvantages of context switching changing the sub-domain.                            |

### Pathing: Organization Context / Reference

| URL                                          | Suitable | Notes / Caveats                                                                |
| -------------------------------------------- | -------- | ------------------------------------------------------------------------------ |
| https://my.appcurator.com/bbc/space/GlaHquq0 | ✅       | N/A                                                                            |
| https://my.appcurator.com/space/GlaHquq0     | ❌       | Organization relationship looked up via reference contained with Session Token |
| https://bbc.appcurator.com/space/GlaHquq0    | ❌       | App / react-router could infer Orgnaization from sub-domain.                   |

### Sub Domains vs Paths

Organization sub-domains look aesthetically more pleasing and can shorten the URL length however
they add additional complexity and overhead by requiring the reservation, assignment, and management
of the sub domains in our system.

- With sub-domains if multiple registered companies have the same name they would be treated as
  first-in-first-served due to the necessity of unique pathing to differientiate themselves.
- With pathing the above situation may be irrelevant depending on whether we use organisation ids or
  whether we include the organisation name in the path but request based on org ID under the hood.
- The system would need to pre-reserve sub domains for the various pieces of our platform (my,
  marketing, dev portals, etc). \* Adding future platform pieces later on may mean the sub domain we
  want has been already been snagged by a customer.

> The above reservation and naming conflict prevent would also apply to organization names within
> the path too.

#### Customer Owned Domains

It's possible some of our customers may wish to create their own CNAME records pointing at our
system.

Because CNAMEs can only point to IP addresses and hostnames that would lend itself to the sub domain
approach to avoid duplication of the customer's domain and their organisation name within our
system. e.g.

| Customer Domain                     | Our Domain                             | Suitable | Notes / Caveats                                                       |
| ----------------------------------- | -------------------------------------- | -------- | --------------------------------------------------------------------- |
| https://appcurator.**bbc**.com      | https://**bbc**.appcurator.com         | ✅       | One to one mapping is achieved successfully.                          |
| https://appcurator.**bbc.com/bbc/** | https://**my**.appcurator.com/**bbc**/ | ❌       | Undesired repitition of the organization name in the domain and path. |

> If we don't support sub domains then customer CNAMEs won't be possible. This isn't a deal breaker.

#### Current Users vs Administering Users

The pathing for the same resource may differ depending on context. When you're editing your own
account there is no need to see your user id. When managing another user's profile or membership the
active user needs to see the profile id of the user they're editing.

| Domain                                              | Context                                                     |
| --------------------------------------------------- | ----------------------------------------------------------- |
| https://_my_.appcurator.com/**account**             | No need to see your user id in the path.                    |
| https://_my_.appcurator.com/bbc/members/**12jhqsd** | Will need to see user id in the path when reviewing others. |

### Industry Examples

| Company | Customer Domain                                                                | Type                   | ID                                       |
| ------- | ------------------------------------------------------------------------------ | ---------------------- | ---------------------------------------- |
| Github  | https://github.com/**mikestead**                                               | username wildcard path | unique username                          |
| Github  | https://github.com/**massiveinteractive**                                      | org wildcard path      | unique organization name                 |
| Github  | https://github.com/**massiveinteractive**/repository/commits                   | `""`                   | N/A                                      |
| Github  | https://github.com/_orgs_/**massiveinteractive**/projects                      | orgs prefix path       | N/A                                      |
| Github  | https://github.com/_orgs_/**massiveinteractive**/teams                         | `""`                   | N/A                                      |
| Github  | https://github.com/_orgs_/**massiveinteractive**/people                        | `""`                   | N/A                                      |
| Github  | https://github.com/settings/profile                                            | N/A                    | user id inferred through authentication. |
| Github  | https://github.com/settings/organizations                                      | N/A                    | `""`                                     |
| Slack   | https://**massive**.slack.com**/messages/C02516BKS/**                          | sub-domain             | 9 chars                                  |
| Slack   | https://**massive**.slack.com**/account/settings**                             | sub-domain             | N/A                                      |
| Slack   | https://**massive**.slack.com**/account/team**                                 | sub-domain             | N/A                                      |
| JIRA    | https://**appcurator**.atlassian.net/                                          | sub-domain             | N/A                                      |
| JIRA    | https://**appcurator**.atlassian.net/projects/**ACF**/issues                   | space abbreviation     | 3-6 chars                                |
| JIRA    | https://**appcurator**.atlassian.net/browse/**ACF**-104                        | space abbr prefix      | `""`                                     |
| JIRA    | https://**appcurator**.atlassian.net/secure/RapidBoard.jspa?projectKey=**ACF** | query string param     | `""`                                     |
| JIRA    | https://**id**.atlassian.com/profile/profile.action                            | sub-domain             | N/A                                      |
