class Currency {
  constructor () {
    /**
     *
     * @type {null || String}
     */
    this.code = 'EUR'
  
    /**
     *
     * @type {null || String}
     */
    this.symbol = '€'
    
    /**
     *
     * @type {null || String}
     */
    this.locale = 'de-DE'
  
    /**
     *
     * @type {null || Number}
     */
    this.digits = 4
  
    /**
     *
     * @type {null || Intl.NumberFormat}
     */
    this.numberFormat = null
  }
  
  /**
   *
   * @param {String} code
   * @param {String} locale
   * @param {String} symbol
   * @param {Number} digits
   */
  setCurrency({code, locale, symbol, digits}) {
    if (this._isValid(code)) this.code = code
    if (this._isValid(locale)) this.locale = locale
    if (this._isValid(symbol)) this.symbol = symbol
    if (this._isValid(digits)) this.digits = digits
    
    this._createNumberFormat()
  }
  
  /**
   *
   * @param {Number || String} number
   * @returns {string}
   */
  formatCurrency(number) {
    return this.numberFormat.format(number)
  }
  
  /**
   *
   * @private
   */
  _createNumberFormat() {
    this.numberFormat = new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.code,
    })
  }
  
  _isValid(value) {
    return (value !== null) && (value !== undefined)
  }
}

export default new Currency()