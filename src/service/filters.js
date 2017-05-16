// 公共filters
import siteConfig from '../../config/site.config'

// 日期转换成 xxxx年xx月xx日 12:12 格式
export function dateTransform (val) {
  var _date = new Date(val)
  var _year = _date.getFullYear(),
    _month = _date.getMonth() + 1,
    _day = _date.getDate(),
    _hour = _date.getHours(),
    _minute = _date.getMinutes()
  return _year + '年' + addZero(_month) + '月' + addZero(_day) + '日  ' + addZero(_hour) + ':' + addZero(_minute)
}

function addZero (target) {
  if (target < 10) {
    target = '0' + target
  }
  return target
}

// 获取所在地区时间
export function localeDate (val, type, spe) {
  var _date = new Date(val)
  if (type === 'date') {
    return _date.toLocaleDateString()
  } else {
    return _date.toLocaleTimeString()
  }
}

// 截取字符串
export function subStr (val, length, addEllipsis = true) {
  var endStr,
    strLength,
    notChineseStrLength,
    excludeStrLength
  if (val) {
                // 计算非中文字符长度
    notChineseStrLength = val.split(/[\x00-\xff]/).length - 1
                // 排除@%<>等显示宽度和中文差不多的字符
    excludeStrLength = val.split(/[@%<>]/).length - 1
    strLength = val.length - notChineseStrLength + Math.round((notChineseStrLength - excludeStrLength) / 2)

    addEllipsis && strLength > length ? endStr = '...' : endStr = ''
    return val.substr(0, length) + endStr
  } else {
    return ''
  }
}

// 图片cdn
export function imgCdn (val) {
  return siteConfig.address.IMG_ADDRESS + val
}
