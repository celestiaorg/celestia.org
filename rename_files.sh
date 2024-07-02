#!/bin/bash

# Function to replace spaces and hyphens with underscores
replace_spaces_and_hyphens() {
    for file in "$1"/*; do
        if [ -d "$file" ]; then
            replace_spaces_and_hyphens "$file"
        elif [ -f "$file" ]; then
            new_name=$(echo "$file" | tr ' ' '_' | tr '-' '_')
            if [ "$file" != "$new_name" ]; then
                mv "$file" "$new_name"
                echo "Renamed: $file -> $new_name"
            fi
        fi
    done
}

# Start from the current directory
replace_spaces_and_hyphens "."

echo "Done."
