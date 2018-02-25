window.onload = function () {

  var selectTab = document.getElementsByClassName('market-selectTab-item');
  var selectContent = document.getElementsByClassName('market-product-list');

  for (var i = 0; i < selectTab.length; i++) {
    (function(i){
      selectTab[i].index = i;
      selectTab[i].onclick = function () {
        for (var j = 0; j < selectTab.length; j++) {
          selectTab[j].classList.remove('market-selectTab-item_active');
          selectContent[j].classList.remove('market-product-list_active');
        }
        this.classList.add('market-selectTab-item_active');
        selectContent[this.index].classList.add('market-product-list_active');
      };
    })(i);
  }

  /*图片懒加载*/
  window.addEventListener('scroll',loadImages);

  function loadImages() {
    var imageList = document.getElementsByClassName("market-product-item-img");
    for(var i = 0; i < imageList.length; i++){
      var image = imageList[i];
      if(isShowImages(image)) {
        var imageUrl = image.getAttribute("data-url");
        image.setAttribute("src",imageUrl);
      }
    }
  }

  function isShowImages(image) {
    var distance = image.getBoundingClientRect();
    var wHeight = window.innerHeight || docuemnt.documentElement.clientHeight;
    return (distance.top >= 0 && distance.top <= wHeight);
  }

  /*页面滑动*/
  var scrollContainer = document.getElementById('scrollContainer');
  var imgWrapper = document.getElementById('img-wrapper');
  var scrollButtons = document.getElementsByClassName('buttons-item');
  var index = 1;
  var len = 6;
  var animated = false;
  var interval = 4000;
  var timer;

  var startPoint = 0;
  var currentPoint = 0;
  var distance = 0;

  imgWrapper.style.left = '-100%';

  function animate (offset) {
      if (offset == 0) {
          return;
      }
      animated = true;
      var time = 500;
      var inteval = 10;
      var speed = offset/(time/inteval);
      var left = parseInt(imgWrapper.style.left) + offset;

      var go = function (){
          if ( (speed > 0 && parseInt(imgWrapper.style.left) < left) || (speed < 0 && parseInt(imgWrapper.style.left) > left)) {
              imgWrapper.style.left = parseInt(imgWrapper.style.left) + speed + '%';
              setTimeout(go, inteval);
          }
          else {
              imgWrapper.style.left = left + '%';
              if(left > -100){
                  imgWrapper.style.left = -100 * len + '%';
              }
              if(left < (-100 * len)) {
                  imgWrapper.style.left = '-100%';
              }
              animated = false;
          }
      };
      go();
  }

  function showButton() {
      for (var i = 0; i < scrollButtons.length ; i++) {
          if( scrollButtons[i].classList.contains('buttons-item_active')){
              scrollButtons[i].classList.remove('buttons-item_active');
              break;
          }
      }
      scrollButtons[index - 1].classList.add('buttons-item_active');
  }

  function play() {
      timer = setTimeout(function () {
          next();
          play();
      }, interval);
  }

  function stop() {
      clearTimeout(timer);
  }

  function next() {
      if (animated) {
          return;
      }
      if (index === 6) {
          index = 1;
      }
      else {
          index += 1;
      }
      animate(-100);
      showButton();
  }

  function prev() {
      if (animated) {
          return;
      }
      if (index === 1) {
          index = 6;
      }
      else {
          index -= 1;
      }
      animate(100);
      showButton();
  }

  play();

  scrollContainer.addEventListener('touchstart', function(el){
    stop();
    startPoint = el.targetTouches[0].pageX;
  });

  scrollContainer.addEventListener('touchmove', function(el){
    currentPoint = el.targetTouches[0].pageX;
    distance = currentPoint - startPoint;
  });

  scrollContainer.addEventListener('touchend', function(){
    if (distance > 20) {
      prev();
    } else if(distance < -20) {
      next();
    }
    play();
  });



  /*遮罩层*/
  var overlay = document.getElementById('overlay');

  overlay.onclick = function () {
    hambuger.classList.remove('hambuger-wrapper_active');
    hambugerList.classList.remove('hambuger-list_active');
    overlay.classList.remove('overlay_active');
    footerSever.classList.remove('footer-fixed-server_active');
    footerButton.classList.remove('footer-fixed-button_active');
    footerButton.innerText = '立即咨询';
    wxContainer.classList.remove('market-wxContainer_active');
  };

  /*顶部导航条 -- 汉堡图标*/
  var hambuger = document.getElementById('hambuger-wrapper');
  var hambugerList = document.getElementById('hambuger-list');

  hambuger.onclick = function () {
    hambugerList.classList.toggle('hambuger-list_active');
    overlay.classList.toggle('overlay_active');
    hambuger.classList.toggle('hambuger-wrapper_active');
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

  /*登录*/
  var marketButtons = document.getElementsByClassName('market-product-button');
  var wxContainer = document.getElementById('market-wxContainer');
  var marketClose = document.getElementById('market-wxContainer-close');
  Array.prototype.forEach.call(marketButtons, function(el){
    el.onclick = function() {
      overlay.classList.toggle('overlay_active');
      wxContainer.classList.toggle('market-wxContainer_active');
    };
  });

  marketClose.onclick = function() {
    overlay.classList.remove('overlay_active');
    wxContainer.classList.remove('market-wxContainer_active');
  };
};
