#!/bin/bash

# converteix les imatges a avif amb image magick
for img in *.jpg; do
    if [ -f "$img" ]; then
        base=$(basename "$img" .jpg)
        convert "$img" -strip -interlace Plane -quality 80 "${base}.avif"
        echo "Converted $img to ${base}.avif"
    fi
done