export function stripHtmlTags(rawHtml) {
    // Step 1: Decode any HTML entities first
    const decodedHtml = rawHtml
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  
    // Step 2: Remove all <p> and </p> tags
    const withoutPTags = decodedHtml
      .replace(/<\/?p>/g, '');
  
    // Step 3: Remove all newlines and trim spaces
    const cleanText = withoutPTags
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')  // replace multiple spaces with single space
      .trim();
  
    return cleanText;
  }
  