#!/bin/bash

# =============================================================================
# UNDERNEATH VIDEO ASSETS CONVERSION SCRIPT
# =============================================================================
#
# This script converts MP4 videos specifically for underneath video assets with:
# - Desktop: 900x506px (2x for retina on 450px container)
# - Mobile: 700x394px (2x for retina on 350px container)
# - Posters: First frame extracted for seamless transitions
# - Output: Directly to public/videos/underneath/ for AdvancedVideoPlayer
#
# =============================================================================
# USAGE
# =============================================================================
#
# Basic usage (uses source folder in underneath/):
#   ./convert_underneath_videos.sh
#
# Custom input directory (outputs to public/videos/underneath/):
#   ./convert_underneath_videos.sh "input-videos/"
#
# Custom input and output directories:
#   ./convert_underneath_videos.sh "videos/raw/" "public/videos/underneath/"
#
# =============================================================================
# REQUIREMENTS
# =============================================================================
#
# - ffmpeg must be installed and available in PATH
# - Input directory must contain MP4 files
# - Script must have execute permissions: chmod +x convert_underneath_videos.sh
#
# =============================================================================
# FFMPEG INSTALLATION
# =============================================================================
#
# macOS (using Homebrew):
#   brew install ffmpeg
#
# Windows (using Chocolatey):
#   choco install ffmpeg
#
# Windows (using Scoop):
#   scoop install ffmpeg
#
# Windows (using winget):
#   winget install ffmpeg
#
# Linux (Ubuntu/Debian):
#   sudo apt update && sudo apt install ffmpeg
#
# Linux (CentOS/RHEL):
#   sudo yum install ffmpeg
#
# =============================================================================
# OUTPUT STRUCTURE
# =============================================================================
#
# public/videos/underneath/
# ├── video1-desktop.mp4
# ├── video1-desktop-poster.jpg
# ├── video1-mobile.mp4
# ├── video1-mobile-poster.jpg
# ├── video2-desktop.mp4
# ├── video2-desktop-poster.jpg
# ├── video2-mobile.mp4
# └── video2-mobile-poster.jpg
#
# =============================================================================
# OPTIMIZATION SETTINGS
# =============================================================================
#
# Desktop Videos:
# - Resolution: 900x506px (16:9 aspect ratio)
# - Codec: H.264 with web-optimized settings
# - Bitrate: 1.5Mbps max
# - Audio: AAC 128kbps
# - Fast Start: Enabled for immediate playback
#
# Mobile Videos:
# - Resolution: 700x394px (16:9 aspect ratio)
# - Codec: H.264 with web-optimized settings
# - Bitrate: 1Mbps max
# - Audio: AAC 96kbps
# - Fast Start: Enabled for immediate playback
#
# Posters:
# - Extracted from first frame (0 seconds) for seamless transitions
# - High quality JPEG (q:v 2)
# - Same resolution as corresponding video
#
# =============================================================================
# EXAMPLES
# =============================================================================
#
# Example 1: Use source folder workflow (recommended)
#   ./convert_underneath_videos.sh
#   # Script creates public/videos/underneath/source/ folder
#   # Put your videos in source/ folder and run again
#
# Example 2: Process videos from specific folder
#   ./convert_underneath_videos.sh "raw-videos/"
#
# Example 3: Process single video (place in dedicated folder)
#   mkdir single-video
#   cp my-video.mp4 single-video/
#   ./convert_underneath_videos.sh "single-video/"
#
# =============================================================================

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Error: ffmpeg is not installed or not in PATH"
    echo ""
    echo "Please install ffmpeg using one of these methods:"
    echo ""
    echo "🍎 macOS (using Homebrew):"
    echo "   brew install ffmpeg"
    echo ""
    echo "🪟 Windows (using Chocolatey):"
    echo "   choco install ffmpeg"
    echo ""
    echo "🪟 Windows (using Scoop):"
    echo "   scoop install ffmpeg"
    echo ""
    echo "🪟 Windows (using winget):"
    echo "   winget install ffmpeg"
    echo ""
    echo "🐧 Linux (Ubuntu/Debian):"
    echo "   sudo apt update && sudo apt install ffmpeg"
    echo ""
    echo "🐧 Linux (CentOS/RHEL):"
    echo "   sudo yum install ffmpeg"
    echo ""
    echo "After installation, restart your terminal and try again."
    exit 1
fi

# Default output directory
OUTPUT_DIR=${2:-"public/videos/underneath/"}

