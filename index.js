const fs = require('fs');
const cheerio = require('cheerio');
const translate = require('translate-google');

// Load the HTML file
const translateHtmlFile = async (inputPath, outputPath) => {
  try {
    const htmlContent = fs.readFileSync(inputPath, 'utf-8');
    const $ = cheerio.load(htmlContent);

    // Function to translate text nodes
    const translateText = async (text) => {
      if (!text.trim()) return text; // Skip empty strings
      const translatedText = await translate(text, { from: 'en', to: 'fr' });
      return translatedText;
    };

    // Get all the text nodes in the HTML content
    const nodes = $('body').find('*').contents().filter((_, el) => el.nodeType === 3);
    const totalNodes = nodes.length;

    // Translate text nodes and show loading progress
    const translateHtml = async () => {
      let processedNodes = 0;
      const startTime = Date.now(); // To calculate the elapsed time

      for (const node of nodes) {
        const originalText = node.nodeValue;
        const translatedText = await translateText(originalText);
        node.nodeValue = translatedText;

        processedNodes++;

        // Calculate the time elapsed and estimate the time left
        const elapsedTime = Date.now() - startTime;
        const estimatedTime = (elapsedTime / processedNodes) * (totalNodes - processedNodes);
        const secondsLeft = Math.round(estimatedTime / 1000);

        // Clear the console and show the progress
        console.clear();
        console.log(`Processing... ${processedNodes}/${totalNodes} nodes translated`);
        console.log(`Estimated time left: ${secondsLeft} seconds`);

        // Optional: Display a progress bar in the console
        const progress = Math.round((processedNodes / totalNodes) * 100);
        console.log(`[${'='.repeat(progress / 5)}${' '.repeat(20 - progress / 5)}] ${progress}%`);
      }
    };

    await translateHtml();

    // Save the translated HTML
    fs.writeFileSync(outputPath, $.html());
    console.log(`Translation complete! Translated file saved at ${outputPath}`);
  } catch (error) {
    console.error('Error during translation:', error);
  }
};

// Use the function
translateHtmlFile('index.html', 'output_fr.html');
