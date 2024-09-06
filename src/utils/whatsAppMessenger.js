export default function whatsApp(number, slug) {
  // console.log(number);
  const defaultMessage = encodeURIComponent(
    `Hello, I would like to get more information on this property you
     listed on homz.ng https://homz.ng/user_homepage/PreviewProperty/${slug}.`
  );
  if (number.startsWith("0")) {
    number = number.substring(1);
  }
  if (number.startsWith("https://wa.me/")) {
    number = number.substring(7);
  }
  let urlApi = `whatsapp://send?text=${defaultMessage}&phone=${
    "+234" + number
  }`;
  window.open(urlApi, "_blank", "noopener,noreferrer");
}
