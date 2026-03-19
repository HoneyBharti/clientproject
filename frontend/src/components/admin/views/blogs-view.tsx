import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Bold, Eye, Heading1, Italic, Pencil, Plus, Search, Trash2, List } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import type { AdminViewContext } from "./types";

type BlogStatus = "draft" | "published" | "archived";

type BlogRecord = {
  id: string;
  title: string;
  slug: string;
  image: string;
  shortDescription: string;
  fullContent: string;
  author: string;
  category: string;
  country?: string;
  tags: string[];
  status: BlogStatus;
  featured?: boolean;
  createdAt: string;
  source?: "static" | "db";
};

type BlogFormState = {
  title: string;
  slug: string;
  image: string;
  shortDescription: string;
  fullContent: string;
  author: string;
  category: string;
  country: string;
  tags: string;
  status: BlogStatus;
  featured: boolean;
};

const categoryOptions = ["Tax", "Compliance", "Formation", "Bookkeeping", "Business Guides"];
const countryOptions = ["Global", "USA", "UK", "UAE", "India", "Singapore", "Australia", "Netherlands", "Saudi Arabia"];

const statusClass: Record<BlogStatus, string> = {
  draft: "bg-amber-100 text-amber-700 border-amber-200",
  published: "bg-emerald-100 text-emerald-700 border-emerald-200",
  archived: "bg-slate-100 text-slate-700 border-slate-200",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const createPlaceholderImage = (label: string) =>
  `https://placehold.co/160x96/e2e8f0/0f172a?text=${encodeURIComponent(label.slice(0, 24) || "Blog")}`;

const createEmptyForm = (): BlogFormState => ({
  title: "",
  slug: "",
  image: "",
  shortDescription: "",
  fullContent: "<p>Start writing your blog content here.</p>",
  author: "",
  category: "Tax",
  country: "Global",
  tags: "",
  status: "draft",
  featured: false,
});

const buildInitialBlogs = (contentQueue: any[]): BlogRecord[] => {
  const descriptions = [
    "A practical compliance checklist for founders managing sales tax responsibilities across US states.",
    "Key deadlines, required filings, and preparation advice for UAE corporate tax submissions.",
    "A founder-focused comparison of expansion structures, legal exposure, and operational overhead.",
  ];
  const categories = ["Tax", "Compliance", "Business Guides"];
  const tags = [
    ["sales tax", "usa", "compliance"],
    ["uae", "corporate tax", "filing"],
    ["netherlands", "bv", "branch"],
  ];

  return contentQueue
    .filter((item) => item.type === "blog")
    .map((item, index) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      image: createPlaceholderImage(item.title),
      shortDescription: descriptions[index] ?? "Editorial draft prepared for admin publishing workflow.",
      fullContent: `<h2>${item.title}</h2><p>${descriptions[index] ?? "Editorial draft prepared for admin publishing workflow."}</p><p>This article is currently managed from the admin dashboard and can be edited, reviewed, and published by the content team.</p>`,
      author: String(item.owner).split(" ")[0] || "Admin",
      category: categories[index] ?? "Tax",
      tags: tags[index] ?? ["legal", "business"],
      status: item.stage === "published" ? "published" : "draft",
      createdAt: item.updatedAt,
    }));
};

const toFormState = (blog: BlogRecord): BlogFormState => ({
  title: blog.title,
  slug: blog.slug,
  image: blog.image,
  shortDescription: blog.shortDescription,
  fullContent: blog.fullContent,
  author: blog.author,
  category: blog.category,
  country: blog.country || "Global",
  tags: blog.tags.join(", "),
  status: blog.status,
  featured: Boolean(blog.featured),
});