# Check if input directory is provided
if [ -z "$1" ]; then
    # No input directory provided, check for source folder
    SOURCE_DIR="${OUTPUT_DIR}source/"
    
    if [ ! -d "$SOURCE_DIR" ]; then
        echo "No source folder found. Creating source folder..."
        mkdir -p "$SOURCE_DIR"
        echo ""
        echo "📁 Created: $SOURCE_DIR"
        echo ""
        echo "Please:"
        echo "1. Put your source MP4 videos into: $SOURCE_DIR"
        echo "2. Run the script again: ./convert_underneath_videos.sh"
        echo ""
        exit 0
    fi
    
    # Source folder exists, check for videos
    videos=($(find "$SOURCE_DIR" -name "*.mp4" -type f | sort))
    
    if [ ${#videos[@]} -eq 0 ]; then
        echo "Source folder found but no MP4 videos inside."
        echo ""
        echo "Please:"
        echo "1. Put your source MP4 videos into: $SOURCE_DIR"
        echo "2. Run the script again: ./convert_underneath_videos.sh"
        echo ""
        exit 0
    fi
    
    INPUT_DIR="$SOURCE_DIR"
    USE_SOURCE_FOLDER=true
else
    INPUT_DIR="$1"
    USE_SOURCE_FOLDER=false
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "Underneath video assets conversion script"
echo "============================================="
echo "Input directory: $INPUT_DIR"
echo "Output directory: $OUTPUT_DIR"
echo ""

# Find all MP4 files in input directory (if not already found)
if [ "$USE_SOURCE_FOLDER" = false ]; then
    videos=($(find "$INPUT_DIR" -name "*.mp4" -type f | sort))
fi

if [ ${#videos[@]} -eq 0 ]; then
    echo "No MP4 files found in $INPUT_DIR"
    exit 1
fi

echo "Found ${#videos[@]} video(s) to process:"
for video in "${videos[@]}"; do
    echo "  - $(basename "$video")"
done
echo ""

for video in "${videos[@]}"; do
    # Extract base name without extension
    basename=$(basename "$video" .mp4)
    basename_lower=$(echo "$basename" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
    
    echo "Processing: $basename"
    
    # Desktop version (900x506)
    echo "  Creating desktop version..."
    ffmpeg -i "$video" \
        -c:v libx264 \
        -preset medium \
        -crf 23 \
        -maxrate 1.5M \
        -bufsize 3M \
        -vf "scale=900:506" \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        "${OUTPUT_DIR}${basename_lower}-desktop.mp4" \
        -y
    
    # Mobile version (700x394)
    echo "  Creating mobile version..."
    ffmpeg -i "$video" \
        -c:v libx264 \
        -preset medium \
        -crf 23 \
        -maxrate 1M \
        -bufsize 2M \
        -vf "scale=700:394" \
        -c:a aac \
        -b:a 96k \
        -movflags +faststart \
        "${OUTPUT_DIR}${basename_lower}-mobile.mp4" \
        -y
    
    # Desktop poster (first frame from desktop video)
    echo "  Creating desktop poster..."
    ffmpeg -i "${OUTPUT_DIR}${basename_lower}-desktop.mp4" \
        -ss 0 \
        -vframes 1 \
        -q:v 2 \
        "${OUTPUT_DIR}${basename_lower}-desktop-poster.jpg" \
        -y
    
    # Mobile poster (first frame from mobile video)
    echo "  Creating mobile poster..."
    ffmpeg -i "${OUTPUT_DIR}${basename_lower}-mobile.mp4" \
        -ss 0 \
        -vframes 1 \
        -q:v 2 \
        "${OUTPUT_DIR}${basename_lower}-mobile-poster.jpg" \
        -y
    
    echo "  ✓ Completed: $basename"
    echo ""
done

echo "All videos converted successfully!"
echo ""

# Clean up source folder if it was used
if [ "$USE_SOURCE_FOLDER" = true ]; then
    echo "🧹 Cleaning up source folder..."
    rm -rf "$SOURCE_DIR"
    echo "✅ Source folder cleaned up!"
    echo ""
fi

echo "Output files in $OUTPUT_DIR:"
ls -lh "$OUTPUT_DIR"
echo ""
echo "Total size reduction:"
echo "Original total: $(du -sh "$INPUT_DIR" | cut -f1)"
echo "Optimized total: $(du -sh "$OUTPUT_DIR" | cut -f1)"

if [ "$USE_SOURCE_FOLDER" = true ]; then
    echo ""
    echo "🎉 Conversion complete! Source folder has been cleaned up."
    echo "Your optimized videos are ready in: $OUTPUT_DIR"
fi
