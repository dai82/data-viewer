
import Bowser from 'bowser'

export interface Browser {
    ie10: boolean;
    ie: boolean;
    edge: boolean;
    chrome: boolean;
    firefox: boolean;
}

export const browser: Browser = {
    ie10: Bowser.getParser(window.navigator.userAgent).getBrowserVersion() === '10.0',
    ie: Bowser.getParser(window.navigator.userAgent).getBrowserName() === 'Internet Explorer',
    edge: Bowser.getParser(window.navigator.userAgent).getBrowserName() === 'Microsoft Edge',
    chrome: Bowser.getParser(window.navigator.userAgent).getBrowserName() === 'Chrome',
    firefox: Bowser.getParser(window.navigator.userAgent).getBrowserName() === 'Firefox',
}