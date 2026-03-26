'use client';

import { useLikes } from '../hooks/useLikes';

interface Props {
  wallpaperId: string;
  src: string;
  filename: string;
  mobile?: boolean;
  /** Compact stacked buttons for overlaying inside a card image */
  overlay?: boolean;
  likeRotate?: string;
  downloadRotate?: string;
}

export default function WallpaperActions({
  wallpaperId,
  src,
  filename,
  mobile = false,
  overlay = false,
  likeRotate,
  downloadRotate,
}: Props) {
  const { count, isLiked, toggleLike, loading } = useLikes(wallpaperId);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = src;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Compact overlay variant — used inside mobile image cards
  if (overlay) {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={toggleLike}
          disabled={loading}
          className={`px-5 py-2.5 font-headline font-black text-xs uppercase tracking-tighter sticker-shadow flex items-center gap-1.5 transition-all
            ${isLiked
              ? 'bg-surface text-primary-fixed border border-primary-fixed rotate-2'
              : `bg-primary-fixed text-surface ${likeRotate ?? '-rotate-2'} hover:rotate-0`
            } ${loading ? 'opacity-60' : ''}`}
        >
          <span
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
          {isLiked ? 'LIKED' : 'LIKE'}
          {count > 0 && <span className="opacity-60 font-body font-normal text-[10px]">{count}</span>}
        </button>
        <button
          onClick={handleDownload}
          className={`bg-primary-fixed text-surface px-5 py-2.5 font-headline font-black text-xs uppercase tracking-tighter sticker-shadow flex items-center gap-1.5 transition-transform ${downloadRotate ?? 'rotate-1 hover:rotate-0'}`}
        >
          <span className="material-symbols-outlined text-sm">download</span>GET_FILE
        </button>
      </div>
    );
  }

  // Mobile variant — side-by-side below image
  if (mobile) {
    return (
      <div className="mt-4 flex gap-3">
        <button
          onClick={toggleLike}
          disabled={loading}
          className={`flex-1 py-3 font-headline font-black text-sm uppercase tracking-tighter sticker-shadow flex items-center justify-center gap-2 transition-all
            ${isLiked
              ? 'bg-surface text-primary-fixed border-2 border-primary-fixed rotate-1'
              : 'bg-primary-fixed text-surface -rotate-1'
            } ${loading ? 'opacity-60' : ''}`}
        >
          <span
            className="material-symbols-outlined text-base"
            style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
          {isLiked ? 'LIKED' : 'LIKE'}
          {count > 0 && <span className="opacity-60 font-body font-normal text-xs">{count}</span>}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 bg-surface text-primary-fixed border-2 border-primary-fixed py-3 font-headline font-black text-sm uppercase tracking-tighter rotate-1 sticker-shadow flex items-center justify-center gap-2 hover:-rotate-1 transition-transform"
        >
          <span className="material-symbols-outlined text-base">download</span>DOWNLOAD
        </button>
      </div>
    );
  }

  // Desktop variant — stacked, no absolute positioning (parent handles placement)
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={toggleLike}
        disabled={loading}
        className={`px-6 py-3 font-headline font-black text-sm uppercase tracking-tighter sticker-shadow flex items-center gap-2 transition-all
          ${isLiked
            ? 'bg-surface text-primary-fixed border-2 border-primary-fixed rotate-2'
            : `bg-primary-fixed text-surface ${likeRotate ?? 'rotate-2'} hover:-rotate-2`
          } ${loading ? 'opacity-60' : ''}`}
      >
        <span
          className="material-symbols-outlined text-lg"
          style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
        >
          favorite
        </span>
        {isLiked ? 'LIKED' : 'LIKE'}
        {count > 0 && <span className="opacity-60 font-body font-normal text-sm ml-1">{count}</span>}
      </button>
      <button
        onClick={handleDownload}
        className={`bg-surface text-primary-fixed border-2 border-primary-fixed px-6 py-3 font-headline font-black text-sm uppercase tracking-tighter sticker-shadow flex items-center gap-2 transition-transform ${downloadRotate ?? '-rotate-1 hover:rotate-1'}`}
      >
        <span className="material-symbols-outlined text-lg">download</span>DOWNLOAD
      </button>
    </div>
  );
}
