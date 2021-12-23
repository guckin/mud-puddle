#!/usr/bin/bash

chrome_version_number=827102
chrome_driver_version=88.0.4324.96

mkdir -p "/opt/chrome"
curl -Lo "/opt/chrome/chrome-linux.zip" "https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F${chrome_version_number}%2Fchrome-linux.zip?alt=media"
unzip -q "/opt/chrome/chrome-linux.zip" -d "/opt/chrome/"
mv /opt/chrome/chrome-linux/* /opt/chrome/
rm -rf /opt/chrome/chrome-linux "/opt/chrome/chrome-linux.zip"

mkdir -p "/opt/chromedriver"
curl -Lo "/opt/chromedriver/chromedriver_linux64.zip" "https://chromedriver.storage.googleapis.com/$chrome_driver_version/chromedriver_linux64.zip"
unzip -q "/opt/chromedriver/chromedriver_linux64.zip" -d "/opt/chromedriver/"
chmod +x "/opt/chromedriver/chromedriver"
rm -rf "/opt/chromedriver/chromedriver_linux64.zip"
