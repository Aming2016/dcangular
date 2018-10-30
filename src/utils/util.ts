import {Observable} from "rxjs/Observable";
import {CaughtError} from "../app/models/error/caugth-error";
import {BusinessError} from "../app/models/error/business-error";
import {wechatConfig} from "../environments/environment";


/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */

// ---------- Redux --------------------
let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unqiue"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

// ---------- common util --------------

export function toPathArray(keyPath : string) : Array<string|number>{
  if(keyPath.indexOf(".") < 0){
    return [keyPath]
  } else {
    let result = []
    let sp = keyPath.split(".")
    for(let cur of sp){
      if(isNaN(+cur)){
        result.push(cur)
      } else {
        result.push(+cur)
      }
    }
  return result
  }
}

// ---------- We Chat util --------------
export function isWeChat(){
  let ua = window.navigator.userAgent;
  return ua.match(/MicroMessenger/i) != null
}

export enum Scope {"snsapi_base","snsapi_userinfo"}

export class WeChatUtil{
  static oauthUrl(path?: string, scope : Scope = Scope.snsapi_base){
    let scopeStr : string = Scope[scope];
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatConfig.appid}&redirect_uri=${encodeURIComponent(wechatConfig.oauthCallbackUri + (path? ("?fromPath=" + path) : ""))}&response_type=code&scope=${scopeStr}&state=0#wechat_redirect`
  }

}




// ---------- Rxjs util --------------

// ---------- http util --------------

export function handleHttpError<T>(url?: string, silent:boolean = false) {
  return (source: Observable<T>) => {
    return source.catch(error => {

      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message

      if (error instanceof CaughtError) {
        // error already handled once time, skip the 2nd time.
        return Observable.throw(error)
      }

      if (error instanceof BusinessError) {
        // front end should handle business error and show error message
        // skip here
        return Observable.throw(error)
      }


      if (url) {
        console.error(`error raised when access [${url}]`)
      }

      console.error(error)

      let errMsg = ""
      if (error instanceof Error) {
        switch (error.message) {
          case "No JWT present or has expired":
            errMsg = "用户未登录或登录凭证已过期，请重新登录"
            if (!silent) alert(errMsg)
            break
        }
        return Observable.throw(new CaughtError(errMsg, error, 0))
      }

      if (error.status) {
        if (typeof error.json === "function") {
          let errJson = error.json();

          errMsg = errJson.error_description
          if(errMsg != null){
            return Observable.throw(new CaughtError(errMsg, error, error.status, errJson.error))
          }
        }

        switch (error.status) {
          case 0: // unknown status, it may be
            errMsg = "服务器不可用"
            alert(errMsg)
            return Observable.throw(new CaughtError(errMsg, error, error.status))
          case 404:
            errMsg = "资源不存在"
            if (!silent) alert(errMsg)
            return Observable.throw(new CaughtError(errMsg, error, error.status))
          case 403:
            errMsg = "当前用户权限不足，无权限访问该资源"
            if (!silent) alert(errMsg)
            return Observable.throw(new CaughtError(errMsg, error, error.status))
          case 401:
            errMsg = "未授权访问资源，请先登录"
            if (!silent) alert(errMsg)
            return Observable.throw(new CaughtError(errMsg, error, error.status))
        }
      }

      let errorBody;
      if (typeof error.json == "function") {
        errorBody = error.json();
      } else {
        errorBody = error;
      }

      errMsg = (errorBody.message) ? errorBody.message :
        errorBody.status ? `${errorBody.status} - ${errorBody.statusText}` : 'Server error'
      if (!errorBody.message && !errorBody.status) {
        console.error("unknown error, may be server is down")
        alert("服务不可用")
      } else {
        if (!silent) alert(errMsg)
      }
      return Observable.throw(new CaughtError(errMsg, error, 0))
    })
  }
}


/**
 * @param {number} range
 * @param {string} [type]
 * @memberOf VehicleOverviewComponent
 * @description 获取今天及前后天
 */
export function getRangeDate( range?: number ) :string{
  const formatDate = ( time: any ) => {
    // 格式化日期，获取今天的日期
    const Dates = new Date( time );
    const year: number = Dates.getFullYear();
    const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day;
  };

  const now = formatDate( new Date().getTime() ); // 当前时间
  const resultArr: Array<any> = [];
  let changeDate: string;
  if ( range ) {
    changeDate = formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * range ) );
    return changeDate ;
  }else{
    return now;
  }
}



/**
 * 工具类
 */

