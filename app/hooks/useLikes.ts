'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, increment, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

function getUserId(): string {
  let uid = localStorage.getItem('rs_uid');
  if (!uid) {
    uid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('rs_uid', uid);
  }
  return uid;
}

export function useLikes(wallpaperId: string) {
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Restore liked state from localStorage
    setIsLiked(localStorage.getItem(`rs_liked_${wallpaperId}`) === '1');

    // Real-time count from Firestore
    const ref = doc(db, 'likes', wallpaperId);
    const unsub = onSnapshot(ref, (snap) => {
      setCount(snap.exists() ? (snap.data().count ?? 0) : 0);
    });

    return () => unsub();
  }, [wallpaperId]);

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);

    const ref = doc(db, 'likes', wallpaperId);
    const newLiked = !isLiked;
    const delta = newLiked ? 1 : -1;

    try {
      const snap = await getDoc(ref);
      if (snap.exists()) {
        await updateDoc(ref, { count: increment(delta) });
      } else {
        await setDoc(ref, { count: Math.max(0, delta) });
      }

      if (newLiked) {
        localStorage.setItem(`rs_liked_${wallpaperId}`, '1');
      } else {
        localStorage.removeItem(`rs_liked_${wallpaperId}`);
      }
      setIsLiked(newLiked);
    } catch (err) {
      console.error('Like error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { count, isLiked, toggleLike, loading };
}
