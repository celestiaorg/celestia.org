# Video Conversion Script for Underneath Assets

You will find at root level of this project the `convert_underneath_videos.sh` script which is an automated script for converting MP4 videos for the Underneath video carousel component.

## What It Does

-   Converts source MP4s to web-optimized formats:
    -   **Desktop:** `900×506px`
    -   **Mobile:** `700×394px`
-   Generates high-quality poster images (from the first frame) for seamless transitions.
-   Outputs directly to `public/videos/underneath/` in the flat structure expected by `AdvancedVideoPlayer`.
-   Lets you easily reference video and poster paths in `apps-on-celestia.js`.
-   **Note:** Remember to update `src/data/home/apps-on-celestia.js` with the new video and poster paths after conversion.
-   Smart source folder workflow with automatic cleanup.

## Key Features

-   Cross-platform `ffmpeg` detection with install instructions for Windows, macOS, and Linux.
-   Retina-optimized (2x) resolution for crisp display on high-DPI screens.
-   Web-optimized encoding: H.264, controlled bitrates, fast-start metadata.
-   User-friendly: just run `./convert_underneath_videos.sh` and follow prompts.

## Usage

```bash

# Recommended workflow
./convert_underneath_videos.sh
# Script creates source folder, you add videos, run again

# Or specify input directory
./convert_underneath_videos.sh "raw-videos/"

```

This replaces manual video processing and ensures consistent, optimized assets for the underneath video carousel.

---

# Video Export Specifications for Underneath Assets

If you're handling video exports directly, here are the exact specifications needed for the underneath video carousel:

### Required Assets (per video):

1. **Desktop Video**: `[video-name]-desktop.mp4`

    - Resolution: 900×506px (16:9 aspect ratio)
    - Codec: H.264
    - Bitrate: Max 1.5Mbps
    - Audio: AAC 128kbps
    - Fast Start: Enabled (metadata at beginning)

2. **Mobile Video**: `[video-name]-mobile.mp4`

    - Resolution: 700×394px (16:9 aspect ratio)
    - Codec: H.264
    - Bitrate: Max 1Mbps
    - Audio: AAC 96kbps
    - Fast Start: Enabled (metadata at beginning)

3. **Desktop Poster**: `[video-name]-desktop-poster.jpg`

    - Resolution: 900×506px (matches desktop video)
    - Source: First frame (0 seconds) of the video
    - Quality: High JPEG (q:v 2)

4. **Mobile Poster**: `[video-name]-mobile-poster.jpg`
    - Resolution: 700×394px (matches mobile video)
    - Source: First frame (0 seconds) of the video
    - Quality: High JPEG (q:v 2)

### File Naming Convention:

-   Use lowercase with hyphens: `abstract-desktop.mp4`, `doma-mobile-poster.jpg`
-   Replace spaces with hyphens
-   Keep original video name as base

### Output Location:

All files go directly into `public/videos/underneath/` (flat structure, no subfolders).

**Note:** After conversion, update `src/data/home/apps-on-celestia.js` with the new video and poster paths.

Then

### Why These Specs:

-   **2x retina resolution** for crisp display on high-DPI screens
-   **Optimized bitrates** for fast web loading
-   **First frame posters** for seamless video transitions
-   **Fast Start** enables immediate playback without full download

This ensures perfect compatibility with the `AdvancedVideoPlayer` component and optimal web performance.
