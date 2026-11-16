import os, glob, re, json

os.makedirs('docs/extracted_html', exist_ok=True)

files = sorted(glob.glob('docs/screens/*.html'))
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        text = fp.read()
    
    m = re.search(r'<script type=["\']__bundler/template["\']>(.*?)</script>', text, re.DOTALL)
    if m:
        tpl = json.loads(m.group(1).strip())
        basename = os.path.basename(f)
        out_name = os.path.join('docs/extracted_html', basename)
        with open(out_name, 'w', encoding='utf-8') as out_fp:
            out_fp.write(tpl)
        print(f"Extracted {basename} ({len(tpl)} chars)")
    else:
        print(f"No template in {f}")
