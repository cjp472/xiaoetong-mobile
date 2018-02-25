window.onload = function () {
    var scrollWrapper = document.getElementsByClassName('imgWrapper');
    var imgWapper = document.getElementsByClassName('imgScrollContainer');
    var communityItem = document.getElementsByClassName('community-item');
    /*调整图片顺序，设置初始值*/
    Array.prototype.forEach.call(imgWapper, function(el){
     el.style.left = '-26.4vw';
    });

    var interval = 3000;/*图片切换的时间间隔*/
    var timer;
    var index = 1; /*控制右边文字按钮对应的图片*/
    var len = 4; /*图片数量*/

    var startPoint = 0;
    var currentPoint = 0;

    /*页面滑动的动画函数*/
    function animate (offset) {
      var time = 300;
      var interval = 10;
      var speed = offset/(time/interval);
      var left = parseFloat(imgWapper[0].style.left) + offset;

      var go = function () {
        if ( (speed > 0 && parseFloat(imgWapper[0].style.left) < left) || (speed < 0 && parseFloat(imgWapper[0].style.left) > left)) {
          Array.prototype.forEach.call(imgWapper, function(el){
            el.style.left = parseFloat(el.style.left) + speed + 'vw';
          });
            setTimeout(go, interval);
        } else {
          Array.prototype.forEach.call(imgWapper, function(el){
            el.style.left = left + 'vw';
          });
          /*左右超过固定距离时，让图片容器重新回到初始状态*/
          if(left > -26.4){
            Array.prototype.forEach.call(imgWapper, function(el){
              el.style.left = -26.4 * len + 'vw';
            });
          }

          if(left < -26.4 * len) {
            Array.prototype.forEach.call(imgWapper, function(el){
              el.style.left = '-26.4vw';
            });
          }
        }
      };
      go();
    }

    function showItems() {
        for (var i = 0; i < communityItem.length ; i++) {
            if( communityItem[i].classList.contains('community-item_active')){
                communityItem[i].classList.remove('community-item_active');
                 break;/*一旦清除，则退出循环，提高性能*/
            }
        }
        communityItem[index - 1].classList.add('community-item_active');
    }

    /*自动切图*/
    function playScroll() {
      timer = setTimeout(function() {
        next();
        playScroll();
      }, interval);
    }

    playScroll();

    function stopScroll() {
      clearTimeout(timer);
    }

    Array.prototype.forEach.call(imgWapper, function(el){
      el.addEventListener('touchstart', function(el) {
        stopScroll();
        startPoint = el.targetTouches[0].pageX;
      });
    });

    Array.prototype.forEach.call(imgWapper, function(el){
      el.addEventListener('touchmove', function(el) {
        currentPoint = el.targetTouches[0].pageX;
      });
    });

    Array.prototype.forEach.call(imgWapper, function(el){
      el.addEventListener('touchend', function(el) {
        if (currentPoint - startPoint > 0) {
          prev();
        } else {
          next();
        }
        playScroll();
      });
    });

    function next() {
      if (index === 4) {
        index = 1;
      }else {
        index += 1;
      }
      animate(-26.4);
      showItems();
    }

    function prev() {
      if (index === 1) {
        index = 4;
      }else {
        index -= 1;
      }
      animate(26.4);
      showItems();
    }

    for (var i = 0; i < communityItem.length; i++) {
        communityItem[i].onclick = function () {
          if (this.classList.contains('community-item_active')) {
            return;
          }
          stopScroll();
          var myIndex = parseInt(this.dataset.index);
          var offset = -26.4 * (myIndex - index);
          animate (offset);
          index = myIndex;
          showItems();
          playScroll();
        };
    }

    /*服务商家数量计算*/
    function addNum() {
      var calcText = document.getElementById('customers-title-num');
      var calcNum = parseInt(calcText.innerText);
      var calcTime = null;
      var calcSpeed = 66;
      if (calcNum < 173412) {
        calcTime = setInterval(function () {
          calcNum += calcSpeed;
          if (calcNum  >= 173412) {
            clearInterval(calcTime);
            calcNum  = 173412;
          }
          calcText.innerText = calcNum;
        }, 0);
      }
    }
    addNum();

    /*顶部导航条 -- 汉堡图标*/
    var hambuger = document.getElementById('hambuger-wrapper');
    var hambugerList = document.getElementById('hambuger-list');

    hambuger.onclick = function () {
      hambugerList.classList.toggle('hambuger-list_active');
      overlay.classList.toggle('overlay_active');
      hambuger.classList.toggle('hambuger-wrapper_active');
    };

    /*视频*/
    var closeVideo = document.getElementById('video-wrapper-img');
    var videoButton = document.getElementById('video-button');
    var videoWrapper = document.getElementById('video-wrapper');
    var video = document.getElementById('header-video');

    videoButton.onclick = function () {
      videoWrapper.classList.toggle('video-wrapper_active');
      overlay.classList.toggle('overlay_active');
    };

    closeVideo.onclick = function () {
      videoWrapper.classList.remove('video-wrapper_active');
      overlay.classList.remove('overlay_active');
      video.pause();
    };

    /*底部导航条*/
    var footerButton = document.getElementById('footer-fixed-button');
    var footerSever = document.getElementById('footer-fixed-server');

    footerButton.onclick = function () {
      footerSever.classList.toggle('footer-fixed-server_active');
      footerButton.classList.toggle('footer-fixed-button_active');
      overlay.classList.toggle('overlay_active');
      if (footerButton.classList.contains('footer-fixed-button_active')) {
        footerButton.innerText = '收起';
      } else {
        footerButton.innerText = '立即咨询';
      }
    };

    /*遮罩层*/
    var overlay = document.getElementById('overlay');

    overlay.onclick = function () {
      videoWrapper.classList.remove('video-wrapper_active');
      video.pause();
      overlay.classList.remove('overlay_active');
      hambuger.classList.remove('hambuger-wrapper_active');
      hambugerList.classList.remove('hambuger-list_active');
      footerSever.classList.remove('footer-fixed-server_active');
      footerButton.classList.remove('footer-fixed-button_active');
      footerButton.innerText = '立即咨询';
    };

};
