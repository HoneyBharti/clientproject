import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { NavHeader } from "@/components/layout/page-header";
import { AppFooter } from "@/components/layout/page-footer";
import { API_BASE_URL } from "@/lib/api-base";

const createPlaceholderImage = (title: string) =>
  `https://placehold.co/1200x600/e2e8f0/0f172a?text=${encodeURIComponent(title.slice(0, 32) || "Blog")}`;

const loadBlog = async (slug: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${encodeURIComponent(slug)}`, { cache: "no-store" });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.blog) {
      return null;
    }
    return data.blog;
  } catch (error) {
    return null;
  }
};

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await loadBlog(params.slug);
  if (!blog) {
    redirect(`/blog/${params.slug}?legacy=1`);
  }
  if (blog.status && blog.status !== "published") {
    notFound();
  }

  const authorName =
    String(blog.authorName || "").trim() ||
    (typeof blog.author === "string"
      ? blog.author
      : blog.author?.name || blog.author?.email || "YourLegal Team");
  const publishedAt = blog.publishedAt || blog.createdAt || blog.updatedAt;
  const publishedLabel = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "Recent";

  return (
    <div className="min-h-screen bg-white font-inter">
      <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/blog" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
              <- Back to Blog
            </Link>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-8">
            By {authorName} | {publishedLabel}
          </p>

          <div className="overflow-hidden rounded-2xl border border-gray-200 mb-10">
            <img
              src={blog.featuredImage || createPlaceholderImage(blog.title || "Blog")}
              alt={blog.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
