import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

// Cache tags used in the application
// - 'products' - All product listings
// - 'product-{id}' - Individual product page
// - 'collections' - All collection pages
// - 'collection-{slug}' - Individual collection page
// - 'home' - Homepage data

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret, tag, path, type = 'tag' } = body;

    // Secret validation disabled for now

    // Handle revalidation based on type
    if (type === 'tag' && tag) {
      // Can accept single tag or array of tags
      const tags = Array.isArray(tag) ? tag : [tag];

      for (const t of tags) {
        revalidateTag(t);
       
      }

      return NextResponse.json({
        success: true,
        message: `Revalidated tags: ${tags.join(', ')}`,
        revalidated: tags,
        timestamp: Date.now(),
      });
    }

    if (type === 'path' && path) {
      // Can accept single path or array of paths
      const paths = Array.isArray(path) ? path : [path];

      for (const p of paths) {
        revalidatePath(p);
       
      }

      return NextResponse.json({
        success: true,
        message: `Revalidated paths: ${paths.join(', ')}`,
        revalidated: paths,
        timestamp: Date.now(),
      });
    }

    // Revalidate all - useful for full site refresh
    if (type === 'all') {
      const allTags = ['products', 'collections', 'home'];
      const allPaths = ['/', '/collections', '/products'];

      for (const t of allTags) {
        revalidateTag(t);
      }

      for (const p of allPaths) {
        revalidatePath(p);
      }

      return NextResponse.json({
        success: true,
        message: 'Revalidated all cached data',
        revalidatedTags: allTags,
        revalidatedPaths: allPaths,
        timestamp: Date.now(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request. Provide either tag or path with type.',
        usage: {
          tagExample: { secret: 'your-secret', type: 'tag', tag: 'products' },
          pathExample: { secret: 'your-secret', type: 'path', path: '/products/P12345678901' },
          multipleTagsExample: { secret: 'your-secret', type: 'tag', tag: ['products', 'collections'] },
          allExample: { secret: 'your-secret', type: 'all' },
        }
      },
      { status: 400 }
    );

  } catch (error) {
   
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// GET endpoint for simple path-based revalidation via URL
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const tag = searchParams.get('tag');
    const path = searchParams.get('path');

    // Secret validation disabled for now

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        success: true,
        message: `Revalidated tag: ${tag}`,
        timestamp: Date.now(),
      });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        success: true,
        message: `Revalidated path: ${path}`,
        timestamp: Date.now(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Provide either tag or path query parameter',
        usage: '/api/revalidate?secret=your-secret&tag=products'
      },
      { status: 400 }
    );

  } catch (error) {
  
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}