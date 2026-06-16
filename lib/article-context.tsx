"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Article, AppNotification, Comment } from "@/types";
import { getAllArticles as getMockArticles } from "@/lib/mock-data";

interface ArticleContextType {
  articles: Article[];
  notifications: AppNotification[];
  comments: Comment[];
  publishArticle: (data: Omit<Article, "id" | "publishedAt">) => void;
  updateArticle: (id: string, data: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  markNotificationRead: (id: string) => void;
  getArticlesByAuthorId: (auteurId: string) => Article[];
  getArticleById: (id: string) => Article | undefined;
  addComment: (articleId: string, auteur: string, contenu: string, auteurId?: string) => void;
  getCommentsByArticleId: (articleId: string) => Comment[];
  getCommentCountByArticleId: (articleId: string) => number;
}

const LS_ARTICLES_KEY = "bc_articles";
const LS_NOTIFS_KEY = "bc_notifs";
const LS_COMMENTS_KEY = "bc_comments";

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Charger les articles
    try {
      const storedArticles = localStorage.getItem(LS_ARTICLES_KEY);
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      } else {
        const mockArticles = getMockArticles();
        localStorage.setItem(LS_ARTICLES_KEY, JSON.stringify(mockArticles));
        setArticles(mockArticles);
      }
    } catch {
      setArticles(getMockArticles());
    }

    // Charger les notifications
    try {
      const storedNotifs = localStorage.getItem(LS_NOTIFS_KEY);
      if (storedNotifs) setNotifications(JSON.parse(storedNotifs));
    } catch {
      setNotifications([]);
    }

    // Charger les commentaires
    try {
      const storedComments = localStorage.getItem(LS_COMMENTS_KEY);
      if (storedComments) setComments(JSON.parse(storedComments));
    } catch {
      setComments([]);
    }
  }, []);

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem(LS_ARTICLES_KEY, JSON.stringify(newArticles));
  };

  const saveNotifs = (newNotifs: AppNotification[]) => {
    setNotifications(newNotifs);
    localStorage.setItem(LS_NOTIFS_KEY, JSON.stringify(newNotifs));
  };

  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem(LS_COMMENTS_KEY, JSON.stringify(newComments));
  };

  const publishArticle = useCallback((data: Omit<Article, "id" | "publishedAt">) => {
    const newArticle: Article = {
      ...data,
      id: `art_${Date.now()}`,
      publishedAt: new Date().toISOString(),
    };
    saveArticles([newArticle, ...articles]);

    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: "Nouvelle publication",
      message: `${data.auteur} a publié "${data.titre}" dans l'univers ${data.categorie}.`,
      date: new Date().toISOString(),
      read: false,
      type: "info",
      link: `/decryptages/${newArticle.id}`,
    };
    saveNotifs([newNotif, ...notifications]);
  }, [articles, notifications]);

  const updateArticle = useCallback((id: string, data: Partial<Article>) => {
    const updated = articles.map(a => a.id === id ? { ...a, ...data } : a);
    saveArticles(updated);
  }, [articles]);

  const deleteArticle = useCallback((id: string) => {
    saveArticles(articles.filter(a => a.id !== id));
  }, [articles]);

  const markNotificationRead = useCallback((id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    saveNotifs(updated);
  }, [notifications]);

  const getArticlesByAuthorId = useCallback((auteurId: string) => {
    return articles.filter(a => a.auteurId === auteurId);
  }, [articles]);

  const getArticleById = useCallback((id: string) => {
    return articles.find(a => a.id === id);
  }, [articles]);

  const addComment = useCallback((
    articleId: string,
    auteur: string,
    contenu: string,
    auteurId?: string
  ) => {
    const newComment: Comment = {
      id: `cmt_${Date.now()}`,
      articleId,
      auteur,
      auteurId,
      contenu,
      date: new Date().toISOString(),
    };
    saveComments([...comments, newComment]);
  }, [comments]);

  const getCommentsByArticleId = useCallback((articleId: string) => {
    return comments.filter(c => c.articleId === articleId);
  }, [comments]);

  const getCommentCountByArticleId = useCallback((articleId: string) => {
    return comments.filter(c => c.articleId === articleId).length;
  }, [comments]);

  return (
    <ArticleContext.Provider value={{
      articles,
      notifications,
      comments,
      publishArticle,
      updateArticle,
      deleteArticle,
      markNotificationRead,
      getArticlesByAuthorId,
      getArticleById,
      addComment,
      getCommentsByArticleId,
      getCommentCountByArticleId,
    }}>
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticles() {
  const ctx = useContext(ArticleContext);
  if (!ctx) {
    throw new Error("useArticles doit être utilisé dans un <ArticleProvider>");
  }
  return ctx;
}
