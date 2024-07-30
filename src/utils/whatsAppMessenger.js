export default function whatsApp (number,slug) {
  const defaultMessage = encodeURIComponent(`Hello, I would like to get more information on this property you listed on homz.ng https://homz.ng/user_homepage/PreviewProperty/${slug}.`);
    if (number.startsWith("0")) {
      number = number.substring(1);
    }
    window.open(`whatsapp://send?text=${defaultMessage}&phone=${number}`, '_blank');
  };