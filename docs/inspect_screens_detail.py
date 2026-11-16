import re

files_to_check = [
    '02_Leads_Pipeline.html',
    '05_Property_Catalog.html',
    '07_Lead_Detail_Priya_Nair.html',
    '08_Smart_Matches.html',
    '09_Site_Visits.html',
    '10_Deals_Commissions.html',
    '11_Team_Reports.html',
    '14_Co_Broking_Network.html',
    '15_Document_Vault.html',
    '16_Loan_EMI_Tools.html'
]

for fname in files_to_check:
    with open('docs/extracted_html/' + fname, 'r', encoding='utf-8') as f:
        html = f.read()
    
    m = re.search(r'<div class="main">(.*?)</div>\s*</div>\s*</x-dc>', html, re.DOTALL)
    print(f"==================== {fname} ====================")
    if m:
        main_content = m.group(1)
        # remove scripts/styles
        main_content = re.sub(r'<script.*?</script>', '', main_content, flags=re.DOTALL)
        # convert tags to readable separators
        text = re.sub(r'<[^>]+>', ' | ', main_content)
        text = ' '.join(text.split())
        print(text[:800])
