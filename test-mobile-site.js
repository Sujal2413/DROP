const puppeteer = require('puppeteer-core');

(async () => {
  let browser;
  try {
    const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    browser = await puppeteer.launch({ executablePath, headless: "new" });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1');

    await page.goto('https://www.dropwater.in', { waitUntil: 'networkidle0' });
    
    const checkClickable = await page.evaluate(() => {
        const btn = document.querySelector('button');
        if (!btn) return 'No button';
        const rect = btn.getBoundingClientRect();
        const el = document.elementFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
        
        let parent = el;
        let idPath = [];
        while(parent) {
            idPath.push(parent.tagName + (parent.id ? '#' + parent.id : '') + (parent.className ? '.' + parent.className : ''));
            parent = parent.parentElement;
        }

        return {
            elementOnTop: el ? el.outerHTML.substring(0, 200) : 'null',
            path: idPath.join(' -> ')
        };
    });
    console.log('Check clickable:', checkClickable);

    await browser.close();
  } catch (err) {
    console.error(err);
    if (browser) await browser.close();
  }
})();
