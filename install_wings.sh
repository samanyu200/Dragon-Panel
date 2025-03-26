#!/bin/bash

echo "🔧 Installing Pterodactyl Wings..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl tar unzip git docker.io

echo "🐳 Setting up Docker..."
sudo systemctl enable --now docker

echo "📥 Downloading Wings..."
curl -Lo wings.tar.gz https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_amd64.tar.gz
mkdir -p /etc/pterodactyl
tar -xzvf wings.tar.gz -C /etc/pterodactyl
chmod +x /etc/pterodactyl/wings

echo "⚙️ Configuring Wings..."
cp config/wings_config.json /etc/pterodactyl/config.yml

echo "🚀 Starting Wings..."
nohup /etc/pterodactyl/wings --config /etc/pterodactyl/config.yml > wings.log 2>&1 &

echo "✅ Wings installed & running!"