export function BlogsView({ ctx }: { ctx: AdminViewContext }) {
  const { contentQ, setContentQ, d, blogs, createBlog, updateBlog, deleteBlog } = ctx;
  const blogRecords: BlogRecord[] = blogs || [];
  const [statusFilter, setStatusFilter] = useState<"all" | BlogStatus>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormState>(createEmptyForm);
  const [imageInputKey, setImageInputKey] = useState(0);
  const [formMessage, setFormMessage] = useState("");
  const [viewBlog, setViewBlog] = useState<BlogRecord | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<BlogRecord | null>(null);

  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== form.fullContent) {
      editorRef.current.innerHTML = form.fullContent;
    }
  }, [form.fullContent]);

  const filteredBlogs = useMemo(
    () =>
      blogRecords.filter((blog) => {
        const matchesQuery = [blog.title, blog.slug, blog.author, blog.category, blog.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(contentQ.toLowerCase());
        const matchesStatus = statusFilter === "all" || blog.status === statusFilter;
        return matchesQuery && matchesStatus;
      }),
    [blogRecords, contentQ, statusFilter]
  );

  const blogMetrics = useMemo(
    () => ({
      total: blogRecords.length,
      published: blogRecords.filter((blog) => blog.status === "published").length,
      drafts: blogRecords.filter((blog) => blog.status === "draft").length,
    }),
    [blogRecords]
  );

  const resetForm = () => {
    setEditingId(null);
    setForm(createEmptyForm());
    setImageInputKey((prev) => prev + 1);
    setFormMessage("");
  };

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugify(value),
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: fileUrl }));
    setFormMessage(`Image file "${file.name}" selected.`);
  };

  const applyEditorCommand = (command: "bold" | "italic" | "insertUnorderedList", value?: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    setForm((prev) => ({ ...prev, fullContent: editorRef.current?.innerHTML || prev.fullContent }));
  };

  const applyHeading = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand("formatBlock", false, "h2");
    setForm((prev) => ({ ...prev, fullContent: editorRef.current?.innerHTML || prev.fullContent }));
  };

  const handleSaveBlog = async () => {
    if (!form.title.trim() || !form.shortDescription.trim() || !form.fullContent.trim() || !form.author.trim() || !form.category.trim()) {
      setFormMessage("Complete title, description, content, author, and category before saving.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      slug: slugify(form.slug || form.title),
      featuredImage: form.image.trim() || createPlaceholderImage(form.title),
      excerpt: form.shortDescription.trim(),
      content: form.fullContent,
      authorName: form.author.trim(),
      category: form.category.trim(),
      country: form.country.trim(),
      featured: Boolean(form.featured),
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      status: form.status,
    };

    if (editingId && !editingId.startsWith("static:")) {
      const result = await updateBlog(editingId, payload);
      if (!result.success) {
        setFormMessage(result.error || "Unable to update blog.");
        return;
      }
      setFormMessage(`Blog "${payload.title}" updated.`);
    } else {
      const result = await createBlog(payload);
      if (!result.success) {
        setFormMessage(result.error || "Unable to create blog.");
        return;
      }
      setFormMessage(`Blog "${payload.title}" created.`);
    }

    setEditingId(null);
    setForm(createEmptyForm());
    setImageInputKey((prev) => prev + 1);
  };

  const handleEditBlog = (blog: BlogRecord) => {
    setEditingId(blog.id);
    setForm(toFormState(blog));
    setFormMessage("");
  };

  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;
    if (blogToDelete.id.startsWith("static:")) {
      const payload = {
        title: blogToDelete.title,
        slug: blogToDelete.slug,
        featuredImage: blogToDelete.image || createPlaceholderImage(blogToDelete.title),
        excerpt: blogToDelete.shortDescription || "",
        content: blogToDelete.shortDescription
          ? `<p>${blogToDelete.shortDescription}</p>`
          : "<p>Archived legacy blog.</p>",
        authorName: blogToDelete.author || "YourLegal Team",
        category: blogToDelete.category || "General",
        country: blogToDelete.country || "Global",
        tags: blogToDelete.tags || [],
        status: "archived",
        featured: false,
      };
      const result = await createBlog(payload);
      if (!result.success) {
        setFormMessage(result.error || "Unable to archive legacy blog.");
        return;
      }
      setFormMessage(`Legacy blog "${blogToDelete.title}" archived.`);
      setBlogToDelete(null);
      return;
    }
    const result = await deleteBlog(blogToDelete.id);
    if (!result.success) {
      setFormMessage(result.error || "Unable to delete blog.");
      return;
    }
    if (editingId === blogToDelete.id) {
      resetForm();
    }
    setFormMessage(`Blog "${blogToDelete.title}" deleted.`);
    setBlogToDelete(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs sm:text-sm">Total Blogs</CardDescription>
            <CardTitle className="text-xl sm:text-2xl">{blogMetrics.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs sm:text-sm">Published</CardDescription>
            <CardTitle className="text-xl sm:text-2xl text-emerald-700">{blogMetrics.published}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs sm:text-sm">Drafts</CardDescription>
            <CardTitle className="text-xl sm:text-2xl text-amber-700">{blogMetrics.drafts}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-[1fr,1.5fr]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="flex-1">
                  <CardTitle className="text-lg sm:text-xl">{editingId ? "Edit Blog" : "Create Blog"}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Manage title, slug, media, content, and publish status.</CardDescription>
                </div>
                <Button className="w-full sm:w-auto sm:shrink-0" variant="outline" size="sm" onClick={resetForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Blog
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Title</p>
              <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Enter blog title" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Slug</p>
              <Input value={form.slug} onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))} placeholder="auto-generated-slug" />
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">Blog Image URL</p>
                <Input value={form.image} onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))} placeholder="https://example.com/image.jpg" className="text-sm" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Upload Image</p>
                <Input key={imageInputKey} type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border bg-slate-50">
              <img
                src={form.image || createPlaceholderImage(form.title || "Blog Preview")}
                alt={form.title || "Blog preview"}
                className="h-32 w-full object-cover sm:h-40 md:h-44"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Short Description</p>
              <Textarea
                value={form.shortDescription}
                onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value }))}
                placeholder="Write a short summary for the blog card and listing."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <p className="text-sm font-medium">Full Content</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => applyHeading()} className="h-8 px-2.5">
                    <Heading1 className="h-3.5 w-3.5" />
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => applyEditorCommand("bold")} className="h-8 px-2.5">
                    <Bold className="h-3.5 w-3.5" />
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => applyEditorCommand("italic")} className="h-8 px-2.5">
                    <Italic className="h-3.5 w-3.5" />
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => applyEditorCommand("insertUnorderedList")} className="h-8 px-2.5">
                    <List className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setForm((prev) => ({ ...prev, fullContent: e.currentTarget?.innerHTML || prev.fullContent }))}
                className="min-h-[180px] sm:min-h-[220px] rounded-lg border bg-white p-3 sm:p-4 text-sm leading-6 sm:leading-7 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Author Name</p>
                <Input value={form.author} onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))} placeholder="Author name" className="text-sm" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Category</p>
                <Select value={form.category} onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}>
                  <SelectTrigger className="text-sm"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Country</p>
                <Select value={form.country} onValueChange={(value) => setForm((prev) => ({ ...prev, country: value }))}>
                  <SelectTrigger className="text-sm"><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">Tags</p>
                <Input value={form.tags} onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))} placeholder="tax, compliance, founders" className="text-sm" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Publish Status</p>
                <Select value={form.status} onValueChange={(value: BlogStatus) => setForm((prev) => ({ ...prev, status: value }))}>
                  <SelectTrigger className="text-sm"><SelectValue placeholder="Publish status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Feature this post on the blog homepage
            </label>

            {formMessage ? (
              <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">
                {formMessage}
              </div>
            ) : null}

            <Button className="w-full" onClick={handleSaveBlog}>
              {editingId ? "Update Blog" : "Create Blog"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Admin Blog Dashboard</CardTitle>
            <CardDescription className="text-xs sm:text-sm">See all blogs, preview them, and manage content lifecycle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-[1fr,auto]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 text-sm" placeholder="Search title, slug, author, category or tags" value={contentQ} onChange={(e) => setContentQ(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "all" | BlogStatus)}>
                <SelectTrigger className="w-full sm:w-[180px] text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto rounded-lg border">
              <Table className="min-w-[880px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Blog</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBlogs.length ? (
                    filteredBlogs.map((blog) => (
                      <TableRow key={blog.id}>
                        <TableCell>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <img src={blog.image} alt={blog.title} className="h-12 w-16 sm:h-14 sm:w-20 rounded-md object-cover shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 text-sm sm:text-base">{blog.title}</p>
                              <p className="break-all text-xs text-muted-foreground">/{blog.slug}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[280px] whitespace-normal break-words text-xs sm:text-sm text-muted-foreground">
                          {blog.shortDescription}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{d(blog.createdAt)}</TableCell>
                        <TableCell>
                          <Badge className={cn("border capitalize text-xs", statusClass[blog.status])}>{blog.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditBlog(blog)} className="h-8 px-2 sm:px-3">
                              <Pencil className="mr-1 sm:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              <span className="text-xs">Edit</span>
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setViewBlog(blog)} className="h-8 px-2 sm:px-3">
                              <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              <span className="text-xs">View</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setBlogToDelete(blog)}
                              className="h-8 px-2 sm:px-3"
                            >
                              <Trash2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              <span className="text-xs">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                        No blogs match the current filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!viewBlog} onOpenChange={(open) => { if (!open) setViewBlog(null); }}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
          {viewBlog ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-base sm:text-lg">{viewBlog.title}</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  By {viewBlog.author} in {viewBlog.category} - {d(viewBlog.createdAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 sm:space-y-4">
                <img src={viewBlog.image} alt={viewBlog.title} className="h-40 sm:h-48 md:h-64 w-full rounded-lg object-cover" />
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Badge className={cn("border capitalize text-xs", statusClass[viewBlog.status])}>{viewBlog.status}</Badge>
                  {viewBlog.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{viewBlog.shortDescription}</p>
                <div className="rounded-lg border bg-white p-3 sm:p-4">
                  <div className="prose prose-sm max-w-none text-sm" dangerouslySetInnerHTML={{ __html: viewBlog.fullContent }} />
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={!!blogToDelete} onOpenChange={(open) => { if (!open) setBlogToDelete(null); }}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md">
          {blogToDelete ? (
            <>
              <DialogHeader>
                <DialogTitle>Delete Blog</DialogTitle>
                <DialogDescription>
                  This will permanently remove "{blogToDelete.title}" from the admin blog dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button variant="outline" onClick={() => setBlogToDelete(null)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDeleteBlog}>Confirm Delete</Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
