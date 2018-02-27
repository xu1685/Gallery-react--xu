require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
// 利用自执行函数，将图片名信息转成图片URL路径信息
// let imageDatas = require('../data/imageDatas.json')
imageDatas = (function genImageUrl(imageDatasArr)
{
  for(var i = 0, j = imageDatasArr.length; i<j ; i++){
  	var singleImageData = imageDatasArr[i];
  	singleImageData.imageUrl = require('../images/' + singleImageData.fileName);
  	imageDatasArr[i] = singleImageData;
  }

  return imageDatasArr;
})(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">
        </section>
        <nav className="controlerr-nav">
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
