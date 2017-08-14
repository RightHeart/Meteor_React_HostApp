// Adaption from https://github.com/stripe/jquery.payment

const defaultFormat = /(\d{1,4})/g;
const __indexOf = [].indexOf || function(item) {
    for (let i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }
    return -1;
  };

PaymentMixin = {

  // Debit cards must come first, since they have more
  // specific patterns than their credit-card equivalents.
  cards: [
    {
      type: 'visaelectron',
      pattern: /^4(026|17500|405|508|844|91[37])/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true,
    },
    {
      type: 'maestro',
      pattern: /^(5(018|0[23]|[68])|6(39|7))/,
      format: defaultFormat,
      length: [12, 13, 14, 15, 16, 17, 18, 19],
      cvcLength: [3],
      luhn: true,
    },
    {
      type: 'forbrugsforeningen',
      pattern: /^600/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true,
    },
    {
      type: 'dankort',
      pattern: /^5019/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true,
    },
    {
      type: 'visa',
      pattern: /^4/,
      format: defaultFormat,
      length: [13, 16],
      cvcLength: [3],
      luhn: true,
    },
    {
      type: 'mastercard',
      pattern: /^(5[1-5]|2[2-7])/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true,
    },
    {
      type: 'amex',
      pattern: /^3[47]/,
      format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
      length: [15],
      cvcLength: [3, 4],
      luhn: true,
    },
    {
      type: 'dinersclub',
      pattern: /^3[0689]/,
      format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
      length: [14],
      cvcLength: [3],
      luhn: true,
    },
    {
      type: 'discover',
      pattern: /^6([045]|22)/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true,
    },
    {
      type: 'unionpay',
      pattern: /^(62|88)/,
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: false,
    },
    {
      type: 'jcb',
      pattern: /^35/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true,
    },
  ],

  cardFromNumber(value) {
    const num = (value + '').replace(/\D/g, '');
    for (let card of this.cards) {
      if (card.pattern.test(num)) {
        return card;
      }
    }
  },

  cardFromType(type) {
    for (let card of this.cards) {
      if (card.type === type) {
        return card;
      }
    }
  },

  luhnCheck(num) {
    let odd = true;
    let sum = 0;
    let digits = (num + '').split('').reverse();
    for (let digit of digits) {
      digit = parseInt(digit, 10);
      odd = !odd;
      if (odd) {
        digit *= 2;
      }
      if (digit > 9) {
        digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  },

  hasTextSelected(target) {
    if ((target.selectionStart !== null) &&
        target.selectionStart !== target.selectionEnd) {
      return true;
    }

    // If some text is selected in IE
    if (typeof document !== 'undefined' && document) {
      let ref = document.selection;
      if (ref && ref.createRange) {
        if (document.selection.createRange().text) {
          return true;
        }
      }
    }
    return false;
  },

  restrictNumeric(e) {
    //  Key event is for a browser shortcut
    if (e.metaKey || e.ctrlKey) return true;
    // If keycode is a space
    if (e.which === 32) return false;
    // If keycode is a special char (WebKit)
    if (e.which === 0)  return true;
    // If char is a special char (Firefox)
    if (e.which < 33) return true;

    // Char is a number or a space
    const input = String.fromCharCode(e.which);
    return !/[\d\s]/.test(input);
  },

  restrictCardNumber(e) {
    const digit = String.fromCharCode(e.which);

    if (!/^\d+$/.test(digit)) return true;
    if (this.hasTextSelected(e.target)) {
      return true;
    }
    // # Restrict number of digits
    const value = (e.target.value + digit).replace(/\D/g, '');
    const card = this.cardFromNumber(value);

    if (card) {
      if (value.length > card.length[card.length.length - 1]) {
        return e.preventDefault();
      }
    } else {
      // # All other cards are 16 digits long
      // if(value.length <= 16)
      if (value.length > 16) {
        return e.preventDefault();
      }
    }

    return true;
  },

  formatCardNumber(e) {
    // Only format if input is a number
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) return true;

    const value = e.target.value;
    const card = this.cardFromNumber(value + digit);
    const length  = (value.replace(/\D/g, '') + digit).length;

    let upperLength = 16;
    if (card) {
      upperLength = card.length[card.length.length - 1];
    }

    if (length >= upperLength) return true;

    // Return if focus isn't at the end of the text
    if (e.target.selectionStart &&
      e.target.selectionStart !== value.length) return true;

    let re;
    if (card && card.type === 'amex') {
      // AMEX cards are formatted differently
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }

    if (re.test(value)) {
      this.setState({ccNumber: value + ' ' + digit});
      return e.preventDefault();
    }
    if (re.test(value + digit)) {
      this.setState({ccNumber: value + digit + ' '});
      return e.preventDefault();
    }
    return false;
  },

  formatBackCardNumber(e) {
    const value = e.target.value;
    if (e.which !== 8) return true;
    // Return if focus isn't at the end of the text
    if (e.target.selectionStart !== null &&
        e.target.selectionStart !== value.length) return true;

    // Remove the digit + trailing space
    if (/\d\s$/.test(value)) {
      const ccNumber = value.replace(/\d\s$/, '');
      this.setState({ccNumber: ccNumber !== '' ? ccNumber : null });
      return e.preventDefault();
    }
    // Remove digit if ends in space + digit
    if (/\s\d?$/.test(value)) {
      const ccNumber = value.replace(/\d$/, '');
      this.setState({ccNumber: ccNumber !== '' ? ccNumber : null });
      return e.preventDefault();
    }
  },

  getCardType(num) {
    const card = this.cardFromNumber(num);

    if (card) return card.type;
    return 'unknown';
  },

  setCardType(e) {
    const value = e.target.value;
    const cardType  = this.getCardType(value);
    this.setState({cardType: cardType});
  },

  getNormalizedCardNumber(value) {
    return value.replace(/\D/g, '');
  },

  getFormattedCardNumber(value) {
    let num = value.replace(/\D/g, '');
    const card = this.cardFromNumber(num);
    if (!card) return num;

    const upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);

    if (card.format.global) {
      const ref = num.match(card.format);
      return ref !== null ? ref.join(' ') : '';
    }

    let groups = card.format.exec(num);
    if (!groups) return '';

    groups.shift();
    groups = groups.filter(function(n) { return n; });
    return groups.join(' ');
  },

  reFormatCardNumber(value) {
    const num = this.getFormattedCardNumber(value);
    this.setState({ccNumber:num !== '' ? num : null});
  },

  getFormattedExpiry(value) {
    const parts = value.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);

    if (!parts) return '';

    let mon = parts[1] || '';
    let sep = parts[2] || '';
    let year = parts[3] || '';

    if (year.length > 0) {
      sep = ' / ';
    } else if (sep === ' /') {
      mon = mon.substring(0, 1);
      sep = '';
    } else if (mon.length === 2 || sep.length > 0) {
      sep = ' / ';
    } else if (mon.length === 1 &&
      (mon !== '0' && mon !== '1')) {
      mon = '0' + mon;
      sep = ' / ';
    }

    return mon + sep + year;
  },

  reFormatExpiry(e) {
    const value = e.target.value;
    const exp = this.getFormattedExpiry(value);
    this.setState({ccExpiry: exp !== '' ? exp : null});
  },

  restrictExpiry(e) {
    const digit = String.fromCharCode(e.which);

    if (!/^\d+$/.test(digit)) return true;
    if (this.hasTextSelected(e.target)) return true;

    let value = e.target.value + digit;
    value = value.replace(/\D/g, '');

    if (value.length > 6) {
      return e.preventDefault();
    }

    return true;
  },

  formatExpiry(e) {
    // Only format if input is a number
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) return true;

    const value = e.target.value + digit;

    if (/^\d$/.test(value) &&
      (value !== '0' && value !== '1')) {
      this.setState({ccExpiry: '0' + value + ' / '});
      return e.preventDefault();
    }

    if (/^\d\d$/.test(value)) {
      this.setState({ccExpiry: value + ' / '});
      return e.preventDefault();
    }
    return true;
  },

  formatForwardSlashAndSpace(e) {
    const digit = String.fromCharCode(e.which);
    if (digit !== '/' && digit !== ' ') return true;

    const value = e.target.value;

    if (/^\d$/.test(value) && value !== '0') {
      this.setState({ccExpiry: '0' + value + ' / '});
    }
  },

  formatForwardExpiry(e) {
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) return true;

    const value = e.target.value;

    if (/^\d\d$/.test(value)) {
      this.setState({ccExpiry: value + ' / '});
    }
  },

  formatBackExpiry(e) {
    const value = e.target.value;

    // Return unless backspacing
    if (e.which !== 8) return true;
    // Return if focus isn't at the end of the text
    if (e.target.selectionStart !== null &&
        e.target.selectionStart !== value.length) return true;

    // Remove the trailing space + last digit
    if (/\d\s\/\s$/.test(value)) {
      this.setState({ccExpiry: value.replace(/\d\s\/\s$/, '') });
      return e.preventDefault();
    }
    return true;
  },

  reFormatCVC(e) {
    const value = e.target.value;

    const num = value.replace(/\D/g, '').slice(0, 4);
    this.setState({ccCVC: num !== '' ? num : null});
  },

  restrictCVC(e) {
    const digit = String.fromCharCode(e.which);

    if (!/^\d+$/.test(digit)) return true;
    if (this.hasTextSelected(e.target)) return true;

    const value = e.target.value + digit;
    if (value.length > 4) {
      return e.preventDefault();
    }
    return true;
  },

  handleCardNumberKeyPress(e) {
    if (this.restrictNumeric(e)) return e.preventDefault();

    this.restrictCardNumber(e);
    this.formatCardNumber(e);
  },

  handleCardNumberKeyDown(e) {
    this.formatBackCardNumber(e);
  },

  handleCardNumberKeyUp(e) {
    this.setCardType(e);
  },

  handleCardNumberPaste(e) {
    if (e.clipboardData && e.clipboardData.items[0]) {
      e.clipboardData.items[0].getAsString((s) => {
        this.reFormatCardNumber(s);
      });
    }
    return e.preventDefault();
  },

  handleCardNumberInput(e) {
    this.reFormatCardNumber(e.target.value);
    this.setCardType(e);
  },

  handleExpiryKeyPress(e) {
    if (this.restrictNumeric(e)) return e.preventDefault();

    this.restrictExpiry(e);
    this.formatExpiry(e);
    this.formatForwardSlashAndSpace(e);
    this.formatForwardExpiry(e);
  },

  handleExpiryKeyDown(e) {
    this.formatBackExpiry(e);
  },

  handleExpiryInput(e) {
    this.reFormatExpiry(e);
  },

  handleCVCKeyPress(e) {
    if (this.restrictNumeric(e)) return e.preventDefault();

    this.restrictCVC(e);
  },

  handleCVCPaste(e) {
    this.reFormatCVC(e);
  },

  handleCVCInput(e) {
    this.reFormatCVC(e);
  },

  validateCardNumber(value) {
    const num = (value + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(num)) return false;

    const card = this.cardFromNumber(num);
    if (!card) return false;
    const l = num.length;
    return __indexOf.call(card.length, l) >= 0 &&
      (card.luhn === false || this.luhnCheck(num));
  },

  getExpiryVals(value) {
    const ref = value.split(/[\s\/]+/, 2);
    let month = ref[0];
    let year = ref[1];

    let prefix;
    if ((year !== null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    return {
      month: month,
      year: year,
    };
  },

  validateExpiry(value) {
    let {month, year} = this.getExpiryVals(value);

    if (!(month && year)) return false;

    month = $.trim(month);
    year = $.trim(year);

    if (!/^\d+$/.test(month)) return false;
    if (!/^\d+$/.test(year)) return false;
    if (!((month >= 1 && month <= 12))) return false;
    if (year.length === 2) {
      if (year < 70) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
    }
    if (year.length !== 4) return false;
    const expiry = new Date(year, month);
    const currentTime = new Date;
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expiry.getMonth() + 1, 1);
    return expiry > currentTime;
  },

  validateCVC(value, num) {
    const cvc = $.trim(value);
    if (!/^\d+$/.test(value)) return false;

    const card = this.cardFromNumber(num);
    if (card) {
      const ref = cvc.length;
      return __indexOf.call(card.cvcLength, ref) >= 0;
    }

    return cvc.length >= 3 && cvc.length <= 4;
  },

};
