export function formatDate(timestamp) {
  const date = new Date(timestamp)
  let m = date.getMonth() + 1
  if (m < 10) {
    m = '0' + m
  }
  let d = date.getDate()
  if (d < 10) {
    d = '0' + d
  }

  return `${date.getFullYear()}-${m}-${d}`
}
