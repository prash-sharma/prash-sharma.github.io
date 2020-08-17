module.exports = {
  title: 'mtribes',
  tagline: 'Everything you need to get mtribes integrated',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'prash-sharma', // Usually your GitHub org/user name.
  projectName: 'docusaurus-v2', // Usually your repo name.
  themeConfig: {
    sidebarCollapsible: false,
    navbar: {
      title: 'Developers',
      logo: {
        alt: 'mtribes Logo',
        src: 'img/logo.svg',
      },
      
      items: [
        {
          to: 'docs/sdk/getting-started',
          activeBasePath: 'docs/sdk',
          label: 'SDKs',
          position: 'right',
        },
        {
          to: 'docs/platform/getting-started',
          activeBasePath: 'docs/platform',
          label: 'Platform', 
          position: 'right'
        },
        {
          to: 'docs/announcements', 
          activeBasePath: 'docs/announcements',
          label: 'Announcements', 
          position: 'right'
        },
        
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Quick Links',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/sdk/getting-started',
            },
            {
              label: 'Platform API',
              to: 'docs/doc1/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/mtribes',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/mtribes',
            },
            
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/mtribes',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/mtribes',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Deltatre`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: '_index',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
