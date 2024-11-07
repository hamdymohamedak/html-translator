# HTML Translator

This project provides a simple tool for translating the content of an HTML file from English to French using Google Translate and the `cheerio` and `translate-google` libraries.

## Description

The script loads an HTML file, extracts all the text content, translates the text from English to French(any), and then saves the translated content to a new HTML file. During the translation process, it displays a progress bar in the console to show the current status and estimated time remaining for completion.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node package manager): Comes with Node.js

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/hamdymohamedak/html-translator.git
    ```
2.
```bash 
cd html-translator
```
3. 
```bash
npm install
```
4.
```bash
node index.js
```

## you can change the target file from that code
```bash
translateHtmlFile('index.html', 'output_fr.html');
```

