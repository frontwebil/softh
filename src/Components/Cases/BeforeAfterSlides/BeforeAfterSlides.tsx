import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "ДО",
  afterLabel = "ПІСЛЯ",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const clamp = (v: number, lo: number, hi: number) =>
    Math.min(hi, Math.max(lo, v));

  const posFromEvent = useCallback((e: MouseEvent | TouchEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    return clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
  }, []);

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const onMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      setPosition(posFromEvent(e));
    },
    [dragging, posFromEvent],
  );

  const onEnd = useCallback(() => setDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [onMove, onEnd]);

  const onTrackClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".ba-handle")) return;
    setPosition(posFromEvent(e.nativeEvent));
  };

  return (
    <div
      ref={containerRef}
      className="ba-container"
      style={{ cursor: dragging ? "ew-resize" : "col-resize" }}
      onClick={onTrackClick}
    >
      {/* AFTER — base layer, full width */}
      <img
        src={afterSrc}
        alt="Після"
        draggable={false}
        className="ba-img-base"
      />

      {/* BEFORE — same full size img, clipped via clipPath */}
      <img
        src={beforeSrc}
        alt="До"
        draggable={false}
        className="ba-img-base"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />

      {/* Labels */}
      <span className="ba-label ba-label--left">{beforeLabel}</span>
      <span className="ba-label ba-label--right">{afterLabel}</span>

      {/* Divider */}
      <div className="ba-line" style={{ left: `${position}%` }} />

      {/* Handle */}
      <div
        className="ba-handle"
        onMouseDown={onStart}
        onTouchStart={onStart}
        style={{ left: `${position}%` }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M8 4L3 10L8 16"
            stroke="#8a8278"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 4L17 10L12 16"
            stroke="#8a8278"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
