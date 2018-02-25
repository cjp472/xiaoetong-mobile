window.onload = function () {
  var login = document.getElementById('login');
  var register = document.getElementById('register');
  var forget = document.getElementById('forget');

  var transfromToLogin = document.getElementById('transfromToLogin');
  var transfromToRegister = document.getElementById('transfromToRegister');
  var transfromToForget = document.getElementById('transfromToForget');
  var transfromToLoginAgain = document.getElementById('transfromToLoginAgain');

  transfromToLogin.onclick = function () {
    login.classList.toggle('active');
    register.classList.toggle('active');
  };

  transfromToRegister.onclick = function () {
    login.classList.toggle('active');
    register.classList.toggle('active');
  };

  transfromToForget.onclick = function () {
    forget.classList.toggle('active');
    login.classList.toggle('active');
  };

  transfromToLoginAgain.onclick = function () {
    forget.classList.toggle('active');
    login.classList.toggle('active');
  };

  var registerButton = document.getElementById('register-button');

  var isConfirm = false;
  var isRegisterAccount = false;
  var isRegisterPassword1 = false;
  var isRegisterPassword2 = false;

  function registerAllRight() {
    if (isRegisterAccount && isRegisterPassword1 && isRegisterPassword2 && isConfirm) {
      registerButton.removeAttribute('disabled');
    } else {
      registerButton.setAttribute('disabled','disabled');
    }
  }

  /*必须以字母开头*/
  var regAlphabet = /^[a-zA-Z]/;
  /*必须包含数字*/
  var regNum = /\d+/;
  // regNum.lastIndex = 0;
  /*必须包含大小写字母*/
  var regWord = /(?=.*[a-z])+(?=.*[A-Z])+/g;

  // var loginAccount = document.getElementById('login-account');
  // var loginPassword = document.getElementById('login-password');
  // var loginIdentify = document.getElementById('login-identify');

  var registerAccount = document.getElementById('register-account');
  var registerPassword1 = document.getElementById('register-password1');
  var registerPassword2 = document.getElementById('register-password2');
  var registerIdentify = document.getElementById('register-identify');
  var registerConfirm = document.getElementById('confirm');

  var registerAccountHint = document.getElementById('register-account-hint');
  var registerPasswordHint1 = document.getElementById('register-password1-hint');
  var registerPasswordHint2 = document.getElementById('register-password2-hint');

  var registerAccountImg = document.getElementById('register-account-img');
  var registerPasswordImg1 = document.getElementById('register-password1-img');
  var registerPasswordImg2 = document.getElementById('register-password2-img');

  registerConfirm.onclick = function() {
    isConfirmed();
    registerAllRight();
  };

  function isConfirmed() {
    if (registerConfirm.checked) {
      isConfirm = true;
      return true;
    } else {
      isConfirm = false;
      return false;
    }
  }

  registerAccount.onchange = function () {
    if (isPhone(this.value)) {
      registerAccountHint.innerText = '';
      registerAccountImg.style.opacity = '1';
      isRegisterAccount = true;
    } else {
      registerAccountHint.innerText = '请输入正确的十一位数手机号码';
      registerAccountImg.style.opacity = '0';
      isRegisterAccount = false;
    }
    registerAllRight();
  };

  registerPassword1.onkeyup = function () {

    /*不能使用连续的相同字符*/
    var same = isSame(this.value, this.value[0]);

    if (!regAlphabet.test(this.value[0])) {
      registerPasswordHint1.innerText = '必须以字母开头';
      registerPasswordImg1.style.opacity = '0';
      isRegisterPassword1 = false;
    } else if (this.value.length < 6 || this.value.length > 18) {
      registerPasswordHint1.innerText = '长度在6-18个字符之间，您输入了：' + this.value.length + '个';
      registerPasswordImg1.style.opacity = '0';
      isRegisterPassword1 = false;
    } else if (same === this.value.length) {
      registerPasswordHint1.innerText = '不能使用连续的相同字符作为密码';
      registerPasswordImg1.style.opacity = '0';
      isRegisterPassword1 = false;
    } else if (!regWord.test(this.value)) {
      registerPasswordHint1.innerText = '必须包含大小写字母';
      registerPasswordImg1.style.opacity = '0';
      isRegisterPassword1 = false;
    } else if (!regNum.test(this.value)) {
      registerPasswordHint1.innerText = '必须包含数字';
      registerPasswordImg1.style.opacity = '0';
      isRegisterPassword1 = false;
    } else if (isPassword1(this.value) && this.value.length < 9) {
      registerPasswordHint1.innerText = '密码强度：弱';
      registerPasswordImg1.style.opacity = '1';
      isRegisterPassword1 = true;
    } else if (isPassword1(this.value) && this.value.length < 14 && this.value.length >= 9) {
      registerPasswordHint1.innerText = '密码强度：中';
      registerPasswordImg1.style.opacity = '1';
      isRegisterPassword1 = true;
    } else if (isPassword1(this.value) && this.value.length <= 18 && this.value.length >= 14) {
      registerPasswordHint1.innerText = '密码强度：强';
      registerPasswordImg1.style.opacity = '1';
      isRegisterPassword1 = true;
    }
    registerAllRight();
  };

  registerPassword2.onkeyup = function () {
    if (this.value != registerPassword1.value) {
      registerPasswordHint2.innerText = '两次输入的密码不一致';
      registerPasswordImg2.style.opacity = '0';
      isRegisterPassword2 = false;
    } else {
      registerPasswordHint2.innerText = '';
      registerPasswordImg2.style.opacity = '1';
      isRegisterPassword2 = true;
    }
    registerAllRight();
  };

  var forgetButton = document.getElementById('forget-button');

  var isForgetAccount = false;
  var isForgetPassword1 = false;
  var isForgetPassword2 = false;

  function forgetAllRight() {
    if (isForgetAccount && isForgetPassword1 && isForgetPassword2) {
      forgetButton.removeAttribute('disabled');
    } else {
      forgetButton.setAttribute('disabled','disabled');
    }
  }

  var forgetAccount = document.getElementById('forget-account');
  var forgetPassword1 = document.getElementById('forget-password1');
  var forgetPassword2 = document.getElementById('forget-password2');
  var forgetIdentify = document.getElementById('forget-identify');

  var forgetAccountHint = document.getElementById('forget-account-hint');
  var forgetPasswordHint1 = document.getElementById('forget-password1-hint');
  var forgetPasswordHint2 = document.getElementById('forget-password2-hint');

  var forgetAccountImg = document.getElementById('forget-account-img');
  var forgetPasswordImg1 = document.getElementById('forget-password1-img');
  var forgetPasswordImg2 = document.getElementById('forget-password2-img');

  forgetAccount.onchange = function () {
    if (isPhone(this.value)) {
      forgetAccountHint.innerText = '';
      forgetAccountImg.style.opacity = '1';
      isForgetAccount = true;
    } else {
      forgetAccountHint.innerText = '请输入正确的十一位数手机号码';
      forgetAccountImg.style.opacity = '0';
      isForgetAccount = false;
    }
    forgetAllRight();
  };

  forgetPassword1.onkeyup = function () {

    /*不能使用连续的相同字符*/
    var same = isSame(this.value, this.value[0]);

    if (!regAlphabet.test(this.value[0])) {
      forgetPasswordHint1.innerText = '必须以字母开头';
      forgetPasswordImg1.style.opacity = '0';
      isForgetPassword1 = false;
    } else if (this.value.length < 6 || this.value.length > 18) {
      forgetPasswordHint1.innerText = '长度在6-18个字符之间，您输入了：' + this.value.length + '个';
      forgetPasswordImg1.style.opacity = '0';
      isForgetPassword1 = false;
    } else if (same === this.value.length) {
      forgetPasswordHint1.innerText = '不能使用连续的相同字符作为密码';
      forgetPasswordImg1.style.opacity = '0';
      isForgetPassword1 = false;
    } else if (!regWord.test(this.value)) {
      forgetPasswordHint1.innerText = '必须包含大小写字母';
      forgetPasswordImg1.style.opacity = '0';
      isForgetPassword1 = false;
    } else if (!regNum.test(this.value)) {
      forgetPasswordHint1.innerText = '必须包含数字';
      forgetPasswordImg1.style.opacity = '0';
      isForgetPassword1 = false;
    } else if (isPassword1(this.value) && this.value.length < 9) {
      forgetPasswordHint1.innerText = '密码强度：弱';
      forgetPasswordImg1.style.opacity = '1';
      isForgetPassword1 = true;
    } else if (isPassword1(this.value) && this.value.length < 14 && this.value.length >= 9) {
      forgetPasswordHint1.innerText = '密码强度：中';
      forgetPasswordImg1.style.opacity = '1';
      isForgetPassword1 = true;
    } else if (isPassword1(this.value) && this.value.length <= 18 && this.value.length >= 14) {
      forgetPasswordHint1.innerText = '密码强度：强';
      forgetPasswordImg1.style.opacity = '1';
      isForgetPassword1 = true;
    }
    forgetAllRight();
  };

  forgetPassword2.onkeyup = function () {
    if (this.value != forgetPassword1.value) {
      forgetPasswordHint2.innerText = '两次输入的密码不一致';
      forgetPasswordImg2.style.opacity = '0';
      isForgetPassword2 = false;
    } else {
      forgetPasswordHint2.innerText = '';
      forgetPasswordImg2.style.opacity = '1';
      isForgetPassword2 = true;
    }
    forgetAllRight();
  };

  function isPhone(str) {
    /*11位，0或86或17951的开头可有可无*/
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
  }

  function isPassword1 (str) {
    /*以字母开头，必须包含大小写字母和数字，不能使用特殊字符，长度在6-18个字符之间*/
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  //监测是否都是相同字符
  //只要有一个字符与参数 n 相同，则 tmp + 1
  //如果 tmp 与输入框中的长度相同，说明是一连串相同的字符
  function isSame(str, num) {
    var tmp = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) === num) {
        tmp++;
      }
    }
    return tmp;
  }


};
