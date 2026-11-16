import glob, os, re

files = sorted(glob.glob('docs/extracted_html/*.html'))
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        html = fp.read()
    
    title_m = re.search(r'<title>(.*?)</title>', html, re.I)
    title = title_m.group(1) if title_m else os.path.basename(f)
    
    h1 = re.findall(r'<h1>(.*?)</h1>', html)
    h3 = re.findall(r'<h3>(.*?)</h3>', html)
    
    buttons = re.findall(r'<button[^>]*>(.*?)</button>', html)
    buttons = [re.sub(r'<[^>]+>', '', b).strip() for b in buttons if b.strip()]
    
    inputs = re.findall(r'placeholder=[\"\'](.*?)[\"\']', html)
    tags = re.findall(r'<span class=[\"\']tag[^\"\']*[\"\']>(.*?)</span>', html)
    tags = [re.sub(r'<[^>]+>', '', t).strip() for t in tags if t.strip()]
    
    kpis = re.findall(r'<div class=[\"\']kpi[\"\']>(.*?)</div>', html)
    muts = re.findall(r'<div class=[\"\']mut[\"\']>(.*?)</div>', html)
    
    # Tables / rows
    tds = re.findall(r'<td>(.*?)</td>', html)
    tds = [re.sub(r'<[^>]+>', '', t).strip() for t in tds if t.strip()]
    
    print(f"*** SCREEN: {title} ({os.path.basename(f)}) ***")
    print(f"  H1: {h1}")
    print(f"  H3/Sections: {h3}")
    print(f"  KPIs: {list(zip(muts[:len(kpis)], kpis))}")
    print(f"  Buttons/Actions: {buttons}")
    print(f"  Inputs: {inputs}")
    print(f"  Sample Tags: {tags[:6]}")
    if tds:
        print(f"  Sample Table Content (first 10): {tds[:10]}")
    print("="*60)
