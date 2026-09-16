import { create } from "zustand";
import { ShowList, seedUserLists } from "@/lib/data";

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `list-${Date.now()}`
  );
}

interface ListsState {
  userLists: ShowList[];
  createList: (title: string, description: string) => ShowList;
  addShowToList: (listSlug: string, showSlug: string) => void;
  removeShowFromList: (listSlug: string, showSlug: string) => void;
  deleteList: (listSlug: string) => void;
}

// Demo-only store: seeded from lib/data.ts, lives in memory for the
// session. Swap these actions for real API calls when there's a backend —
// admin ("must-watch") lists stay server-curated and out of this store.
export const useListsStore = create<ListsState>((set, get) => ({
  userLists: seedUserLists,

  createList: (title, description) => {
    const list: ShowList = {
      slug: slugify(title),
      pageNo: `P.${143 + get().userLists.length}`,
      title,
      curator: "user",
      ownerName: "You",
      isMine: true,
      description,
      showSlugs: [],
    };
    set((s) => ({ userLists: [list, ...s.userLists] }));
    return list;
  },

  addShowToList: (listSlug, showSlug) => {
    set((s) => ({
      userLists: s.userLists.map((l) =>
        l.slug === listSlug && !l.showSlugs.includes(showSlug)
          ? { ...l, showSlugs: [...l.showSlugs, showSlug] }
          : l
      ),
    }));
  },

  removeShowFromList: (listSlug, showSlug) => {
    set((s) => ({
      userLists: s.userLists.map((l) =>
        l.slug === listSlug
          ? { ...l, showSlugs: l.showSlugs.filter((sl) => sl !== showSlug) }
          : l
      ),
    }));
  },

  deleteList: (listSlug) => {
    set((s) => ({ userLists: s.userLists.filter((l) => l.slug !== listSlug) }));
  },
}));
