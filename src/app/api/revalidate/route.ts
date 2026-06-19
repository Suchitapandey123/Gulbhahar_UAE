import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gulbhahar.com';
const CF_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

async function purgeCloudflareCache(paths?: string[]) {
  if (!CF_ZONE_ID || !CF_API_TOKEN) return null;

  const body = paths
    ? { files: paths.map((p) => `${SITE_URL}${p}`) }
    : { purge_everything: true };

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  return res.ok;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tag, path, type = 'tag' } = body;

    if (type === 'tag' && tag) {
      const tags = Array.isArray(tag) ? tag : [tag];

      for (const t of tags) {
        revalidateTag(t);
      }

      // Tag-based: purge everything since we can't map tags to exact URLs
      const cfPurged = await purgeCloudflareCache();

      return NextResponse.json({
        success: true,
        message: `Revalidated tags: ${tags.join(', ')}`,
        revalidated: tags,
        cloudflarePurged: cfPurged,
        timestamp: Date.now(),
      });
    }

    if (type === 'path' && path) {
      const paths: string[] = Array.isArray(path) ? path : [path];

      for (const p of paths) {
        revalidatePath(p);
      }

      const cfPurged = await purgeCloudflareCache(paths);

      return NextResponse.json({
        success: true,
        message: `Revalidated paths: ${paths.join(', ')}`,
        revalidated: paths,
        cloudflarePurged: cfPurged,
        timestamp: Date.now(),
      });
    }

    if (type === 'all') {
      const allTags = ['products', 'collections', 'home'];
      const allPaths = ['/', '/collections', '/products'];

      for (const t of allTags) {
        revalidateTag(t);
      }

      for (const p of allPaths) {
        revalidatePath(p);
      }

      const cfPurged = await purgeCloudflareCache();

      return NextResponse.json({
        success: true,
        message: 'Revalidated all cached data',
        revalidatedTags: allTags,
        revalidatedPaths: allPaths,
        cloudflarePurged: cfPurged,
        timestamp: Date.now(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request. Provide either tag or path with type.',
        usage: {
          tagExample: { type: 'tag', tag: 'products' },
          pathExample: { type: 'path', path: '/products/P12345678901' },
          multipleTagsExample: { type: 'tag', tag: ['products', 'collections'] },
          allExample: { type: 'all' },
        },
      },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const path = searchParams.get('path');

    if (tag) {
      revalidateTag(tag);
      const cfPurged = await purgeCloudflareCache();
      return NextResponse.json({
        success: true,
        message: `Revalidated tag: ${tag}`,
        cloudflarePurged: cfPurged,
        timestamp: Date.now(),
      });
    }

    if (path) {
      revalidatePath(path);
      const cfPurged = await purgeCloudflareCache([path]);
      return NextResponse.json({
        success: true,
        message: `Revalidated path: ${path}`,
        cloudflarePurged: cfPurged,
        timestamp: Date.now(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Provide either tag or path query parameter',
        usage: '/api/revalidate?tag=products',
      },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}