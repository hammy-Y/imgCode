function GVerify(options) { // 创建一个图形验证码对象，接收options对象为参数
    this.options = { // 默认options参数值
      id: '', // 容器Id
      canvasId: 'verifyCanvas', // canvas的ID
      width: '80', // 默认canvas宽度
      height: '30', // 默认canvas高度
      type: 'number', // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
      code: ''
    }
  
    if (Object.prototype.toString.call(options) === '[object Object]') { // 判断传入参数类型
      for (var i in options) { // 根据传入的参数，修改默认参数值
        this.options[i] = options[i]
      }
    } else {
      this.options.id = options
    }
  
    this.options.numArr = '0,1,2,3,4,5,6,7,8,9'.split(',')
  
    this._init()
    this.refresh()
  }
  
  GVerify.prototype = {
    /** 版本号**/
    version: '1.0.0',
  
    /** 初始化方法**/
    _init: function() {
      var con = document.getElementById(this.options.id)
      var canvas = document.createElement('canvas')
      this.options.width = con.offsetWidth > 0 ? con.offsetWidth : '90'
      this.options.height = con.offsetHeight > 0 ? con.offsetHeight : '40'
      canvas.id = this.options.canvasId
      canvas.width = this.options.width
      canvas.height = this.options.height
      canvas.style.cursor = 'pointer'
      canvas.innerHTML = '您的浏览器版本不支持canvas'
      con.appendChild(canvas)
      var parent = this
      canvas.onclick = function() {
        parent.refresh()
      }
    },
  
    /** 生成验证码**/
    refresh: function() {
      var canvas = document.getElementById(this.options.canvasId)
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d')
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.textBaseline = 'middle'
  
      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, this.options.width, this.options.height)
  
      /** 绘制干扰线**/
      for (var i = 0; i < 4; i++) {
        ctx.strokeStyle = randomColor(40, 180)
        ctx.beginPath()
        ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height))
        ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height))
        ctx.stroke()
      }
      /** 绘制干扰点**/
      for (var j = 0; j < this.options.width / 4; j++) {
        ctx.fillStyle = randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
  }
  /** 生成一个随机数**/
  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  /** 生成一个随机色**/
  function randomColor(min, max) {
    var r = randomNum(min, max)
    var g = randomNum(min, max)
    var b = randomNum(min, max)
    return 'rgb(' + r + ',' + g + ',' + b + ')'
  }
  
  export {
    GVerify
  }
  