import { SITE_URL, ORG_NAME, DEFAULT_DESCRIPTION, CONTACT, getAllPosts } from '../../lib/seo';

export const revalidate = 3600;

// llms.txt (https://llmstxt.org): a plain summary of the site for AI assistants
export async function GET() {
  const posts = await getAllPosts();

  const pages = [
    ['Home', '/', 'Overview of our cosmetic chemistry R&D lab and contract manufacturing'],
    ['Services', '/services', 'Formulation, product development and manufacturing services'],
    ['About', '/about-us', 'Our team of cosmetic chemists and formulators'],
    ['FAQ', '/faq', 'Common questions about formulation, timelines and manufacturing'],
    ['Contact', '/contact', 'Start a project or request a free consultation'],
    ['Join Our Network', '/join', 'For cosmetic chemists and formulators who want to join our network'],
  ];

  const lines = [
    `# ${ORG_NAME} (CosmeticChemist.com)`,
    '',
    `> ${DEFAULT_DESCRIPTION}`,
    '',
    `Based in ${CONTACT.locality}, ${CONTACT.region}. Contact: ${CONTACT.email}, ${CONTACT.phone}.`,
    '',
    '## Pages',
    '',
    ...pages.map(([title, path, desc]) => `- [${title}](${SITE_URL}${path === '/' ? '' : path}): ${desc}`),
  ];

  if (posts.length) {
    lines.push('', '## Blog', '');
    posts.forEach((post) => {
      const desc = post.meta?.description ? `: ${post.meta.description.trim()}` : '';
      lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug || post.id})${desc}`);
    });
  }

  lines.push(
    '',
    '## Optional',
    '',
    `- [Privacy Policy](${SITE_URL}/privacy-policy)`,
    `- [Terms of Service](${SITE_URL}/term-service)`,
    `- [Cookie Policy](${SITE_URL}/cookie-policy)`,
    ''
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
