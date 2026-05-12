export const copyToClipboard = (text: string): void => {
  try {
    navigator.clipboard.writeText(text)
  }
  catch (e) {
    alert(e)
  }
}
