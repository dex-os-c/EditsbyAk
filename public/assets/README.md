# Assets

Drop real files in here using these **exact filenames** (matching the
client's original site) and they'll be picked up automatically -- nothing
else needs to change in the code. Until a file is uploaded, its matching
placeholder shows instead (never a broken image/video).

| File | Used for |
|---|---|
| `profile.jpg` | Portrait used in the hero and about sections. Portrait orientation, ~1200px tall recommended. |
| `card.png` | The business card design, shown in the contact section's lightbox. |
| `wedding.mp4` | "Wedding Edit" portfolio piece. |
| `festival.mp4` | "Festival Edit" portfolio piece. |
| `motion-graphics.mp4` | "Motion Graphics Edit" portfolio piece. |
| `insta-reel.mp4` | "Insta Reel Edit" portfolio piece. |
| `showreel.mp4` | Plays when the "Watch The Work" section's play button is clicked. |

To add a new portfolio project (not just replace one of the four above),
add an entry to the `PROJECTS` array in `src/data/content.js` with its own
`video` filename.

Keep videos web-sized (H.264 mp4, reasonably compressed) -- these autoplay
muted on hover in the portfolio gallery, so a multi-hundred-MB file will
make that feel sluggish.
