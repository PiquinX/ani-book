// export async function isValidImageUrl (url: string): Promise<boolean> {
//   return true
//   // try {
//   //   const response = await fetch(url)
//   //   console.log(response)
//   //   return response.ok
//   // } catch (err) {
//   //   console.log(err)
//   //   return false
//   // }
// }

export const rateColor = (rate: number): string => {
  if (rate === 100) return 'green-100 text-[#40ff00]'
  if (rate >= 95) return 'green-95 text-[#40ff00]'
  if (rate >= 90) return 'text-[#40ff00]'
  if (rate >= 85) return 'text-[#7fed09]'
  if (rate >= 80) return 'text-[#9dde10]'
  if (rate >= 75) return 'text-[#cdde10]'
  if (rate >= 65) return 'text-[#e0b909]'
  if (rate >= 55) return 'text-[#e09109]'
  if (rate >= 45) return 'text-[#e05809]'
  if (rate < 45) return 'text-[#e01e09]'
  return ''
}
