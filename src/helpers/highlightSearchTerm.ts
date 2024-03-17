export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  const lowerCaseText = text.toLowerCase().trim()
  const lowerCaseSearchTerm = searchTerm?.toLowerCase().trim()
  const startIndex = lowerCaseText.indexOf(lowerCaseSearchTerm)
  const endIndex = startIndex + lowerCaseSearchTerm?.length
  if (startIndex === -1 || searchTerm === '') return text
  return `${text.slice(0, startIndex)}<span style="font-weight: bold;">${text.slice(startIndex, endIndex)}</span>${text.slice(endIndex)}`
}
