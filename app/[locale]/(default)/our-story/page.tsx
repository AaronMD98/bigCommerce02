import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getBlogPosts } from '~/client/queries/get-blog-posts';
import { BlogPostCard } from '~/components/blog-post-card';
import { Link } from '~/components/link';
import { LocaleType } from '~/i18n';

interface Props {
  params: { locale: LocaleType };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const blogPosts = await getBlogPosts(searchParams);

  const title = blogPosts?.name ?? 'Blog';

  return {
    title,
  };
}

export default async function BlogPostPage({ params: { locale }, searchParams }: Props) {
  return (
    <div className="mx-auto max-w-screen-xl">
      <h1>Our Story</h1>
    </div>
  );
}

export const runtime = 'edge';