export abstract class Util {
  /**
   * 将input file转化成formData对象
   * @param {Element} file - input type=file dom element
   * @returns {Object} fd - FormData对象
   */
  public static getFileFormData(file) {
    let fd = new FormData();
    fd.append(file.files[0].name, file.files[0]);
    return fd;
  }
  /**
   * 发送文件时截取后缀名作为拓展字段
   * @param {string} name - 文件名
   * @returns {string} 后缀名
   */
  public static getExt(name: string): string {
    const index = name.lastIndexOf('.');
    return index === -1 ? '' : name.substring(index + 1);
  }
  /**
   * 将文件后缀名分类
   * @param {string} ext - 后缀名
   * @returns {string} newType - 分类名
   */
  public static sortByExt(ext: string): string {
    if (ext === '') {
      return 'other';
    }
    const audio = ['wav', 'mp3', 'wma', 'midi'];
    const document = ['ppt', 'pptx', 'doc', 'docx', 'pdf', 'xls', 'xlsx', 'txt', 'wps'];
    const video = ['mp4', 'mov', 'rm', 'rmvb', 'wmv', 'avi', '3gp', 'mkv'];
    const image = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    let newType = '';
    if (audio.indexOf(ext) !== -1) {
      // 音频
      newType = 'audio';
    } else if (document.indexOf(ext) !== -1) {
      // 文档
      newType = 'document';
    } else if (video.indexOf(ext) !== -1) {
      // 视频
      newType = 'video';
    } else if (image.indexOf(ext) !== -1) {
      // 图片
      newType = 'image';
    } else {
      // 其他
      newType = 'other';
    }
    return newType;
  }
  /**
   * doubleNumber 将数字格式化成两位数，如9转化成09，15还是转化成15
   * @param {number} num - 一位或者两位整数
   * @returns {string} 两位数的字符串
   */
  public static doubleNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  /**
   * fileReader预览图片返回img url
   * @param {Element} file - input type=file dom element
   * @param {Function} callback - 回调函数
   * @param {Function} callback2 - 回调函数
   */
  public static imgReader(file, callback?: Function, callback2?: Function): void | boolean {
    let files = file.files[0];
    if (!files) {
      return false;
    }
    if (!files.type || files.type === '' || !/image\/\w+/.test(files.type)) {
      callback();
      return false;
    }
    let reader = new FileReader();
    reader.readAsDataURL(files);
    let img = new Image();
    let promise = new Promise((resolve, reject) => {
      reader.onload = function (e) {
        img.src = this.result;
        let that = this;
        img.onload = function () {
          let width = img.naturalWidth;
          let height = img.naturalHeight;
          resolve({
            src: that.result,
            width,
            height
          });
        };
      };
    }).catch(() => {
      console.log('Promise Rejected');
    });
    promise.then((value) => {
      callback2(value);
    }, (error) => {
      // pass
    }).catch(() => {
      console.log('Promise Rejected');
    });
  }
  /**
   * 获取头像裁剪的预览对象
   * @param {Object} file - input type=file dom element的files[0]
   * @param {Function} callback1 - 回调函数1
   * @param {Function} callback2 - 回调函数2
   * @param {Function} callback3 - 回调函数3
   */
  public static getAvatarImgObj
  (file, callback1: Function, callback2: Function, callback3: Function): void | boolean {
    if (!file) {
      return false;
    }
    if (!file.type || file.type === '' || !/image\/\w+/.test(file.type)) {
      callback1();
      return false;
    }
    const that = this;
    let img = new Image();
    let pasteFile = file;
    let reader = new FileReader();
    reader.readAsDataURL(pasteFile);
    let fd = new FormData();
    fd.append(file.name, file);
    reader.onload = function (e) {
      img.src = this.result;
      const _this = this;
      img.onload = function () {
        // 如果选择的图片尺寸小于80*80，弹窗提示
        if (img.naturalWidth < 80 || img.naturalHeight < 80) {
          callback2();
          return;
        }
        callback3(_this, pasteFile, img);
      };
    };
  }
  /**
   * fileReader预览图片url
   * @param {Element} file - input type=file dom element
   * @param {Function} callback - 回调函数
   */
  public static fileReader(file, callback?: Function): Promise<any> | boolean {
    let files = file.files[0];
    if (!files.type || files.type === '') {
      return false;
    }
    if (!/image\/\w+/.test(files.type)) {
      callback();
      return false;
    }
    let reader = new FileReader();
    reader.readAsDataURL(files);
    return new Promise((resolve, reject) => {
      reader.onload = function (e) {
        resolve(this.result);
      };
    }).catch(() => {
      console.log('Promise Rejected');
    });
  }
  /**
   * contenteditable输入框插入内容（表情、粘贴文本等）
   * @param {Element} field - dom element
   * @param {string} value - 需要插入的内容
   * @param {boolean} selectPastedContent - 选中内容还是开始点和结束点一致
   */
  public static insertAtCursor(field, value: string, selectPastedContent?: boolean): void {
    let sel;
    let range;
    field.focus();
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        let el = document.createElement('div');
        el.innerHTML = value;
        let frag = document.createDocumentFragment();
        let node;
        let lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        let firstNode = frag.firstChild;
        range.insertNode(frag);
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          if (selectPastedContent) {
            range.setStartBefore(firstNode);
          } else {
            range.collapse(true);
          }
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  }
  /**
   * contenteditable输入框光标聚焦到最后
   * @param {Element} element - dom element
   */
  public static focusLast(element): void {
    if (window.getSelection) {
      const range = window.getSelection();
      range.selectAllChildren(element);
      range.collapse(element, element.childNodes.length);
    }
  }
  /**
   * 判断字符串首字母是否是中文
   * @param {string} str - 需要操作的字符串
   * @returns {boolean}
   */
  public static firstLetterIsChinese(str: string): boolean {
    const re = /^[\\u4e00-\\u9fa5]/;
    return re.test(str) ? false : true;
  }


