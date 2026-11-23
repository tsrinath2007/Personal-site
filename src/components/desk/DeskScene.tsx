"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { DESK_ITEMS, DeskItemData, DrawerOpenOptions, LaptopFolder } from "@/../content/desk";
import { BlogPost } from "@/lib/blog";
import { DeskHeader } from "./DeskHeader";
import { DeskNote } from "./DeskNote";
import { DeskDrawer } from "./DeskDrawer";

interface DeskSceneProps {
  blogPosts: BlogPost[];
}

export function DeskScene({ blogPosts }: DeskSceneProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [drawerName, setDrawerName] = useState<string>("laptop");
  const [drawerOptions, setDrawerOptions] = useState<DrawerOpenOptions>({});
  const [returnToElement, setReturnToElement] = useState<HTMLElement | null>(null);

  const [isSessionCharged, setIsSessionCharged] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const laptopBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleSelectObject = (id: string, targetEl: HTMLElement) => {
    if (selectedId === id) {
      setSelectedId(null);
      setSelectedElement(null);
      return;
    }
    setSelectedId(id);
    setSelectedElement(targetEl);
  };

  const handleOpenDrawer = useCallback((
    name: string,
    opts?: DrawerOpenOptions,
    fromEl?: HTMLElement | null
  ) => {
    setSelectedId(null);
    setSelectedElement(null);
    setReturnToElement(
      fromEl ||
        selectedElement ||
        (typeof document !== "undefined" ? (document.activeElement as HTMLElement) : null)
    );
    setDrawerName(name);
    setDrawerOptions(opts || {});
    setDrawerOpen(true);

    if (typeof window !== "undefined") {
      const targetPath = `/${name}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ drawer: name }, "", targetPath);
      }
    }
  }, [selectedElement]);

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false);
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.history.pushState(null, "", "/");
    }
  }, []);

  // Listen to browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, "");
      if (path && ["laptop", "blog", "now", "photos", "about", "contact"].includes(path)) {
        setDrawerName(path);
        setDrawerOpen(true);
      } else {
        setDrawerOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Center the horizontal scroll on the laptop on mobile mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768 && scrollerRef.current) {
      const el = scrollerRef.current;
      const targetScroll = (el.scrollWidth - window.innerWidth) / 2;
      el.scrollLeft = targetScroll;
    }
  }, []);

  const handleHomeClick = () => {
    setSelectedId(null);
    setSelectedElement(null);
    handleCloseDrawer();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNoteEnter = (item: DeskItemData) => {
    const go = item.go;
    const parts = go.split(":");
    const pageName = parts[0];
    const folder = parts[1] as LaptopFolder | undefined;

    handleOpenDrawer(
      pageName,
      folder ? { folder, skip: true } : { skip: false },
      selectedElement
    );
  };

  const activeItem = selectedId ? DESK_ITEMS[selectedId] || null : null;

  return (
    <>
      <DeskHeader onOpen={(target, opts) => handleOpenDrawer(target, opts)} onHome={handleHomeClick} />

      <main id="top">
        <div className="m-hero">
          <p className="hi">Hey there!</p>
          <h1>
            I&apos;m <em>Srinath</em>.
          </h1>
          <p>
            A software engineer who likes building cool stuff, solving interesting problems
            and turning ideas into products.
          </p>
        </div>

        <div className="stage" id="stage" ref={stageRef}>
          <div className="scene-scroll" id="sceneScroll" ref={scrollerRef}>
            <div className="scene" id="scene" ref={sceneRef}>
              {/* Desktop painted desk scene */}
              <Image
                className="art art-desktop"
                src="/scene.webp"
                alt="A painted desk with a laptop, a stack of books, a coffee mug, a boarding pass, a sticky note and pinned photos."
                width={1672}
                height={867}
                priority
                draggable={false}
              />

              {/* Mobile vertical portrait desk scene */}
              <Image
                className="art art-mobile"
                src="/scene-mobile.webp"
                alt="Mobile painted desk workspace with laptop, sticky notes, books and polaroids"
                width={470}
                height={1024}
                priority
                draggable={false}
              />

              {/* MOBILE HOTSPOTS (Direct Touch Targets on Mobile) */}
              <div className="mobile-hotspots">
                {/* Explore button */}
                <button
                  type="button"
                  className="mobile-hot"
                  style={{ left: "6.5%", top: "39.5%", width: "35%", height: "5.5%" }}
                  aria-label="Explore Projects"
                  onClick={() => handleOpenDrawer("laptop", { folder: "projects", skip: true })}
                />
                {/* Laptop & Terminal */}
                <button
                  type="button"
                  className="mobile-hot"
                  style={{ left: "14%", top: "47%", width: "58%", height: "20%" }}
                  aria-label="Open Laptop Projects"
                  onClick={() => handleOpenDrawer("laptop", { folder: "projects", skip: true })}
                />
                {/* Mountain Polaroid */}
                <button
                  type="button"
                  className="mobile-hot"
                  style={{ left: "64%", top: "14%", width: "32%", height: "14%" }}
                  aria-label="Open Photos"
                  onClick={() => handleOpenDrawer("photos")}
                />
                {/* Current Focus Sticky Note */}
                <button
                  type="button"
                  className="mobile-hot"
                  style={{ left: "68%", top: "37%", width: "30%", height: "13%" }}
                  aria-label="Current Focus"
                  onClick={() => handleOpenDrawer("now")}
                />
                {/* Spiral Notebook (Notes) */}
                <button
                  type="button"
                  className="mobile-hot"
                  style={{ left: "2%", top: "60%", width: "23%", height: "6%" }}
                  aria-label="Notes & Blog"
                  onClick={() => handleOpenDrawer("blog")}
                />
                {/* Pen (Contact) */}
                <button
                  type="button"
                  className="mobile-hot"
                  style={{ left: "1%", top: "65%", width: "16%", height: "3%" }}
                  aria-label="Leave a note / Contact"
                  onClick={() => handleOpenDrawer("contact")}
                />
                {/* Stack of Books */}
                <button
                  type="button"
                  className="mobile-hot"
                  style={{ left: "68%", top: "56%", width: "22%", height: "7.5%" }}
                  aria-label="Books & Blog"
                  onClick={() => handleOpenDrawer("blog")}
                />
                {/* Coffee Mug */}
                <button
                  type="button"
                  className="mobile-hot"
                  style={{ left: "86%", top: "57%", width: "14%", height: "8%" }}
                  aria-label="Coffee Mug - Focus"
                  onClick={() => handleOpenDrawer("now")}
                />
                {/* Boarding Pass */}
                <button
                  type="button"
                  className="mobile-hot"
                  style={{ left: "67%", top: "65%", width: "24%", height: "4.5%" }}
                  aria-label="Boarding Pass - Where I am"
                  onClick={() => handleOpenDrawer("now")}
                />
                {/* Bottom Left Polaroid */}
                <button
                  type="button"
                  className="mobile-hot"
                  style={{ left: "2%", top: "71%", width: "16%", height: "8%" }}
                  aria-label="Photos"
                  onClick={() => handleOpenDrawer("photos")}
                />
              </div>

              {/* DESKTOP HOTSPOTS */}
              <div className="desktop-hotspots">
                {/* Invisible explore helper hotspot */}
                <button
                  type="button"
                  className="hot"
                  data-id="explore"
                  style={{
                    left: "7.66%",
                    top: "52.02%",
                    width: "11.48%",
                    height: "7.73%"
                  }}
                  aria-label="Explore the desk"
                  aria-expanded={selectedId === "laptop"}
                  onClick={() => {
                    if (laptopBtnRef.current) {
                      handleSelectObject("laptop", laptopBtnRef.current);
                    }
                  }}
                />

                {/* Laptop polygon hotspot */}
                <div
                  className="hw"
                  style={{
                    left: "29.01%",
                    top: "27.45%",
                    width: "40.37%",
                    height: "53.06%"
                  }}
                >
                  <button
                    type="button"
                    ref={laptopBtnRef}
                    className={`hot poly ${selectedId === "laptop" ? "sel" : ""}`}
                    data-id="laptop"
                    aria-label="Laptop"
                    aria-expanded={selectedId === "laptop"}
                    onClick={(e) => handleSelectObject("laptop", e.currentTarget)}
                  ></button>
                  <span className="tag">Laptop</span>
                </div>

                {/* notebook (left book) -> Blog */}
                <button
                  type="button"
                  className={`hot ${selectedId === "notebook" ? "sel" : ""}`}
                  data-id="notebook"
                  style={DESK_ITEMS.notebook.style}
                  aria-label={DESK_ITEMS.notebook.ariaLabel}
                  aria-expanded={selectedId === "notebook"}
                  onClick={(e) => handleSelectObject("notebook", e.currentTarget)}
                >
                  <span className="tag">{DESK_ITEMS.notebook.tag}</span>
                </button>

                {/* pen -> Send a message (Contact) */}
                <button
                  type="button"
                  className={`hot ${selectedId === "pen" ? "sel" : ""}`}
                  data-id="pen"
                  style={DESK_ITEMS.pen.style}
                  aria-label={DESK_ITEMS.pen.ariaLabel}
                  aria-expanded={selectedId === "pen"}
                  onClick={(e) => handleSelectObject("pen", e.currentTarget)}
                >
                  <span className="tag">{DESK_ITEMS.pen.tag}</span>
                </button>

                {/* photo1 */}
                <button
                  type="button"
                  className={`hot ${selectedId === "photo1" ? "sel" : ""}`}
                  data-id="photo1"
                  style={DESK_ITEMS.photo1.style}
                  aria-label={DESK_ITEMS.photo1.ariaLabel}
                  aria-expanded={selectedId === "photo1"}
                  onClick={(e) => handleSelectObject("photo1", e.currentTarget)}
                >
                  <span className="tag">{DESK_ITEMS.photo1.tag}</span>
                </button>

                {/* mug -> Current focus */}
                <button
                  type="button"
                  className={`hot ${selectedId === "mug" ? "sel" : ""}`}
                  data-id="mug"
                  style={DESK_ITEMS.mug.style}
                  aria-label={DESK_ITEMS.mug.ariaLabel}
                  aria-expanded={selectedId === "mug"}
                  onClick={(e) => handleSelectObject("mug", e.currentTarget)}
                >
                  <span className="tag">{DESK_ITEMS.mug.tag}</span>
                </button>

                {/* ticket */}
                <button
                  type="button"
                  className={`hot ${selectedId === "ticket" ? "sel" : ""}`}
                  data-id="ticket"
                  style={DESK_ITEMS.ticket.style}
                  aria-label={DESK_ITEMS.ticket.ariaLabel}
                  aria-expanded={selectedId === "ticket"}
                  onClick={(e) => handleSelectObject("ticket", e.currentTarget)}
                >
                  <span className="tag">{DESK_ITEMS.ticket.tag}</span>
                </button>

                {/* photo2 */}
                <button
                  type="button"
                  className={`hot ${selectedId === "photo2" ? "sel" : ""}`}
                  data-id="photo2"
                  style={DESK_ITEMS.photo2.style}
                  aria-label={DESK_ITEMS.photo2.ariaLabel}
                  aria-expanded={selectedId === "photo2"}
                  onClick={(e) => handleSelectObject("photo2", e.currentTarget)}
                >
                  <span className="tag">{DESK_ITEMS.photo2.tag}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Small note beside object */}
          <DeskNote
            item={activeItem}
            targetElement={selectedElement}
            stageRef={stageRef}
            scrollerRef={scrollerRef}
            onClose={() => {
              setSelectedId(null);
              setSelectedElement(null);
            }}
            onEnter={handleNoteEnter}
          />
        </div>

        {/* Mobile Quick Desk Navigation Dock (Matching exact 5-item mockup) */}
        <nav className="mobile-desk-dock" aria-label="Quick Desk Navigation">
          <button
            type="button"
            onClick={handleHomeClick}
            className={`dock-item ${!drawerOpen ? "active" : ""}`}
            title="Desk Home"
          >
            <div className="dock-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="dock-label">Home</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenDrawer("laptop", { folder: "projects", skip: true })}
            className={`dock-item ${drawerOpen && drawerName === "laptop" && drawerOptions?.folder === "projects" ? "active" : ""}`}
            title="Projects"
          >
            <div className="dock-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className="dock-label">Projects</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenDrawer("blog")}
            className={`dock-item ${drawerOpen && drawerName === "blog" ? "active" : ""}`}
            title="Notes"
          >
            <div className="dock-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="dock-label">Notes</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenDrawer("laptop", { folder: "hackathons", skip: true })}
            className={`dock-item ${drawerOpen && drawerName === "laptop" && drawerOptions?.folder === "hackathons" ? "active" : ""}`}
            title="Hackathons"
          >
            <div className="dock-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="dock-label">Hackathons</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenDrawer("about")}
            className={`dock-item ${drawerOpen && drawerName === "about" ? "active" : ""}`}
            title="About"
          >
            <div className="dock-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="dock-label">About</span>
          </button>
        </nav>
      </main>

      {/* Modal drawer */}
      <DeskDrawer
        isOpen={drawerOpen}
        activeName={drawerName}
        options={drawerOptions}
        onClose={handleCloseDrawer}
        onOpen={(target, opts) => handleOpenDrawer(target, opts)}
        returnTo={returnToElement}
        blogPosts={blogPosts}
        isSessionCharged={isSessionCharged}
        onSessionChargedChange={setIsSessionCharged}
      />
    </>
  );
}
