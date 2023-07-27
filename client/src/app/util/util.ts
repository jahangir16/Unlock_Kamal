export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function currencyFormat(amount: number) {
  return 'Rs' + (amount).toFixed(2);
}
// export function currencyFormat(amount: number) {
//   return amount.toFixed(2).toString(); // Format with 2 decimal places and convert to string
// }
