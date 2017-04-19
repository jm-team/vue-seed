// 公共filters

import Vue from 'vue'
import address from '../../config/address.config'

// 过滤器数组
var filters=[
    // 日期转换成 xxxx年xx月xx日 12:12 格式
    {
        name:'dateTransform'
        ,fn:function(val){
                var _date=new Date(val)
                var _year=_date.getFullYear(),
                _month=_date.getMonth()+1,
                _day=_date.getDate(),
                _hour=_date.getHours(),
                _minute=_date.getMinutes()
                function addZero(target){
                    if (target<10){
                        target='0'+target
                    }
                    return target
                }
                return _year+'年'+addZero(_month)+'月'+addZero(_day)+'日  '+addZero(_hour)+':'+addZero(_minute)
            }
    }

    // 获取所在地区时间
    ,{
        name:'localeDate'
        // type为获取类型:date/time，spe为分隔符
        ,fn:function(val,type,spe){
            var _date=new Date(val)
            if (type=='date'){
                return _date.toLocaleDateString()
            }else{
                return _date.toLocaleTimeString()
            }
        }
    }

    // 截取字符串
    ,{
        name:'subStr'
        ,fn:function(val,length,addEllipsis){
            var endStr,
                addEllipsis = addEllipsis || true,
                strLength,
                notChineseStrLength,
                excludeStrLength
            if (val){
                // 计算非中文字符长度
                notChineseStrLength=val.split(/[\x00-\xff]/).length-1
                // 排除@%<>等显示宽度和中文差不多的字符
                excludeStrLength=val.split(/[@%<>]/).length-1
                strLength=val.length-notChineseStrLength+Math.round((notChineseStrLength-excludeStrLength)/2);

                addEllipsis && strLength>length ? endStr='...' : endStr=''                
                return val.substr(0,length)+endStr
            }else{
                return ''
            }
        }
    }

    // 图片cdn
    ,{
        name:'imgCdn'
        ,fn:function(val){
            return address.IMG_ADDRESS+val
        }
    }
]

// 注册filters到Vue
for (var i=0; i<filters.length; i++){
    Vue.filter(filters[i].name,filters[i].fn)
}