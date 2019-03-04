import json

data = {}

lines = open('src/data.json').read().split('\n')
for line in lines:
    parts = line.split('=')
    if len(parts) < 2:
        continue
    data[parts[0].split(':')[1]] = {
        "string": parts[0],
        "desc": parts[1]
    }

open('src/data.json', 'w').write(json.dumps(data))