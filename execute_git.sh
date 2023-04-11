#!/bin/bash

# Check if a commit message was provided
if [ -z "$1" ]; then
  echo "Error: Please provide a commit message."
  echo "Usage: ./commit_and_push.sh <commit-message>"
  exit 1
fi

# Set the commit message
commit_message="$1"

# Add all changes to the staging area
git add .

# Commit the changes with the provided message
git commit -m "$commit_message"

# Push the changes to the remote repository
git push

