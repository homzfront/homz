const React = require('react');

function MarginWidthWrapper({ children }) {
  return (
    React.createElement("div", { className: "flex flex-col md:ml-60 marginWrap sm:border-r sm:border-zinc-700 min-h-screen" },
      children
    )
  );
}

module.exports = MarginWidthWrapper;
