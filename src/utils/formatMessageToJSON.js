export function formatMessageToJSON(rawHtml) {
    // Step 1: Decode HTML entities
    const decodedHtml = rawHtml
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  
    // Step 2: Clean up extra spaces around <p> and </p>
    const cleanedHtml = decodedHtml
      .replace(/<p>\s*/g, '<p>\n      ')  // after <p>, add a newline and indent
      .replace(/\s*<\/p>/g, '\n  </p>\n'); // before </p>, add a newline and indent
  
    // Step 3: Trim outer whitespace
    const formattedContent = `\n  ${cleanedHtml.trim()}`;
  
    return formattedContent;
  }
  