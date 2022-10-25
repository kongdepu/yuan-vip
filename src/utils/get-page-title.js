import defaultSettings from '@/settings'

const title = defaultSettings.title || '向温柔投降'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
