#!/bin/bash

# Function to replace text in a file
replace_text() {
    file="$1"
    old_text="$2"
    new_text="$3"

    # Create a temporary file
    tmpfile=$(mktemp)

    sed "s/$old_text/$new_text/g" "$file" > "$tmpfile"

    # Replace the original file with the temporary file
    mv "$tmpfile" "$file"
}

# Check if the correct number of arguments is provided
if [ $# -ne 3 ]; then
    echo "Usage: $0 <directory> <old_text> <new_text>"
    exit 1
fi

# Get arguments from the command line
directory="$1"
old_text="$2"
new_text="$3"

# Find all files in the specified directory and its subdirectories
find "$directory" -type f | while read file; do
    replace_text "$file" "$old_text" "$new_text"
done

echo "Text replacement completed successfully!"
