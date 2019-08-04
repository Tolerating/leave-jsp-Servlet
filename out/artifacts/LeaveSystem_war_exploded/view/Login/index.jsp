<%--
  Created by IntelliJ IDEA.
  User: 刘凯
  Date: 2019/8/3
  Time: 20:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>登录</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="keywords" content="free html5, free template, free bootstrap, html5, css3, mobile first, responsive" />
  <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
  <link rel="shortcut icon" href="favicon.ico">
<%--  <link href="../../Content/StyleSheet.css" rel="stylesheet" />--%>
  <link href="../../Scripts/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="../../Scripts/Login/css/animate.css" />
  <link rel="stylesheet" href="../../Scripts/Login/css/style.css" />
  <!-- 提示框 -->
  <link href="../../Scripts/messenger-1.4.1/build/css/messenger.css" rel="stylesheet" type="text/css" />
  <link href="../../Scripts/messenger-1.4.1/build/css/messenger-theme-future.css" rel="stylesheet" type="text/css" />
  <!-- FOR IE9 below -->
</head>
<body>
<div class="container">
  <br />
  <div class="row">
    <div class="col-md-12 text-center">
      <h2><a class="fontsize1-4" style="color:black;">高职学校请假通软件后台</a></h2>
    </div>
  </div>
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <form action="#" class="fh5co-form animate-box" data-animate-effect="fadeIn" style="margin-top: 50px;">
        <h2>登录</h2>
        <div class="form-group">
          <label for="username" class="sr-only">用户名</label>
          <input type="text" class="form-control" id="UserID" placeholder="请输入工号" autocomplete="off" onblur="judgeUserID()"/>
        </div>
        <div class="form-group">
          <label for="password" class="sr-only">密码</label>
          <input type="password" class="form-control" id="password" placeholder="请输入密码" autocomplete="off" onblur="judgePwd()"/>
        </div>
        <div class="form-group" id="base">
          <select id="post1" class="selectpicker form-control">
            <option value="0">学生</option>
            <option value="1">班主任</option>
            <option value="2">辅导员</option>
            <option value="3">院领导</option>
            <option value="4">校领导</option>
            <option value="5">公寓中心</option>
          </select>
        </div>
        <div class="form-group">
          <button id="btnLogin" type="button" class="btn btn-primary form-control" onclick="loginLeave()">登录</button>
        </div>
        <a href="./ForgetPwd.jsp" style="float:right">忘记密码?</a>
      </form>
    </div>
  </div>
</div>
<!-- jQuery -->
<script src="../../Scripts/jquery/jquery-2.0.3.min.js" type="text/javascript"></script>
<!-- Bootstrap -->
<script src="../../Scripts/bootstrap/js/bootstrap.min.js"></script>
<!-- md5加密 -->
<script src="../../Scripts/jquery-md5/jQuery.md5.js" type="text/javascript"></script>
<!-- 提示框 -->
<script src="../../Scripts/messenger-1.4.1/build/js/messenger.min.js" type="text/javascript"></script>
<script src="../../Scripts/messenger-1.4.1/build/js/messenger-theme-future.js" type="text/javascript"></script>
<script src="../../Scripts/layer/layer.js" type="text/javascript"></script>
<script type="text/javascript">
  function judgeUserID() {
    var userid = document.getElementById("UserID");
    if (userid.value.trim() == "") {
      layer.msg('请输入工号!', { icon: 5 });
    }
  }
  function judgePwd() {
    var userPwd = document.getElementById("password");
    if (userPwd.value.trim() == "") {
      layer.msg('请输入密码!', { icon: 5 });
    }
  }
  function loginLeave() {
    var username = document.getElementById("UserID").value.trim();
    var loginID = username;
    var userPwd = document.getElementById("password").value;
    var postName = document.getElementById("post1");
    var post = document.getElementById("post1").value;
    if (username == "") {
      layer.msg('工号不能为空', { icon: 5 });
    } else if (userPwd.trim() == "") {
      layer.msg('密码不能为空', { icon: 5 });
    } else {
      if (post != 0){
        username += post;
      }
      var pwd = $.md5(userPwd);
      $.ajax({
        url:'http://localhost:8080/login',
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        datatype: "json",
        data: {Name:username ,Pwd: pwd,Post:postName.options[postName.selectedIndex].text ,oper:"loginLeave"},
        success: function (data, textstatus, jqXHR) {
          console.log(data)
          if (data.d == -1) {
            Messenger().post({ message: "用户民或密码错误!", showCloseButton: true, hideAfter: 5, type: "error" });
          } else {
            Messenger().post({ message: "登录成功!", showCloseButton: true, hideAfter: 5, type: "success" });
            sessionStorage.LoginID = loginID;       //不加职称数字的
            sessionStorage.DataLoginID = username;      //加了职称数字的
            sessionStorage.Post = postName.options[postName.selectedIndex].text;
            sessionStorage.Pwd = pwd;
            location.href = "../Student/Home.jsp";
          }
        },
        error: function (jqXHR, status, error) {
          Messenger().post({ message: "连接服务器错误!", showCloseButton: true, hideAfter: 5, type: "error" });
        }
      });
    }
  }
</script>
</body>
</html>
