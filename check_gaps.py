import json
import re

out = set()
with open("/Users/madhava/.gemini/antigravity-ide/brain/a49ae4a3-51b0-4195-a015-2969c4dcacbc/.system_generated/logs/transcript.jsonl", "r") as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") in ["VIEW_FILE", "CODE_ACTION", "RUN_COMMAND"]:
                content = data.get("content", "")
                if "page.tsx" in content:
                    lines = content.split("\n")
                    for l in lines:
                        m = re.match(r"^(\d+):\s(.*)", l)
                        if m:
                            line_num = int(m.group(1))
                            out.add(line_num)
        except:
            pass

lines = sorted(list(out))
last = 0
for l in lines:
    if l != last + 1:
        if last != 0:
            print(f"Gap: {last+1} to {l-1}")
    last = l
print(f"Max line: {last}")
