  const handleCopyClick = async (text, identifier, setCopiedState) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState((prevState) => ({ ...prevState, [identifier]: true }));
      setTimeout(() => setCopiedState((prevState) => ({ ...prevState, [identifier]: false })), 2000); // Clear the copied state after 2 seconds
    } catch (error) {
      console.error('Unable to copy to clipboard:', error);
    }
  };

  export default handleCopyClick;