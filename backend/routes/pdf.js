const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

router.post("/generate", async (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).json({ error: "HTML content required" });

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();

    // Set viewport to A4 size
    await page.setViewport({ width: 794, height: 1123 });

    await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

    // Extra wait for Tailwind CDN to apply styles
    await new Promise(resolve => setTimeout(resolve, 2000));

    const pdf = await page.pdf({
      format: "A4",
      margin: { top: "12mm", bottom: "12mm", left: "12mm", right: "12mm" },
      printBackground: true,
      preferCSSPageSize: true
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf"
    });
    res.send(pdf);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ error: "PDF generation failed" });
  }
});

module.exports = router;