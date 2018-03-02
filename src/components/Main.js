<<<<<<< HEAD
//css
=======
>>>>>>> origin/master
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom'

//获取图片相关的数据
var imageDatas = require('../data/imageData.json');

//利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = (function genImageUrl(imageDatasArr)
{
  for(var i = 0, j = imageDatasArr.length; i<j ; i++){
    var singleImageData = imageDatasArr[i];
    singleImageData.imageUrl = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
=======

let yeomanImage = require('../images/yeoman.png');
// 利用自执行函数，将图片名信息转成图片URL路径信息
// let imageDatas = require('../data/imageDatas.json')
imageDatas = (function genImageUrl(imageDatasArr)
{
  for(var i = 0, j = imageDatasArr.length; i<j ; i++){
  	var singleImageData = imageDatasArr[i];
  	singleImageData.imageUrl = require('../images/' + singleImageData.fileName);
  	imageDatasArr[i] = singleImageData;
>>>>>>> origin/master
  }

  return imageDatasArr;
})(imageDatas);

<<<<<<< HEAD


//产生范围内的随机数
function getRangeRandom(low,height){
  return Math.floor(Math.random() * (height - low) + low)
}

//获取0~30度之间的任意正负角度
function get30DegRandom(){
   return ((Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30))
}

class ImgFigure extends React.Component{
  //点击处理函数
  handleClick(e){
    e.stopPropagation();
    e.preventDefault();
    
    if(this.props.arrange.isCenter){
      this.props.inverse();
    } else {
      this.props.center();
    }
    
  }

  render() {
     var styleObj = {};

     //如果props属性中制订了这张图片的位置，则使用
     if(this.props.arrange.pos){
       styleObj = this.props.arrange.pos;
     }

     //如果图片的旋转角度有值并且不为零，添加旋转角度
     if (this.props.arrange.rotate){
       //添加厂商前缀 兼容浏览器
       (['MozTransform','msTransform','WebkitTransform','transform']).forEach(function(value){
         styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
       }.bind(this));
     }

     if(this.props.arrange.isCenter){
      styleObj.zIndex = 11;
     }

     //给反转的图片添加类名
     var ImgFigureClassName = 'img-figure';
         ImgFigureClassName += this.props.arrange.isInverse ? ' is-inverse ' : ''

      return (
        <figure className ={ImgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
            <img src={this.props.data.imageUrl}
                 alt={this.props.data.title}
             />
            <figcaption>
              <h2 className = "img-title">{this.props.data.title}</h2>
              <div className="img-back" onClick={this.handleClick.bind(this)}>
                <p>
                  {this.props.data.desc}
                </p>
              </div>
            </figcaption>
        </figure>
        )
  }
}

class AppComponent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      imgsArrangeArr:[
        // {
        //   pos: {
        //     left: '0',
        //     top: '0'
        //   },
        //   rotate: '0',   //旋转角度
        //   isInverse: false,   //图片正反面 默认false为图片正面
        //   isCenter: false,  //图片是否居中  默认不居中
        // }
      ]
    };

    this.Constant   = {
      //中心图片位置
      centerPos: {
        left: 0 ,
        right: 0
      },
      //水平两侧的图片位置范围
      hPosRange: {
        leftSecX: [0,0],
        rightSecX: [0,0],
        y:[0,0]
      },
      //顶部的图片位置范围
      vPosRange: {
        x: [0,0],
        topY: [0,0]
      }
    };

  }

  /*
    创建一个闭包函数 通过闭包函数来缓存当前inverse的图片在当前图片信息数组中的index值
    翻转图片 @param index 输入当前执行inverse操作的图片index值
            @return {Function} 这是一个闭包函数 其内return一个真正待被执行的函数
  */

  inverse(index){
    return function() {
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }.bind(this);
  }
  
  /*
    重新布局函数
  */
  rearrange(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        //存储上部图片信息
        imgsArrangeTopArr = [],
        //取一个或者不取
        topImgNum = Math.floor(Math.random() * 2),
        //标记放在上方的这个图片是从数组对象中哪取出来的
        topImgSpliceIndex = 0,

        //布局中心图片
        //将这个中心图片从数组中删除然后返回这个重心图片的信息
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
        
        //居中的 centerindex图片不需要旋转
        imgsArrangeCenterArr[0] = {
          rotate: 0,
          pos: centerPos,
          isCenter: true,
        }

        //布局上侧图片
        topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        imgsArrangeTopArr.forEach(function (value,index) {
          imgsArrangeTopArr[index] = {
            pos: {
              top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
              left: getRangeRandom(vPosRangeX[0],vPosRangeX[1])
            },
            rotate: get30DegRandom(),
            isCenter: false
          }
        });

        //布局两侧图片
        for (var i = 0,j = imgsArrangeArr.length,k = j / 2; i < j ; i++){
          var hPosRangeLORX = null;

          //前半部分布局在左侧  右半部份布局在右侧
          if(i < k){
            hPosRangeLORX = hPosRangeLeftSecX;
          } else {
            hPosRangeLORX = hPosRangeRightSecX;
          }

          imgsArrangeArr[i] = {
            pos: {
              top: getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
              left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
            },
            rotate: get30DegRandom(),
            isCenter: false
          }
        }

        //位置信息设置完毕 整合所有图片回来
        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        });

  }

  /*
   利用rearrange函数 居中对应index的图片
   @param index，需要被居中的图片的index
   @return {Function}
  */

  center(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  }

  //组件加载以后为图片计算位置范围
  componentDidMount() {
    //舞台大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
    stageW = stageDOM.scrollWidth,
    stageH = stageDOM.scrollHeight,
    halfStageW = Math.floor(stageW / 2),
    halfStageH = Math.floor(stageH / 2)
    //拿到一个imgfigure大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.ImgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.floor(imgW / 2),
        halfImgH = Math.floor(imgH / 2)

    //确定中心图片位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }
    //确定水平两侧图片范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //确定顶部图片位置范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
   
    this.rearrange(0);

  }


  render() {

    var controllerUnits = [],
        ImgFigures = [];

    imageDatas.forEach(function (value,index) {
      if(!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: '0',
            top: '0'
          },
          roate: 0,
          isInverse: false,
          isCenter: false
        }
      }

      ImgFigures.push(
        <ImgFigure data={value} ref={'ImgFigure' + index} key={index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse={this.inverse(index).bind(this)}
          center={this.center(index).bind(this)} />
        );
    }.bind(this));
   //把react component对象传递到function中 可以直接调用this
    

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {ImgFigures}
        </section>
        <nav className="controlerr-nav">
          {controllerUnits}
=======
class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">
        </section>
        <nav className="controlerr-nav">
>>>>>>> origin/master
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
