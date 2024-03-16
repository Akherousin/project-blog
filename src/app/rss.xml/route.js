import { getBlogPostList } from '@/helpers/file-helpers';
import RSS from 'rss';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/constants';

export async function GET() {
  const blogPosts = await getBlogPostList();

  const feed = new RSS({ title: BLOG_TITLE, description: BLOG_DESCRIPTION });

  blogPosts.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.abstract,
      date: article.publishedOn,
      url: article.slug,
    });
  });

  const xml = feed.xml({ indent: true });

  return new Response(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  });
}
