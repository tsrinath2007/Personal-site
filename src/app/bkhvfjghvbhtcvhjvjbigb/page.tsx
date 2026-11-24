"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface BlogPostItem {
  slug: string;
  title: string;
  summary: string;
  date: string;
  draft: boolean;
  spineColor: string;
  relatedHackathon?: string;
  content: string;
}

interface PhotoItem {
  id: string;
  src?: string;
  alt: string;
  caption: string;
  description?: string;
  location?: string;
  tilt: string;
}

interface NowField {
  label: string;
  value: string;
}

interface NowDataState {
  header: string;
  origin: {
    code: string;
    city: string;
  };
  destination: {
    code: string;
    city: string;
  };
  fields: NowField[];
  stubText: string;
  focus: {
    title: string;
    items: string[];
  };
}

const COLOR_PRESETS = [
  { name: "Tan", val: "var(--tan)" },
  { name: "Peach", val: "var(--peach)" },
  { name: "Sage", val: "var(--sage)" },
  { name: "Sky", val: "var(--sky)" },
  { name: "Lavender", val: "var(--lavender)" }
];

export default function SecretAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Auth inputs
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [authSubmitting, setAuthSubmitting] = useState<boolean>(false);

  // Active tab
  const [activeTab, setActiveTab] = useState<"blog" | "focus" | "now" | "photos">("blog");

  // Blog state
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [isNewPost, setIsNewPost] = useState<boolean>(false);
  const [editorPreview, setEditorPreview] = useState<boolean>(false);
  const [blogStatusMsg, setBlogStatusMsg] = useState<string>("");

  // Photos state
  const [photosList, setPhotosList] = useState<PhotoItem[]>([]);
  const [editingPhoto, setEditingPhoto] = useState<PhotoItem | null>(null);
  const [isNewPhoto, setIsNewPhoto] = useState<boolean>(false);
  const [photoStatusMsg, setPhotoStatusMsg] = useState<string>("");

  // Upload & Supabase state
  const [uploadingPhoto, setUploadingPhoto] = useState<boolean>(false);
  const [uploadingBlogImage, setUploadingBlogImage] = useState<boolean>(false);
  const [showSupabaseHelper, setShowSupabaseHelper] = useState<boolean>(false);

  // Now & Focus state
  const [nowData, setNowData] = useState<NowDataState | null>(null);
  const [newFocusInput, setNewFocusInput] = useState<string>("");
  const [nowStatusMsg, setNowStatusMsg] = useState<string>("");

  // Check initial authentication
  useEffect(() => {
    const cachedAuth =
      typeof window !== "undefined" && localStorage.getItem("ses_admin_auth") === "true";
    if (cachedAuth) {
      setIsAuthenticated(true);
      setLoading(false);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    fetch("/api/admin/auth?t=" + Date.now(), {
      cache: "no-store",
      signal: controller.signal
    })
      .then((res) => {
        clearTimeout(timeout);
        if (res.ok) {
          setIsAuthenticated(true);
          localStorage.setItem("ses_admin_auth", "true");
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("ses_admin_auth");
        }
      })
      .catch(() => {
        // On network error/abort, fallback to cached state
      })
      .finally(() => setLoading(false));

    return () => clearTimeout(timeout);
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
      fetchNowData();
      fetchPhotos();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog?t=" + Date.now(), { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch {
      // Fetch error ignored
    }
  };

  const fetchNowData = async () => {
    try {
      const res = await fetch("/api/admin/now?t=" + Date.now(), { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setNowData(data.data || null);
      }
    } catch {
      // Fetch error ignored
    }
  };

  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/admin/photos?t=" + Date.now(), { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPhotosList(data.photos || []);
      }
    } catch {
      // Fetch error ignored
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("ses_admin_auth", "true");
      } else {
        setAuthError(data.error || "Authentication failed");
      }
    } catch {
      setAuthError("Failed to reach auth server");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("ses_admin_auth");
    await fetch("/api/admin/auth", { method: "DELETE", cache: "no-store" });
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const openNewPost = () => {
    setIsNewPost(true);
    setOriginalSlug(null);
    setEditingPost({
      title: "",
      slug: "",
      summary: "",
      date: new Date().toISOString().split("T")[0],
      draft: false,
      spineColor: "var(--tan)",
      relatedHackathon: "",
      content: "# New Post\n\nWrite your thoughts here..."
    });
    setEditorPreview(false);
  };

  const openEditPost = (post: BlogPostItem) => {
    setIsNewPost(false);
    setOriginalSlug(post.slug);
    setEditingPost({
      ...post,
      relatedHackathon: post.relatedHackathon || ""
    });
    setEditorPreview(false);
  };

  const openNewPhoto = () => {
    setIsNewPhoto(true);
    const nextId = "ph" + (photosList.length + 1);
    setEditingPhoto({
      id: nextId,
      src: "",
      alt: "",
      caption: "",
      description: "",
      location: "Gallery",
      tilt: "0deg"
    });
  };

  const openEditPhoto = (photo: PhotoItem) => {
    setIsNewPhoto(false);
    setEditingPhoto({ ...photo });
  };

  const handleSavePhoto = async () => {
    if (!editingPhoto || !editingPhoto.caption.trim()) {
      alert("Caption / Title is required");
      return;
    }

    setPhotoStatusMsg("Saving photo...");
    let updated: PhotoItem[] = [];
    if (isNewPhoto) {
      updated = [...photosList, editingPhoto];
    } else {
      updated = photosList.map((p) => (p.id === editingPhoto.id ? editingPhoto : p));
    }

    setPhotosList(updated);

    try {
      const res = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setPhotoStatusMsg("Photo saved successfully!");
        setEditingPhoto(null);
        setTimeout(() => setPhotoStatusMsg(""), 3000);
      } else {
        alert("Failed to save photo to server");
        await fetchPhotos();
      }
    } catch {
      alert("Error saving photo");
      await fetchPhotos();
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    setPhotosList((prev) => prev.filter((p) => p.id !== id));

    try {
      const res = await fetch(`/api/admin/photos?id=${encodeURIComponent(id)}&t=${Date.now()}`, {
        method: "DELETE",
        cache: "no-store"
      });
      if (!res.ok) {
        alert("Failed to delete photo on server");
        await fetchPhotos();
      }
    } catch {
      alert("Error deleting photo");
      await fetchPhotos();
    }
  };

  const handleUploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Upload failed");
      }
      const data = await res.json();
      return data.url;
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to upload image from phone");
      return null;
    }
  };

  const handlePhotoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPhoto) return;
    setUploadingPhoto(true);
    try {
      const url = await handleUploadFile(file);
      if (url) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setEditingPhoto((prev) =>
          prev
            ? {
                ...prev,
                src: url,
                caption: prev.caption || cleanName,
                alt: prev.alt || cleanName
              }
            : null
        );
      }
    } finally {
      setUploadingPhoto(false);
      e.target.value = "";
    }
  };

  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPost) return;
    setUploadingBlogImage(true);
    try {
      const url = await handleUploadFile(file);
      if (url) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        const markdownImg = `\n\n![${cleanName}](${url})\n\n`;
        setEditingPost((prev) =>
          prev
            ? {
                ...prev,
                content: (prev.content || "") + markdownImg
              }
            : null
        );
      }
    } finally {
      setUploadingBlogImage(false);
      e.target.value = "";
    }
  };

  const handleTitleChange = (newTitle: string) => {
    if (!editingPost) return;
    const generatedSlug = isNewPost
      ? newTitle
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9_-]/g, "-")
          .replace(/-+/g, "-")
      : editingPost.slug;

    setEditingPost({
      ...editingPost,
      title: newTitle,
      slug: isNewPost ? generatedSlug : editingPost.slug
    });
  };

  const handleSavePost = async () => {
    if (!editingPost || !editingPost.title || !editingPost.slug) {
      alert("Title and slug are required");
      return;
    }

    setBlogStatusMsg("Saving post...");
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          ...editingPost,
          oldSlug: originalSlug
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBlogStatusMsg("Post saved successfully!");
        setEditingPost(null);
        await fetchPosts();
        setTimeout(() => setBlogStatusMsg(""), 3000);
      } else {
        alert(data.error || "Failed to save post");
        setBlogStatusMsg("");
      }
    } catch {
      alert("Error saving post");
      setBlogStatusMsg("");
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete post "${slug}"?`)) return;

    // 1. Optimistically remove immediately from UI
    setPosts((prev) => prev.filter((p) => p.slug !== slug));

    try {
      const res = await fetch(`/api/admin/blog?slug=${encodeURIComponent(slug)}&t=${Date.now()}`, {
        method: "DELETE",
        cache: "no-store"
      });
      if (res.ok) {
        await fetchPosts();
      } else {
        alert("Failed to delete post on server");
        await fetchPosts();
      }
    } catch {
      alert("Error deleting post");
      await fetchPosts();
    }
  };

  // Focus Handlers
  const handleAddFocusItem = () => {
    if (!newFocusInput.trim() || !nowData) return;
    const updated = {
      ...nowData,
      focus: {
        ...nowData.focus,
        items: [...nowData.focus.items, newFocusInput.trim()]
      }
    };
    setNowData(updated);
    setNewFocusInput("");
  };

  const handleRemoveFocusItem = (idx: number) => {
    if (!nowData) return;
    const updated = {
      ...nowData,
      focus: {
        ...nowData.focus,
        items: nowData.focus.items.filter((_, i) => i !== idx)
      }
    };
    setNowData(updated);
  };

  const handleUpdateFocusItem = (idx: number, val: string) => {
    if (!nowData) return;
    const items = [...nowData.focus.items];
    items[idx] = val;
    setNowData({
      ...nowData,
      focus: {
        ...nowData.focus,
        items
      }
    });
  };

  const handleSaveNow = async () => {
    if (!nowData) return;
    setNowStatusMsg("Saving updates...");
    try {
      const res = await fetch("/api/admin/now", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(nowData)
      });
      if (res.ok) {
        setNowStatusMsg("Saved successfully! Updates are live.");
        setTimeout(() => setNowStatusMsg(""), 3000);
      } else {
        alert("Failed to update data");
        setNowStatusMsg("");
      }
    } catch {
      alert("Error updating data");
      setNowStatusMsg("");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeContent: "center", background: "#0e1117", color: "#e6edf3", fontFamily: "var(--mono)" }}>
        Loading CMS portal...
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at 50% 20%, #171d2b 0%, #0b0e14 100%)",
          color: "#e6edf3",
          fontFamily: "var(--mono)",
          padding: 20
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: "#131822",
            border: "1px solid #232c3d",
            borderRadius: 14,
            padding: 32,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)"
          }}
        >
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                background: "#080b10",
                border: "1px solid #293449",
                borderRadius: 6,
                fontSize: 12,
                color: "#e05252",
                fontWeight: 600,
                letterSpacing: "0.08em"
              }}
            >
              &gt;_ SES ADMIN ACCESS
            </span>
            <h1 style={{ fontSize: 20, marginTop: 12, fontWeight: 700, color: "#f0f6fc" }}>
              Control Dashboard
            </h1>
            <p style={{ fontSize: 13, color: "#8b949e", marginTop: 4 }}>
              Manage blogs, location &amp; focus
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, marginBottom: 6, color: "#8b949e" }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="myselfses"
                required
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "#080b10",
                  border: "1px solid #2d384e",
                  borderRadius: 8,
                  color: "#f0f6fc",
                  fontSize: 14,
                  outline: "none"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, marginBottom: 6, color: "#8b949e" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "#080b10",
                  border: "1px solid #2d384e",
                  borderRadius: 8,
                  color: "#f0f6fc",
                  fontSize: 14,
                  outline: "none"
                }}
              />
            </div>

            {authError && (
              <div
                style={{
                  padding: "10px 12px",
                  background: "rgba(224, 82, 82, 0.15)",
                  border: "1px solid #e05252",
                  borderRadius: 6,
                  color: "#ff7b72",
                  fontSize: 12
                }}
              >
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authSubmitting}
              style={{
                marginTop: 8,
                padding: "11px 16px",
                background: "#e05252",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "opacity 0.2s"
              }}
            >
              {authSubmitting ? "Authenticating..." : "Authenticate ↵"}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link href="/" style={{ color: "#8b949e", fontSize: 12, textDecoration: "underline" }}>
              ← Return to public portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0e16",
        color: "#e6edf3",
        fontFamily: "var(--mono)",
        paddingBottom: 60
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            padding: 12px 16px !important;
          }
          .admin-header-actions {
            width: 100% !important;
            justifyContent: space-between !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
          }
          .admin-tabs {
            overflow-x: auto !important;
            white-space: nowrap !important;
            -webkit-overflow-scrolling: touch !important;
            padding-bottom: 8px !important;
            margin-bottom: 16px !important;
            display: flex !important;
            scrollbar-width: none !important;
            gap: 8px !important;
          }
          .admin-tabs::-webkit-scrollbar {
            display: none !important;
          }
          .admin-container {
            padding: 0 12px !important;
            margin-top: 16px !important;
          }
          .admin-modal-overlay {
            padding: 0 !important;
            align-items: flex-end !important;
          }
          .admin-modal-dialog {
            width: 100% !important;
            max-width: 100% !important;
            height: 95vh !important;
            max-height: 95vh !important;
            border-radius: 16px 16px 0 0 !important;
          }
          .admin-post-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
          }
          .admin-post-item > div:first-child {
            max-width: 100% !important;
          }
          .admin-post-actions {
            width: 100% !important;
            justifyContent: flex-start !important;
            flex-wrap: wrap !important;
          }
          .admin-two-col {
            grid-template-columns: 1fr !important;
          }
          .admin-photos-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
            gap: 10px !important;
          }
          .admin-photo-card {
            padding: 10px !important;
          }
          .admin-input {
            font-size: 16px !important; /* Prevents auto-zoom on iOS Safari */
          }
          .admin-btn {
            min-height: 44px !important;
            touch-action: manipulation !important;
          }
        }
      `}</style>

      {/* Top Header */}
      <header
        className="admin-header"
        style={{
          borderBottom: "1px solid #1f2737",
          background: "#0f1420",
          padding: "14px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              padding: "4px 8px",
              background: "#080b10",
              border: "1px solid #293449",
              borderRadius: 6,
              fontSize: 12,
              color: "#e05252",
              fontWeight: 700
            }}
          >
            &gt;_ SES // CMS
          </span>
          <span style={{ fontSize: 13, color: "#8b949e" }}>Admin Portal</span>
        </div>

        <div className="admin-header-actions" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={() => setShowSupabaseHelper(true)}
            style={{
              padding: "5px 10px",
              background: "rgba(63, 207, 142, 0.15)",
              border: "1px solid #3ecf8e",
              borderRadius: 6,
              fontSize: 11,
              color: "#3ecf8e",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer"
            }}
            title="Supabase sync active. Click for SQL helper"
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3ecf8e" }} />
            ⚡ Supabase Active
          </button>
          <Link
            href="/"
            target="_blank"
            style={{
              fontSize: 12,
              color: "#58a6ff",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: 6,
              background: "rgba(88, 166, 255, 0.1)"
            }}
          >
            View Site ↗
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              background: "#1f2737",
              border: "1px solid #334057",
              color: "#c9d1d9",
              borderRadius: 6,
              fontSize: 12,
              cursor: "pointer"
            }}
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="admin-container" style={{ maxWidth: 1040, margin: "28px auto", padding: "0 20px" }}>
        {/* Tab Switcher */}
        <div
          className="admin-tabs"
          style={{
            display: "flex",
            gap: 10,
            borderBottom: "1px solid #1f2737",
            paddingBottom: 14,
            marginBottom: 28
          }}
        >
          <button
            onClick={() => setActiveTab("blog")}
            style={{
              padding: "9px 18px",
              background: activeTab === "blog" ? "#e05252" : "#131822",
              color: "#fff",
              border: "1px solid " + (activeTab === "blog" ? "#e05252" : "#232c3d"),
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            ✍️ Blog Posts ({posts.length})
          </button>

          <button
            onClick={() => setActiveTab("focus")}
            style={{
              padding: "9px 18px",
              background: activeTab === "focus" ? "#e05252" : "#131822",
              color: "#fff",
              border: "1px solid " + (activeTab === "focus" ? "#e05252" : "#232c3d"),
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            🎯 What I Am Focused On (Mug &amp; Now)
          </button>

          <button
            onClick={() => setActiveTab("now")}
            style={{
              padding: "9px 18px",
              background: activeTab === "now" ? "#e05252" : "#131822",
              color: "#fff",
              border: "1px solid " + (activeTab === "now" ? "#e05252" : "#232c3d"),
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            ✈️ Where I Am (Boarding Pass)
          </button>

          <button
            onClick={() => setActiveTab("photos")}
            style={{
              padding: "9px 18px",
              background: activeTab === "photos" ? "#e05252" : "#131822",
              color: "#fff",
              border: "1px solid " + (activeTab === "photos" ? "#e05252" : "#232c3d"),
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            📷 Photos &amp; Polaroids ({photosList.length})
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: BLOG POSTS */}
        {/* ============================================================== */}
        {activeTab === "blog" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
              }}
            >
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f0f6fc" }}>
                  Published &amp; Draft Blogs
                </h2>
                <p style={{ fontSize: 12, color: "#8b949e", marginTop: 2 }}>
                  Markdown files stored in <code>content/blog/</code> and rendered at <code>/blog</code>
                </p>
              </div>
              <button
                onClick={openNewPost}
                style={{
                  padding: "9px 16px",
                  background: "#238636",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                + Write New Blog Post
              </button>
            </div>

            {blogStatusMsg && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(35, 134, 54, 0.2)",
                  border: "1px solid #238636",
                  borderRadius: 8,
                  color: "#7ee787",
                  fontSize: 13,
                  marginBottom: 16
                }}
              >
                {blogStatusMsg}
              </div>
            )}

            {/* List of Posts */}
            <div style={{ display: "grid", gap: 14 }}>
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className="admin-post-item"
                  style={{
                    background: "#131822",
                    border: "1px solid #232c3d",
                    borderRadius: 10,
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: post.spineColor
                        }}
                      />
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#f0f6fc" }}>
                        {post.title}
                      </h3>
                      {post.draft ? (
                        <span
                          style={{
                            fontSize: 10,
                            padding: "2px 6px",
                            background: "rgba(210, 153, 34, 0.2)",
                            color: "#d29922",
                            border: "1px solid #d29922",
                            borderRadius: 4
                          }}
                        >
                          Draft
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: 10,
                            padding: "2px 6px",
                            background: "rgba(35, 134, 54, 0.2)",
                            color: "#7ee787",
                            border: "1px solid #238636",
                            borderRadius: 4
                          }}
                        >
                          Published
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 6 }}>
                      {post.summary}
                    </p>
                    <div style={{ fontSize: 11, color: "#6e7681", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginTop: 4 }}>
                      <span>Slug: <code>{post.slug}</code></span>
                      <span>·</span>
                      <span>Date: {post.date}</span>
                      {post.relatedHackathon && (
                        <>
                          <span>·</span>
                          <span style={{ padding: "2px 6px", background: "rgba(88, 166, 255, 0.15)", color: "#58a6ff", border: "1px solid #1f6feb", borderRadius: 4, fontWeight: 600 }}>
                            🏆 Hackathon: {post.relatedHackathon}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="admin-post-actions" style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="admin-btn"
                      style={{
                        padding: "6px 12px",
                        background: "#1f2737",
                        color: "#58a6ff",
                        borderRadius: 6,
                        fontSize: 12,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center"
                      }}
                    >
                      Preview ↗
                    </Link>
                    <button
                      onClick={() => openEditPost(post)}
                      className="admin-btn"
                      style={{
                        padding: "6px 12px",
                        background: "#1f2737",
                        border: "1px solid #334057",
                        color: "#f0f6fc",
                        borderRadius: 6,
                        fontSize: 12,
                        cursor: "pointer"
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.slug)}
                      className="admin-btn"
                      style={{
                        padding: "6px 12px",
                        background: "rgba(224, 82, 82, 0.15)",
                        border: "1px solid #e05252",
                        color: "#ff7b72",
                        borderRadius: 6,
                        fontSize: 12,
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Post Edit Modal */}
            {editingPost && (
              <div
                className="admin-modal-overlay"
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0, 0, 0, 0.75)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                  padding: 20
                }}
              >
                <div
                  className="admin-modal-dialog"
                  style={{
                    background: "#131822",
                    border: "1px solid #232c3d",
                    borderRadius: 12,
                    width: "100%",
                    maxWidth: 780,
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 24px 48px rgba(0, 0, 0, 0.7)"
                  }}
                >
                  <div
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #1f2737",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f0f6fc" }}>
                      {isNewPost ? "Write New Blog Post" : `Edit: ${editingPost.title}`}
                    </h3>
                    <button
                      onClick={() => setEditingPost(null)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#8b949e",
                        fontSize: 20,
                        cursor: "pointer"
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <div style={{ padding: 24, overflowY: "auto", display: "grid", gap: 16, flex: 1 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                        Post Title
                      </label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editingPost.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. How I built GoFocusGen under 48 hours"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          background: "#080b10",
                          border: "1px solid #2d384e",
                          borderRadius: 6,
                          color: "#f0f6fc",
                          fontSize: 14
                        }}
                      />
                    </div>

                    <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                          Slug (URL Path)
                        </label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingPost.slug}
                          onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                          placeholder="e.g. how-i-built-gofocusgen"
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            background: "#080b10",
                            border: "1px solid #2d384e",
                            borderRadius: 6,
                            color: "#f0f6fc",
                            fontSize: 13
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                          Publish Date
                        </label>
                        <input
                          type="date"
                          className="admin-input"
                          value={editingPost.date}
                          onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            background: "#080b10",
                            border: "1px solid #2d384e",
                            borderRadius: 6,
                            color: "#f0f6fc",
                            fontSize: 13
                          }}
                        />
                      </div>
                    </div>

                    <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "center" }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                          Book Spine Color on Shelf
                        </label>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          {COLOR_PRESETS.map((p) => (
                            <button
                              key={p.name}
                              type="button"
                              onClick={() => setEditingPost({ ...editingPost, spineColor: p.val })}
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                background: p.val,
                                border:
                                  editingPost.spineColor === p.val
                                    ? "2px solid #fff"
                                    : "1px solid rgba(255,255,255,0.2)",
                                cursor: "pointer"
                              }}
                              title={p.name}
                            />
                          ))}
                          <span style={{ fontSize: 12, color: "#8b949e", marginLeft: 6 }}>
                            {editingPost.spineColor}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 13,
                            color: "#f0f6fc",
                            cursor: "pointer"
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={!editingPost.draft}
                            onChange={(e) =>
                              setEditingPost({ ...editingPost, draft: !e.target.checked })
                            }
                          />
                          Publish immediately (uncheck to save as draft)
                        </label>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                        Summary / Short Description
                      </label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editingPost.summary}
                        onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                        placeholder="One-line summary shown on the blog list"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          background: "#080b10",
                          border: "1px solid #2d384e",
                          borderRadius: 6,
                          color: "#f0f6fc",
                          fontSize: 13
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                        Related Hackathon / Project
                      </label>
                      <select
                        className="admin-input"
                        value={editingPost.relatedHackathon || ""}
                        onChange={(e) => setEditingPost({ ...editingPost, relatedHackathon: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          background: "#080b10",
                          border: "1px solid #2d384e",
                          borderRadius: 6,
                          color: "#f0f6fc",
                          fontSize: 13
                        }}
                      >
                        <option value="">None (Independent Blog Post)</option>
                        <option value="hacker-house-goa">Hacker House Goa 2026 (Voice RAG &amp; SENTINEL)</option>
                        <option value="parallax">Smart India Hackathon 2026 (Parallax)</option>
                        <option value="resume-ranker">Nexora Hackathon (resume_ranker)</option>
                        <option value="scaler-openenv">Scaler OpenEnv Hackathon</option>
                        <option value="pulse-rail">Zuup Hackathon (PULSE RAIL)</option>
                      </select>
                      <p style={{ fontSize: 11, color: "#8b949e", marginTop: 4 }}>
                        Links this engineering blog post directly to your hackathon project card in ~/hackathons.
                      </p>
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 8
                        }}
                      >
                        <label style={{ fontSize: 12, color: "#8b949e" }}>
                          Markdown Content
                        </label>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <label
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "4px 10px",
                              background: "#238636",
                              color: "#fff",
                              borderRadius: 4,
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: uploadingBlogImage ? "wait" : "pointer"
                            }}
                          >
                            📷 {uploadingBlogImage ? "Uploading..." : "Upload Image"}
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingBlogImage}
                              onChange={handleBlogImageUpload}
                              style={{ display: "none" }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setEditorPreview(!editorPreview)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#58a6ff",
                              fontSize: 12,
                              cursor: "pointer"
                            }}
                          >
                            {editorPreview ? "← Edit Markdown" : "👁️ Preview"}
                          </button>
                        </div>
                      </div>

                      {!editorPreview ? (
                        <textarea
                          rows={14}
                          className="admin-input"
                          value={editingPost.content}
                          onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            background: "#080b10",
                            border: "1px solid #2d384e",
                            borderRadius: 6,
                            color: "#f0f6fc",
                            fontFamily: "var(--mono)",
                            fontSize: 13,
                            lineHeight: 1.6
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            minHeight: 240,
                            padding: "16px 20px",
                            background: "#080b10",
                            border: "1px solid #2d384e",
                            borderRadius: 6,
                            color: "#f0f6fc",
                            lineHeight: 1.7,
                            fontSize: 14,
                            whiteSpace: "pre-wrap"
                          }}
                        >
                          {editingPost.content}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "16px 24px",
                      borderTop: "1px solid #1f2737",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 12
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setEditingPost(null)}
                      style={{
                        padding: "8px 16px",
                        background: "#1f2737",
                        color: "#c9d1d9",
                        border: "1px solid #334057",
                        borderRadius: 6,
                        fontSize: 13,
                        cursor: "pointer"
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSavePost}
                      style={{
                        padding: "8px 20px",
                        background: "#238636",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Save Post
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: CURRENT FOCUS */}
        {/* ============================================================== */}
        {activeTab === "focus" && nowData && (
          <div
            style={{
              background: "#131822",
              border: "1px solid #232c3d",
              borderRadius: 12,
              padding: 28
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f0f6fc" }}>
                What I Am Currently Focused On
              </h2>
              <p style={{ fontSize: 13, color: "#8b949e", marginTop: 4 }}>
                This list updates the <strong>Coffee Mug</strong> popup note on your desk home screen
                and the focus checklist in the <strong>Now</strong> drawer.
              </p>
            </div>

            {nowStatusMsg && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(35, 134, 54, 0.2)",
                  border: "1px solid #238636",
                  borderRadius: 8,
                  color: "#7ee787",
                  fontSize: 13,
                  marginBottom: 16
                }}
              >
                {nowStatusMsg}
              </div>
            )}

            {/* Focus Items List */}
            <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
              {nowData.focus.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "#080b10",
                    border: "1px solid #242f44",
                    borderRadius: 8,
                    padding: "8px 14px"
                  }}
                >
                  <span style={{ color: "#e05252", fontWeight: 700, fontSize: 13 }}>
                    [{idx + 1}]
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateFocusItem(idx, e.target.value)}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      color: "#f0f6fc",
                      fontSize: 14,
                      outline: "none"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFocusItem(idx)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ff7b72",
                      cursor: "pointer",
                      fontSize: 16
                    }}
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Focus Item */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <input
                type="text"
                placeholder="Add new focus item (e.g. Ship Bujji public beta)..."
                value={newFocusInput}
                onChange={(e) => setNewFocusInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFocusItem();
                  }
                }}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  background: "#080b10",
                  border: "1px solid #2d384e",
                  borderRadius: 8,
                  color: "#f0f6fc",
                  fontSize: 13
                }}
              />
              <button
                type="button"
                onClick={handleAddFocusItem}
                style={{
                  padding: "10px 18px",
                  background: "#1f2737",
                  border: "1px solid #334057",
                  color: "#f0f6fc",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                + Add Item
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveNow}
              style={{
                padding: "11px 24px",
                background: "#238636",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Save Current Focus
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: WHERE I AM (BOARDING PASS) */}
        {/* ============================================================== */}
        {activeTab === "now" && nowData && (
          <div
            style={{
              background: "#131822",
              border: "1px solid #232c3d",
              borderRadius: 12,
              padding: 28
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f0f6fc" }}>
                Where I Am (Boarding Pass &amp; Status)
              </h2>
              <p style={{ fontSize: 13, color: "#8b949e", marginTop: 4 }}>
                This updates the <strong>BLR → ?</strong> Boarding Pass ticket on your desk and the{" "}
                <strong>/now</strong> passenger details.
              </p>
            </div>

            {nowStatusMsg && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(35, 134, 54, 0.2)",
                  border: "1px solid #238636",
                  borderRadius: 8,
                  color: "#7ee787",
                  fontSize: 13,
                  marginBottom: 16
                }}
              >
                {nowStatusMsg}
              </div>
            )}

            {/* Flight Route */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 20,
                padding: 18,
                background: "#080b10",
                border: "1px solid #242f44",
                borderRadius: 8
              }}
            >
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                  Origin City &amp; Code
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="text"
                    value={nowData.origin.code}
                    onChange={(e) =>
                      setNowData({
                        ...nowData,
                        origin: { ...nowData.origin, code: e.target.value }
                      })
                    }
                    placeholder="BLR"
                    style={{
                      width: 80,
                      padding: "8px 10px",
                      background: "#131822",
                      border: "1px solid #2d384e",
                      borderRadius: 6,
                      color: "#f0f6fc",
                      fontSize: 14,
                      fontWeight: 700
                    }}
                  />
                  <input
                    type="text"
                    value={nowData.origin.city}
                    onChange={(e) =>
                      setNowData({
                        ...nowData,
                        origin: { ...nowData.origin, city: e.target.value }
                      })
                    }
                    placeholder="Bengaluru"
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      background: "#131822",
                      border: "1px solid #2d384e",
                      borderRadius: 6,
                      color: "#f0f6fc",
                      fontSize: 13
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                  Destination City &amp; Code
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="text"
                    value={nowData.destination.code}
                    onChange={(e) =>
                      setNowData({
                        ...nowData,
                        destination: { ...nowData.destination, code: e.target.value }
                      })
                    }
                    placeholder="?"
                    style={{
                      width: 80,
                      padding: "8px 10px",
                      background: "#131822",
                      border: "1px solid #2d384e",
                      borderRadius: 6,
                      color: "#f0f6fc",
                      fontSize: 14,
                      fontWeight: 700
                    }}
                  />
                  <input
                    type="text"
                    value={nowData.destination.city}
                    onChange={(e) =>
                      setNowData({
                        ...nowData,
                        destination: { ...nowData.destination, city: e.target.value }
                      })
                    }
                    placeholder="Not decided yet"
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      background: "#131822",
                      border: "1px solid #2d384e",
                      borderRadius: 6,
                      color: "#f0f6fc",
                      fontSize: 13
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Passenger Fields */}
            <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              <h3 style={{ fontSize: 14, color: "#8b949e", fontWeight: 600 }}>
                Passenger Information Fields
              </h3>
              {nowData.fields.map((f, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr",
                    gap: 12,
                    alignItems: "center"
                  }}
                >
                  <input
                    type="text"
                    value={f.label}
                    onChange={(e) => {
                      const fields = [...nowData.fields];
                      fields[idx] = { ...fields[idx], label: e.target.value };
                      setNowData({ ...nowData, fields });
                    }}
                    style={{
                      padding: "8px 12px",
                      background: "#080b10",
                      border: "1px solid #242f44",
                      borderRadius: 6,
                      color: "#8b949e",
                      fontSize: 13
                    }}
                  />
                  <input
                    type="text"
                    value={f.value}
                    onChange={(e) => {
                      const fields = [...nowData.fields];
                      fields[idx] = { ...fields[idx], value: e.target.value };
                      setNowData({ ...nowData, fields });
                    }}
                    style={{
                      padding: "8px 12px",
                      background: "#080b10",
                      border: "1px solid #242f44",
                      borderRadius: 6,
                      color: "#f0f6fc",
                      fontSize: 13
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSaveNow}
              style={{
                padding: "11px 24px",
                background: "#238636",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Save Boarding Pass
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: PHOTOS & POLAROIDS */}
        {/* ============================================================== */}
        {activeTab === "photos" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
              }}
            >
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f0f6fc" }}>
                  Polaroid Photos &amp; Positions
                </h2>
                <p style={{ fontSize: 12, color: "#8b949e", marginTop: 2 }}>
                  Manage pictures, stories, tilt angles, and whether they are pinned on the wall, desk, or gallery.
                </p>
              </div>
              <button
                type="button"
                onClick={openNewPhoto}
                style={{
                  padding: "9px 16px",
                  background: "#238636",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                + Add Photo
              </button>
            </div>

            {photoStatusMsg && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(56, 139, 253, 0.15)",
                  border: "1px solid #388bfd",
                  borderRadius: 6,
                  color: "#58a6ff",
                  fontSize: 13,
                  marginBottom: 16
                }}
              >
                {photoStatusMsg}
              </div>
            )}

            {/* Photo Cards Grid */}
            <div className="admin-photos-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {photosList.map((photo) => (
                <div
                  key={photo.id}
                  className="admin-photo-card"
                  style={{
                    background: "#131822",
                    border: "1px solid #232c3d",
                    borderRadius: 10,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    {/* Mini Polaroid Preview */}
                    <div
                      style={{
                        background: "#fff",
                        color: "#1a1a1a",
                        padding: "10px 10px 14px",
                        borderRadius: 4,
                        boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
                        marginBottom: 14,
                        transform: `rotate(${photo.tilt || "0deg"})`,
                        transition: "transform 0.2s ease"
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: 140,
                          background: photo.src ? `url(${photo.src}) center/cover no-repeat` : "#e2ded7",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#888",
                          fontSize: 12
                        }}
                      >
                        {!photo.src && <span>📷 No image URL (default frame)</span>}
                      </div>
                      <div
                        style={{
                          marginTop: 8,
                          fontFamily: "var(--font-caveat, cursive), cursive",
                          fontSize: 17,
                          fontWeight: 700,
                          textAlign: "center",
                          color: "#222"
                        }}
                      >
                        {photo.caption || "Untitled"}
                      </div>
                      {photo.description && (
                        <div
                          style={{
                            fontSize: 11,
                            color: "#555",
                            textAlign: "center",
                            fontStyle: "italic",
                            marginTop: 2
                          }}
                        >
                          {photo.description}
                        </div>
                      )}
                    </div>

                    {/* Metadata tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                      <span
                        style={{
                          fontSize: 11,
                          padding: "3px 8px",
                          borderRadius: 4,
                          fontWeight: 600,
                          background:
                            photo.location === "Pinned on Wall"
                              ? "rgba(56, 139, 253, 0.2)"
                              : photo.location === "Pinned on Desk"
                              ? "rgba(224, 82, 82, 0.2)"
                              : "rgba(163, 113, 247, 0.2)",
                          color:
                            photo.location === "Pinned on Wall"
                              ? "#58a6ff"
                              : photo.location === "Pinned on Desk"
                              ? "#ff7b72"
                              : "#d2a8ff",
                          border:
                            "1px solid " +
                            (photo.location === "Pinned on Wall"
                              ? "#1f6feb"
                              : photo.location === "Pinned on Desk"
                              ? "#da3633"
                              : "#8957e5")
                        }}
                      >
                        📌 {photo.location || "Gallery"}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          padding: "3px 8px",
                          borderRadius: 4,
                          background: "#080b10",
                          color: "#8b949e",
                          border: "1px solid #232c3d"
                        }}
                      >
                        Tilt: {photo.tilt || "0deg"}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          padding: "3px 8px",
                          borderRadius: 4,
                          background: "#080b10",
                          color: "#8b949e",
                          border: "1px solid #232c3d"
                        }}
                      >
                        ID: {photo.id}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button
                      type="button"
                      onClick={() => openEditPhoto(photo)}
                      style={{
                        flex: 1,
                        padding: "6px 12px",
                        background: "#1f2737",
                        border: "1px solid #334057",
                        color: "#f0f6fc",
                        borderRadius: 6,
                        fontSize: 12,
                        cursor: "pointer"
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(photo.id)}
                      style={{
                        padding: "6px 12px",
                        background: "rgba(224, 82, 82, 0.15)",
                        border: "1px solid #e05252",
                        color: "#ff7b72",
                        borderRadius: 6,
                        fontSize: 12,
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo Edit Modal */}
            {editingPhoto && (
              <div
                className="admin-modal-overlay"
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0, 0, 0, 0.75)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                  padding: 20
                }}
              >
                <div
                  className="admin-modal-dialog"
                  style={{
                    background: "#131822",
                    border: "1px solid #232c3d",
                    borderRadius: 12,
                    width: "100%",
                    maxWidth: 680,
                    maxHeight: "92vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 24px 48px rgba(0, 0, 0, 0.7)"
                  }}
                >
                  <div
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #1f2737",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f0f6fc" }}>
                      {isNewPhoto ? "Add New Polaroid Photo" : `Edit Polaroid: ${editingPhoto.caption}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingPhoto(null)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#8b949e",
                        fontSize: 20,
                        cursor: "pointer"
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <div style={{ padding: 24, overflowY: "auto", display: "grid", gap: 16, flex: 1 }}>
                    {/* Live Preview Box */}
                    <div style={{ background: "#080b10", padding: 18, borderRadius: 8, border: "1px solid #232c3d", textAlign: "center" }}>
                      <span style={{ fontSize: 11, color: "#8b949e", display: "block", marginBottom: 12 }}>
                        Live Polaroid Preview
                      </span>
                      <div
                        style={{
                          display: "inline-block",
                          background: "#fff",
                          color: "#1a1a1a",
                          padding: "12px 12px 18px",
                          borderRadius: 4,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                          width: 200,
                          transform: `rotate(${editingPhoto.tilt || "0deg"})`,
                          transition: "transform 0.15s ease"
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: 140,
                            background: editingPhoto.src ? `url(${editingPhoto.src}) center/cover no-repeat` : "#e2ded7",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#888",
                            fontSize: 11
                          }}
                        >
                          {!editingPhoto.src && <span>No image chosen</span>}
                        </div>
                        <div
                          style={{
                            marginTop: 10,
                            fontFamily: "var(--font-caveat, cursive), cursive",
                            fontSize: 18,
                            fontWeight: 700,
                            textAlign: "center",
                            color: "#222"
                          }}
                        >
                          {editingPhoto.caption || "Caption preview"}
                        </div>
                        {editingPhoto.description && (
                          <div
                            style={{
                              fontSize: 11,
                              color: "#555",
                              textAlign: "center",
                              fontStyle: "italic",
                              marginTop: 3
                            }}
                          >
                            {editingPhoto.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* PHONE / CAMERA UPLOAD ZONE */}
                    <div
                      style={{
                        background: "#0c1017",
                        border: "1px dashed #30363d",
                        borderRadius: 8,
                        padding: 16
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#f0f6fc", display: "flex", alignItems: "center", gap: 6 }}>
                          📱 Add Picture from Phone or Camera
                        </span>
                        {uploadingPhoto && (
                          <span style={{ fontSize: 12, color: "#58a6ff", fontWeight: 600 }}>
                            Uploading from phone...
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 12, color: "#8b949e", marginBottom: 12, lineHeight: 1.4 }}>
                        Tap below on your phone to snap a photo with your camera or pick from your photo gallery. It uploads directly to cloud storage!
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                        <label
                          className="admin-btn"
                          style={{
                            flex: 1,
                            minWidth: 160,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            padding: "12px 16px",
                            background: "#238636",
                            color: "#fff",
                            borderRadius: 6,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: uploadingPhoto ? "wait" : "pointer",
                            textAlign: "center"
                          }}
                        >
                          📷 {uploadingPhoto ? "Uploading..." : "Take Photo / Choose from Phone"}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingPhoto}
                            onChange={handlePhotoFileUpload}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Caption Input */}
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                        Photo Caption / Title *
                      </label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editingPhoto.caption}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                        placeholder="e.g. Somewhere in the hills"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          background: "#080b10",
                          border: "1px solid #2d384e",
                          borderRadius: 6,
                          color: "#f0f6fc",
                          fontSize: 14
                        }}
                      />
                    </div>

                    {/* Location & Tilt */}
                    <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                          Where should I keep it? (Location)
                        </label>
                        <select
                          className="admin-input"
                          value={editingPhoto.location || "Gallery"}
                          onChange={(e) => setEditingPhoto({ ...editingPhoto, location: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            background: "#080b10",
                            border: "1px solid #2d384e",
                            borderRadius: 6,
                            color: "#f0f6fc",
                            fontSize: 13
                          }}
                        >
                          <option value="Pinned on Wall">📌 Pinned on Wall (Desk Scene)</option>
                          <option value="Pinned on Desk">📌 Pinned on Desk (Bottom Left)</option>
                          <option value="Gallery">🖼️ Gallery (Photos Drawer &amp; Page)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                          Position / Tilt Angle
                        </label>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingPhoto.tilt || "0deg"}
                            onChange={(e) => setEditingPhoto({ ...editingPhoto, tilt: e.target.value })}
                            placeholder="e.g. -2.5deg"
                            style={{
                              flex: 1,
                              padding: "8px 12px",
                              background: "#080b10",
                              border: "1px solid #2d384e",
                              borderRadius: 6,
                              color: "#f0f6fc",
                              fontSize: 13
                            }}
                          />
                        </div>
                        <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                          {["-3deg", "-2.5deg", "-1.5deg", "0deg", "1.5deg", "2deg", "2.5deg", "3deg"].map((ang) => (
                            <button
                              key={ang}
                              type="button"
                              onClick={() => setEditingPhoto({ ...editingPhoto, tilt: ang })}
                              style={{
                                padding: "2px 6px",
                                background: editingPhoto.tilt === ang ? "#e05252" : "#1f2737",
                                color: "#fff",
                                border: "none",
                                borderRadius: 4,
                                fontSize: 11,
                                cursor: "pointer"
                              }}
                            >
                              {ang}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Image URL / Path */}
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                        Image Source URL (Cloud / Supabase / Path)
                      </label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editingPhoto.src || ""}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, src: e.target.value })}
                        placeholder="Automatically filled when uploading above, or paste URL"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          background: "#080b10",
                          border: "1px solid #2d384e",
                          borderRadius: 6,
                          color: "#f0f6fc",
                          fontSize: 13
                        }}
                      />
                      <p style={{ fontSize: 11, color: "#8b949e", marginTop: 4 }}>
                        Uploaded photos from phone save to Supabase / cloud storage and auto-populate here.
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                        Description / Story
                      </label>
                      <textarea
                        rows={3}
                        value={editingPhoto.description || ""}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, description: e.target.value })}
                        placeholder="Quiet weekend in the mountains outside Bangalore..."
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          background: "#080b10",
                          border: "1px solid #2d384e",
                          borderRadius: 6,
                          color: "#f0f6fc",
                          fontSize: 13,
                          resize: "vertical"
                        }}
                      />
                    </div>

                    {/* Alt Text */}
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#8b949e", marginBottom: 6 }}>
                        Alt Text (Accessibility)
                      </label>
                      <input
                        type="text"
                        value={editingPhoto.alt || ""}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, alt: e.target.value })}
                        placeholder="e.g. View of mountain range at dawn"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          background: "#080b10",
                          border: "1px solid #2d384e",
                          borderRadius: 6,
                          color: "#f0f6fc",
                          fontSize: 13
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "16px 24px",
                      borderTop: "1px solid #1f2737",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 12
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setEditingPhoto(null)}
                      style={{
                        padding: "8px 16px",
                        background: "#1f2737",
                        border: "1px solid #334057",
                        color: "#c9d1d9",
                        borderRadius: 6,
                        fontSize: 13,
                        cursor: "pointer"
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSavePhoto}
                      style={{
                        padding: "8px 20px",
                        background: "#238636",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Save Polaroid
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Supabase Helper Modal */}
        {showSupabaseHelper && (
          <div
            className="admin-modal-overlay"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: 20
            }}
          >
            <div
              className="admin-modal-dialog"
              style={{
                background: "#131822",
                border: "1px solid #232c3d",
                borderRadius: 12,
                width: "100%",
                maxWidth: 640,
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 48px rgba(0, 0, 0, 0.7)"
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid #1f2737",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>⚡</span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f0f6fc", margin: 0 }}>
                    Supabase Database &amp; Storage Active
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSupabaseHelper(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#8b949e",
                    fontSize: 20,
                    cursor: "pointer"
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: 24, overflowY: "auto", display: "grid", gap: 16, flex: 1, fontSize: 13, lineHeight: 1.6 }}>
                <div style={{ background: "#0c1017", padding: 14, borderRadius: 8, border: "1px solid #1f2737" }}>
                  <div style={{ fontWeight: 600, color: "#3ecf8e", marginBottom: 6 }}>
                    ✓ Connected Project
                  </div>
                  <div style={{ color: "#8b949e", fontSize: 12, wordBreak: "break-all" }}>
                    URL: <code>https://edlbcxkbyjswvapgkocf.supabase.co</code>
                  </div>
                  <div style={{ color: "#8b949e", fontSize: 12, marginTop: 4 }}>
                    Key: <code>sb_publishable_...T91G</code> (Active)
                  </div>
                </div>

                <p style={{ color: "#c9d1d9", margin: 0 }}>
                  Your portfolio admin is configured to automatically sync photos, mobile uploads, and blogs.
                  To enable full cloud persistence in your Supabase project, copy and run this script in your{" "}
                  <a
                    href="https://supabase.com/dashboard/project/edlbcxkbyjswvapgkocf/sql"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#58a6ff", textDecoration: "underline" }}
                  >
                    Supabase SQL Editor
                  </a>:
                </p>

                <pre
                  style={{
                    background: "#080b10",
                    border: "1px solid #2d384e",
                    borderRadius: 6,
                    padding: 14,
                    color: "#7ee787",
                    fontSize: 11,
                    overflowX: "auto",
                    margin: 0,
                    lineHeight: 1.45
                  }}
                >
{`-- 1. Create photos table
create table if not exists public.photos (
  id text primary key,
  src text,
  alt text default '',
  caption text default '',
  description text,
  location text,
  tilt text default '0deg',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Create posts table
create table if not exists public.posts (
  slug text primary key,
  title text not null,
  summary text,
  date text,
  draft boolean default false,
  spine_color text default 'var(--tan)',
  related_hackathon text,
  content text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Enable Public Access
alter table public.photos enable row level security;
drop policy if exists "Allow all photos" on public.photos;
create policy "Allow all photos" on public.photos for all using (true) with check (true);

alter table public.posts enable row level security;
drop policy if exists "Allow all posts" on public.posts;
create policy "Allow all posts" on public.posts for all using (true) with check (true);

-- 4. Create portfolio storage bucket for direct phone camera uploads
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "Allow public uploads to portfolio" on storage.objects;
create policy "Allow public uploads to portfolio" on storage.objects
  for all using (bucket_id = 'portfolio') with check (bucket_id = 'portfolio');`}
                </pre>

                <p style={{ color: "#8b949e", fontSize: 12, margin: 0 }}>
                  💡 Even without running this SQL script, all changes and phone uploads work immediately and are cached locally in your project!
                </p>
              </div>

              <div
                style={{
                  padding: "16px 24px",
                  borderTop: "1px solid #1f2737",
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowSupabaseHelper(false)}
                  style={{
                    padding: "8px 20px",
                    background: "#238636",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