  /**
   * 将时间转化成需要的格式
   * @param {number} msgTime - 需要转换的时间毫秒数
   * @returns {string} showTime - 时间的标识，根据标识可以再页面应用不同的date管道
   * 当天 --- today
   * 昨天和前天 --- yesterday或the day before
   * 近7天（排除今天，昨天，前天） --- day
   * 今年其他时间 --- month
   * 今年之前的时间 --- year
   */
  public static reducerDate(msgTime: number): string {
    const time = new Date(msgTime);
    const now = new Date();
    const msgYear = time.getFullYear();
    const nowYear = now.getFullYear();
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();
    const nowSecond = now.getSeconds();
    const nowTime = now.getTime();
    const todayTime = nowHour * 60 * 1000 * 60 + nowMinute * 1000 * 60 + nowSecond * 1000;
    const gapDate = (nowTime - todayTime - msgTime) / 1000 / 60 / 60 / 24;
    let showTime = '';
    if (msgYear !== nowYear) {
      showTime = 'year';
    } else if (gapDate > 6) {
      showTime = 'month';
    } else if (gapDate <= 6 && gapDate > 2) {
      showTime = 'day';
    } else if (gapDate <= 2 && gapDate > 1) {
      showTime = 'the day before';
    } else if (gapDate <= 1 && gapDate > 0) {
      showTime = 'yesterday';
    } else if (gapDate <= 0) {
      showTime = 'today';
    }
    return showTime;
  }
  /**
   * 判断两个时间间隔是否超过5分钟
   * @param {number} oldTime
   * @param {number} newTime
   * @returns {boolean}
   */
  public static fiveMinutes(oldTime: number, newTime: number): boolean {
    const gap = newTime - oldTime;
    return gap / 1000 / 60 > 5 ? true : false;
  }
  /**
   * 获取当前光标的在页面中的位置
   * @param {Element} input - input dom element
   * @returns {Object} offset - 光标的位置
   */
  public static getOffset(input) {
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    let offset;
    if (!this.isSafari()) {
      offset = range.getBoundingClientRect();
    } else {
      let clonedRange;
      let rect;
      let shadowCaret;
      clonedRange = range.cloneRange();
      clonedRange.setStart(range.endContainer, range.endOffset - 1);
      clonedRange.setEnd(range.endContainer, range.endOffset);
      rect = clonedRange.getBoundingClientRect();
      offset = {
        height: rect.height,
        left: rect.left + rect.width,
        top: rect.top
      };
      clonedRange.detach();
      if (input.innerHTML === '@') {
        clonedRange = range.cloneRange();
        shadowCaret = document.createTextNode('|');
        clonedRange.insertNode(shadowCaret);
        clonedRange.selectNode(shadowCaret);
        rect = clonedRange.getBoundingClientRect();
        offset = {
          height: rect.height,
          left: rect.left,
          top: rect.top
        };
        input.innerHTML = '@';
        this.focusLast(input);
        clonedRange.detach();
      }
    }
    return offset;
  }
  /**
   * 深度拷贝对象（只能深度拷贝没有方法属性的对象）
   * @param {Object} obj - 需要拷贝的对象
   * @returns {Object} result - 新的对象
   */
  public static deepCopyObj(obj: object) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * 处理头像的大小
   * @param {Event} event 头像dom的事件对象
   */
  public static reduceAvatarSize(event): void {
    if (event.target.naturalHeight >= event.target.naturalWidth) {
      event.target.style.width = '100%';
      event.target.style.height = 'auto';
    } else {
      event.target.style.height = '100%';
      event.target.style.width = 'auto';
    }
  }
  /**
   * 判断是否是safari浏览器
   * @returns {boolean}
   */
  public static isSafari(): boolean {
    const userAgent = navigator.userAgent;
    return userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1;
  }
  constructor() {
    // pass
  }
}
