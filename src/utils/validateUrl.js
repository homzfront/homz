export const validateUrl = (e, setError) => {
  const url = e.target.value;
  // console.log(url);
  const regex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
  if (url === "") setError("");
  else if (!regex.test(url)) {
    setError(
      "Invalid URL, Please provide a valid URL. E.g: https://www.example.com"
    );
  } else setError("");
};
