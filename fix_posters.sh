#!/bin/bash

# Recreate poster images using the first frame (0 seconds) for seamless transitions
# Desktop: 900x506px, Mobile: 700x394px

videos=(
    "abstract"
    "doma"
    "hibachi" 
    "kamigotchi"
    "towns"
)

echo "Recreating poster images using first frame for seamless transitions..."

for video in "${videos[@]}"; do
    echo "Processing: $video"
    
    # Desktop poster (900x506) - first frame
    echo "  Creating desktop poster (first frame)..."
    ffmpeg -i "videos/optimized/desktop/${video}-desktop.mp4" \
        -ss 0 \
        -vframes 1 \
        -q:v 2 \
        "videos/optimized/posters/desktop/${video}-desktop-poster.jpg" \
        -y
    
    # Mobile poster (700x394) - first frame
    echo "  Creating mobile poster (first frame)..."
    ffmpeg -i "videos/optimized/mobile/${video}-mobile.mp4" \
        -ss 0 \
        -vframes 1 \
        -q:v 2 \
        "videos/optimized/posters/mobile/${video}-mobile-poster.jpg" \
        -y
    
    echo "  ✓ Completed: $video"
    echo ""
done

echo "All poster images recreated with first frame!"
echo ""
echo "Updated poster files:"
ls -lh videos/optimized/posters/desktop/
ls -lh videos/optimized/posters/mobile/

