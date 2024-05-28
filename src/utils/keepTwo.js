const keepTwo = (pathname) => {
    const segments = pathname.split("/").filter(Boolean);
    const firstThreeSegments = segments.slice(0, 2);
    pathname = `/${firstThreeSegments.join("/")}`;
    return pathname;
  };

  export default keepTwo;