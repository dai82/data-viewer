export default {
    /**
     * 特定の文字列よりも長いものを「...」として切り出します。
     * TODO: マルチバイトもシングルバイトも１文字として扱っているが、シングルバイトは0.5文字として扱いたい
     * @param str 切り出し対象となる文字列
     * @param count count文字数以降を「...」として切り出し
     */
    omitString(str: string, count: number): string {
        if (!str) return ''
        if (this.calcStrWideLength(str) <= count) return str
        return this.subStrByWideLength(str, count) + '...'
    },
    /**
     * 文字列を切り取る
     * @param str 対象となる文字列
     * @param num 切り取り文字列の長さ（半角は0.5(0.5は切り上げ)、全角は1）
     */
    subStrByWideLength(strSrc: string, num: number): string {
        if (!strSrc) {
            return ''
        }
        const limit = 2 * num
        let subLen = 0
        let len = 0
        const str = escape(strSrc)
        const slength = str.length
        const ua = window.navigator.userAgent.toLowerCase()
        const isIE = (ua.includes('msie') || ua.includes('trident'))
        for (let i = 0; i < slength; i++) {
            if (str.charAt(i) === '%') {
                if (str.charAt(++i) === 'u') {
                    i += 3
                    len++
                } else if (!isIE) {
                    if (str.charAt(i) === '0' && str.charAt(i + 1) === 'A') {
                        len++
                    }
                }
                i++
            }
            len++
            if (len > limit) {
                break
            } else if (len === limit) {
                subLen++
                break
            } else {
                subLen++
            }
        }

        return strSrc.slice(0, subLen)
    },
    /**
     * 文字列の長さを計算する（BYTE単位）
     *   半角は１、全角は２
     * @param str 対象となる文字列
     */
    calcStrByteLength(strSrc: string): number {
        if (!strSrc) {
            return 0
        }
        let len = 0
        strSrc = escape(strSrc)
        const slength = strSrc.length
        const ua = window.navigator.userAgent.toLowerCase()
        const isIE = (ua.includes('msie') || ua.includes('trident'))
        for (let i = 0; i < slength; i++, len++) {
            if (strSrc.charAt(i) === '%') {
                if (strSrc.charAt(++i) === 'u') {
                    i += 3
                    len++
                } else if (!isIE) {
                    if (strSrc.charAt(i) === '0' && strSrc.charAt(i + 1) === 'A') {
                        len++
                    }
                }
                i++
            }
        }
        return len
    },
    /**
     * 文字列の長さを計算する
     *   半角は0.5(0.5は切り上げ)、全角は1
     * @param str 対象となる文字列
     */
    calcStrWideLength(strSrc: string): number {
        return Math.ceil(this.calcStrByteLength(strSrc) / 2)
    },
    // clipStrをクリップボードにコピーします。
    onClickCopyStr(clipStr: string): void {
        const textarea = document.createElement('textarea')
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        textarea.value = clipStr
        document.body.appendChild(textarea)
        textarea.select()
        if (document.execCommand('copy')) {
            document.execCommand('copy')
        }
        document.body.removeChild(textarea)
    },
    // HTMLで<a>タグをつけた文字列をコピーします。リンク付き文字列をクリップボードにコピーするのに利用します。
    onClickCopyStrWithLink(link: string, clipStr: string): void {
        const result = '<a href="' + link + '">' + clipStr + '</a>'
        const span = document.createElement('span')
        span.style.position = 'fixed'
        span.style.opacity = '0'
        span.innerHTML = result
        document.body.appendChild(span)
        const range = document.createRange()
        const selection = document.getSelection()
        range.selectNodeContents(span)
        if (selection) {
            selection.removeAllRanges()
            selection.addRange(range)
        }
        document.addEventListener('copy', function listener(event): void {
            if (event) {
                event.preventDefault()
                if (event.clipboardData) {
                    event.clipboardData.setData('text/html', result)
                    event.clipboardData.setData('text/plain', result)
                }
            }
            document.removeEventListener('copy', listener)
        })
        if (document.execCommand('copy')) {
            document.execCommand('copy')
        }
        if (selection) {
            selection.removeAllRanges()
        }
        document.body.removeChild(span)
    }
}
