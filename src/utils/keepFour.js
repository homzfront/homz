const keepFour = (pathname) => {
    const segments = pathname.split("/").filter(Boolean);
    const firstThreeSegments = segments.slice(0, 4);
    pathname = `/${firstThreeSegments.join("/")}`;
    return pathname;
  };

  export default keepFour;