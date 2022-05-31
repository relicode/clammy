import NodeClam, { Options } from 'clamscan'
import merge from 'ts-deepmerge'

export const builtInDefaults: Readonly<Options> = {
  removeInfected: false, // If true, removes infected files
  quarantineInfected: false, // False: Don't quarantine, Path: Moves files to this place.
  scanLog: undefined, // Path to a writeable log file to write scan results into
  debugMode: false, // Whether or not to log info/debug/error msgs to the console
  fileList: undefined, // path to file containing list of files to scan (for scanFiles method)
  scanRecursively: true, // If true, deep scan folders recursively
  clamscan: {
    path: '/usr/bin/clamscan', // Path to clamscan binary on your server
    db: undefined, // Path to a custom virus definition database
    scanArchives: true, // If true, scan archives (ex. zip, rar, tar, dmg, iso, etc...)
    active: true // If true, this module will consider using the clamscan binary
  },
  clamdscan: {
    socket: false, // Socket file for connecting via TCP
    host: false, // IP of host to connect to TCP interface
    port: false, // Port of host to use when connecting via TCP interface
    timeout: 60000, // Timeout for scanning files
    localFallback: true, // Use local preferred binary to scan if socket/tcp fails
    path: '/usr/bin/clamdscan', // Path to the clamdscan binary on your server
    configFile: undefined, // Specify config file if it's in an unusual place
    multiscan: true, // Scan using all available cores! Yay!
    reloadDb: false, // If true, will re-load the DB on every call (slow)
    active: true, // If true, this module will consider using the clamdscan binary
    bypassTest: false, // Check to see if socket is available when applicable
  },
  preference: 'clamdscan', // If clamdscan is found and active, it will be used by default
}

const defaultOptions: Readonly<Options> = {
  debugMode: process.env.NODE_ENV !== 'production',
  scanRecursively: true,
  clamscan: {
    scanArchives: true,
    db: '/var/lib/clamav',
  },
  preference: 'clamscan',
}

export const scanFile = (scanner: NodeClam, path: string) => scanner.isInfected(path)
export const scanDir = (scanner: NodeClam, path: string) => scanner.scanDir(path)

export default async function initScanner (options: Options = {}) {
  const scanner = await new NodeClam().init(merge(defaultOptions, options))
  return {
    scanner,
    scanFile: (path: Parameters<typeof scanFile>[1]) => scanFile(scanner, path),
    scanDir: (path: Parameters<typeof scanDir>[1]) => scanDir(scanner, path),
  }
}
