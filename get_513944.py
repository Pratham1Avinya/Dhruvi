import urllib.request
import re
import os

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
}

target_file = r"c:\Users\PRATHAM ANTALA\.gemini\antigravity-ide\scratch\dhruvi-invite\public\miromaxmusic-music-promotion-no-copyright-513944.mp3"
bg_file = r"c:\Users\PRATHAM ANTALA\.gemini\antigravity-ide\scratch\dhruvi-invite\public\bg_music.mp3"

url = "https://pixabay.com/music/search/513944/"
try:
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req).read().decode("utf-8")
    matches = re.findall(r'https://cdn\.pixabay\.com/audio/[^"]+\.mp3[^"]*', html)
    print("Found mp3 URLs:", matches)

    if matches:
        mp3_url = matches[0]
        print("Downloading from:", mp3_url)
        audio_req = urllib.request.Request(mp3_url, headers=headers)
        with urllib.request.urlopen(audio_req) as resp:
            data = resp.read()
            with open(target_file, "wb") as f:
                f.write(data)
            with open(bg_file, "wb") as f:
                f.write(data)
            print("Successfully saved miromaxmusic-music-promotion-no-copyright-513944.mp3! Size:", len(data))
    else:
        print("No direct mp3 match found on Pixabay search page.")
except Exception as err:
    print("Error:", err)
