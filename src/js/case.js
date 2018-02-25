window.onload = function () {

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

  var selectTab = document.getElementsByClassName('case-selectTab-item');
  var selectContent = document.getElementsByClassName('case-customersWrapper');

  for (var i = 0; i < selectTab.length; i++) {
    selectTab[i].index = i;
    selectTab[i].onclick = function () {
      for (var j = 0; j < selectTab.length; j++) {
        selectTab[j].classList.remove('case-selectTab-item_active');
        selectContent[j].classList.remove('case-customersWrapper_active');
      }
      this.classList.add('case-selectTab-item_active');
      selectContent[this.index].classList.add('case-customersWrapper_active');
    };
  }

  /*顶部导航条 -- 汉堡图标*/
  var hambuger = document.getElementById('hambuger-wrapper');
  var hambugerList = document.getElementById('hambuger-list');

  hambuger.onclick = function () {
    hambugerList.classList.toggle('hambuger-list_active');
    overlay.classList.toggle('overlay_active');
    hambuger.classList.toggle('hambuger-wrapper_active');
  };

  /*遮罩层*/
  var overlay = document.getElementById('overlay');

  overlay.onclick = function () {
    hambuger.classList.remove('hambuger-wrapper_active');
    hambugerList.classList.remove('hambuger-list_active');
    overlay.classList.remove('overlay_active');
    footerSever.classList.remove('footer-fixed-server_active');
    footerButton.classList.remove('footer-fixed-button_active');
    footerButton.innerText = '立即咨询';
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
};
