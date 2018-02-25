window.onload = function () {

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
