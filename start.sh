#!/bin/bash
echo "🚀 Setting up Dragon Panel & Wings..."

# Install dependencies
npm install

# Start Wings
bash install_wings.sh

# Start Dragon Panel
npm start
