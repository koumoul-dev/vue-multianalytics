import { MODULE_MATOMO } from '../analyticsTypes'
import BasicModule from './BasicModule'
import { logDebug } from '../utils'

export default class MatomoModule extends BasicModule {

  constructor () {
    super(MODULE_MATOMO)
  }

  init (initConf = {}) {
    if (!initConf.siteId) throw new Error('VueMultianalytics : Please provide siteId option to Matomo module')
    if (!initConf.trackerBase) throw new Error('VueMultianalytics : Please provide trackerBase option to Matomo module')

    // The matomo configuration array, cf https://developer.matomo.org/guides/tracking-javascript-guide
    // items are of the form ['API_method_name', parameters...]
    this.paq = window._paq = window._paq || initConf.paq || []
    this.paq.push(['setTrackerUrl', initConf.trackerBase + 'piwik.php'])
    this.paq.push(['setSiteId', initConf.siteId])
    var d = document
    var g = d.createElement('script')
    var s = d.getElementsByTagName('script')[0]
    g.type = 'text/javascript'; g.async = true; g.defer = true; g.src = initConf.trackerBase + 'piwik.js'; s.parentNode.insertBefore(g, s)
  }

  trackView ({viewName}) {
    if (this.config.debug) logDebug(viewName)
    this.paq.push(['setDocumentTitle', viewName]);
    this.paq.push(['trackPageView']);
  }

  trackEvent ({category = "Event", action, label = null, value = null, callback = null }) {
    if (this.config.debug) logDebug(...arguments)
    this.paq.push(['trackEvent', category, action, label, value]);
  }

  setUsername (userId) {
    this.paq.push(['setUserId', userId]);
  }

  // Same as setUsername
  identify ({userId}) {
    this.paq.push(['setUserId', userId]);
  }
}
