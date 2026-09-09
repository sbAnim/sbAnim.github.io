
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Give tile videos a visible paused frame without requiring playback.
document.querySelectorAll('video[data-thumb]').forEach(video => {
  const seekToPreview = () => {
    try {
      const t = Math.min(1.5, Math.max(0.1, (video.duration || 2) * 0.05));
      video.currentTime = t;
      video.pause();
    } catch(e) {}
  };
  if (video.readyState >= 1) seekToPreview();
  else video.addEventListener('loadedmetadata', seekToPreview, {once:true});
});

// On collection pages, clicking a small tile loads it into the large player.
const stage = document.querySelector('[data-stage-player]');
const label = document.querySelector('[data-now-playing]');
if (stage) {
  document.querySelectorAll('[data-clip-src]').forEach(button => {
    button.addEventListener('click', () => {
      const src = button.getAttribute('data-clip-src');
      const title = button.getAttribute('data-clip-title') || '';
      if (!src) return;
      stage.pause();
      stage.src = src;
      stage.load();
      stage.play().catch(() => {});
      if (label) label.textContent = title;
      document.querySelectorAll('[data-clip-src]').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      stage.scrollIntoView({behavior:'smooth', block:'center'});
    });
  });
}
