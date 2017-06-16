/* eslint-disable */

import siteConfig from '../../config/address.config'; // 公共filters

function addZero(target) {
  if (target < 10) {
    target = `0${target}`;
  }
  return target;
}

// 获取非中文字符长度
function notZhStringLength(val) {
  return val.split(/[\x00-\xff]/).length - 1;
}

// 获取非中文字符长度
function excludeStringLength(val) {
  return val.split(/[@&#~%<>W]/).length - 1;
}

// 日期转换成 xxxx年xx月xx日 12:12 格式
export function dateTransform(val) {
  const _date = new Date(val);
  let _year = _date.getFullYear(),
    _month = _date.getMonth() + 1,
    _day = _date.getDate(),
    _hour = _date.getHours(),
    _minute = _date.getMinutes();
  return `${_year}年${addZero(_month)}月${addZero(_day)}日  ${addZero(_hour)}:${addZero(_minute)}`;
}


// 获取所在地区时间
export function localeDate(val, type, spe) {
  const _date = new Date(val);
  if (type === 'date') {
    return _date.toLocaleDateString();
  }
  return _date.toLocaleTimeString();
}

// 截取字符串
export function subStr(val, length, addEllipsis = true) {
  let endStr,
    strLength,
    notChineseStrLength,
    excludeStrLength,
    newStr = '';

  if (val) {
    sliceStr(val, length);
    strLength = val.length - notZhStringLength(val) + Math.round((notZhStringLength(val) - excludeStringLength(val)) / 2);
    addEllipsis && strLength > length ? endStr = '...' : endStr = '';
    return newStr + endStr;
  }
  return '';

  // 截取函数
  function sliceStr(val, length) {
    let addStr;
    addStr = val.substr(0, length);
    newStr += addStr;
    // 计算非中文字符长度
    notChineseStrLength = notZhStringLength(addStr);
    let newLength = addStr.length - notChineseStrLength;
    if (notChineseStrLength > 0) {
      // 排除@%<>等显示宽度和中文差不多的字符
      excludeStrLength = excludeStringLength(addStr);
      // 非中文字符2个算一个长度
      const notChineseLength = parseInt((notChineseStrLength - excludeStrLength) / 2);
      // 重新计算后得出截取的字符串的长度
      newLength = newLength + notChineseLength + excludeStrLength;
      // 递归调用，再去截取更多字符来补充字符串长度
      sliceStr(val.substr(length), length - newLength);
    }
  }
}

// 图片cdn
export function imgCdn(val) {
  return siteConfig.address.IMG_ADDRESS + val;
}
