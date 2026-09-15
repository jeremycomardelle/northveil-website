/**
 * Northveil video lineup.
 *
 * Add a video by pushing an object into NORTHVEIL_VIDEOS below.
 *
 * YouTube video:
 *   { title: "Wildcat Unboxing", type: "youtube", id: "dQw4w9WgXcQ" }
 *
 * Self-hosted file (drop the file in assets/videos/ first):
 *   { title: "Wildcat Unboxing", type: "file", src: "assets/videos/unboxing.mp4", poster: "assets/images/unboxing-poster.jpg" }
 *
 * Leave the array empty (or entries partially filled) and the section
 * will automatically render "Coming Soon" placeholder cards instead.
 */
const NORTHVEIL_VIDEOS = [
  // { title: "Wildcat Unboxing", type: "youtube", id: "" },
  // { title: "Meet the Founder", type: "youtube", id: "" },
  // { title: "Wildcat in Action", type: "youtube", id: "" },
];

const NORTHVEIL_VIDEO_PLACEHOLDER_COUNT = 3;

function renderNorthveilVideos() {
  const grid = document.getElementById("videoGrid");
  if (!grid) return;

  const items = NORTHVEIL_VIDEOS.length > 0
    ? NORTHVEIL_VIDEOS
    : Array.from({ length: NORTHVEIL_VIDEO_PLACEHOLDER_COUNT }, () => null);

  grid.innerHTML = items.map((video) => {
    if (!video || (video.type === "youtube" && !video.id) || (video.type === "file" && !video.src)) {
      return `
        <div class="video-card">
          <div class="video-frame">
            <div class="video-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m10 8 6 4-6 4V8Z"/><circle cx="12" cy="12" r="10"/></svg>
              <span>Video coming soon</span>
            </div>
          </div>
          <h4>More Wildcat content on the way</h4>
        </div>`;
    }

    const frame = video.type === "youtube"
      ? `<iframe src="https://www.youtube.com/embed/${video.id}" title="${video.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      : `<video controls preload="none" ${video.poster ? `poster="${video.poster}"` : ""}><source src="${video.src}" type="video/mp4"></video>`;

    return `
      <div class="video-card">
        <div class="video-frame">${frame}</div>
        <h4>${video.title}</h4>
      </div>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", renderNorthveilVideos);
