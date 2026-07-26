import urllib.request
import re
import os

target_file = r"c:\Users\PRATHAM ANTALA\.gemini\antigravity-ide\scratch\dhruvi-invite\public\miromaxmusic-music-promotion-no-copyright-513944.mp3"
bg_file = r"c:\Users\PRATHAM ANTALA\.gemini\antigravity-ide\scratch\dhruvi-invite\public\bg_music.mp3"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# 1. Search Pixabay for miromaxmusic
urls_to_try = []

try:
    search_req = urllib.request.Request("https://pixabay.com/music/search/miromaxmusic/", headers=headers)
    html = urllib.request.urlopen(search_req).read().decode("utf-8")
    matches = re.findall(r'https://cdn\.pixabay\.com/[^"]*513944[^"]*', html)
    print("Found exact matches:", matches)
    urls_to_try.extend(matches)
except Exception as e:
    print("Search error:", e)

# Add fallback CDN patterns for track ID 513944
urls_to_try.extend([
    "https://cdn.pixabay.com/download/audio/2024/09/20/audio_513944.mp3?filename=miromaxmusic-music-promotion-no-copyright-513944.mp3",
    "https://cdn.pixabay.com/download/audio/2024/05/10/audio_513944.mp3",
    "https://cdn.pixabay.com/download/audio/2024/01/15/audio_513944.mp3",
    "https://cdn.pixabay.com/download/audio/2023/11/20/audio_513944.mp3",
])

success = False
for url in urls_to_try:
    try:
        print("Attempting download from:", url)
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            if len(content) > 1000:
                with open(target_file, "wb") as f:
                    f.write(content)
                with open(bg_file, "wb") as f:
                    f.write(content)
                print("SUCCESS! Saved miromaxmusic-music-promotion-no-copyright-513944.mp3! Size:", len(content))
                success = True
                break
    except Exception as err:
        print("Failed:", err)

if not success:
    print("Could not download directly from Pixabay CDN, attempting alternative mirror...")
