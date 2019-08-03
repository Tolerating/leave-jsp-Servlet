<%--
  Created by IntelliJ IDEA.
  User: 刘凯
  Date: 2019/8/3
  Time: 22:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta charset="utf-8" />
    <title>忘记密码</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<%--    <link rel="icon" type="image/png" href="img/icofavicon.ico" />--%>
    <link rel="stylesheet" type="text/css" href="../../Content/cloud-admin.min.css" />
    <!-- 图标字体 -->
    <link href="../../fonts/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <!-- 下拉框 -->
    <link href="../../Scripts/select2/select2.min.css" rel="stylesheet" type="text/css" />
    <!-- css3动画库 -->
    <link rel="stylesheet" type="text/css" href="../../Content/animate.min.css" />
    <!-- 提示框 -->
    <link href="../../Scripts/messenger-1.4.1/build/css/messenger.css" rel="stylesheet" type="text/css" />
    <link href="../../Scripts/messenger-1.4.1/build/css/messenger-theme-future.css" rel="stylesheet" type="text/css" />
    <!-- 自定义css -->
    <link href="../../Content/default.css" rel="stylesheet" type="text/css" />
    <link href="../../Scripts/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="forgetpwd">
<section id="login" class="visible">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-sm-6 col-sm-offset-3 col-lg-offset-4">
                <div class="login-box-plain">
                    <h2 class="bigintro">密码找回</h2>
                    <div class="divide-40"></div>
                    <form>
                        <div class="form-group">
                            <label>用户名</label>
                            <i class="fa fa-user"></i>
                            <input name="userName" id="username" class="form-control" placeholder="工号" />
                        </div>
                        <div class="form-group">
                            <select id="DropDownList" class="form-control form-select">
                                <option value="0">学生</option>
                                <option value="1">班主任</option>
                                <option value="2">辅导员</option>
                                <option value="3">院领导</option>
                                <option value="4">校领导</option>
                                <option value="5">公寓中心</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>验证码</label>
                            <input type="text" name="mobile" style="width:272px;" id="Code" placeholder="请输入验证码" class="form-control margin-top-5" />
                            <input type="button" name="sendCode" id="btn_code" style="width:272px" value="发送验证码到手机" onclick="btncode()" class="button button-small" />
                        </div>
                        <span id="alt"></span>
                        <div class="form-actions">
                            <input type="button" value="提交" id="btnsend" disabled="disabled" class="button button-small" onclick="btnSendPwd()" />
                        </div>
                        <a href="./index.jsp">返回登录</a>
                    </form>

                    <!-- SOCIAL LOGIN -->

                </div>
            </div>
        </div>
    </div>

</section>
<script src="../../Scripts/jquery/jquery-2.0.3.min.js"></script>
<script src="../../Scripts/bootstrap/js/bootstrap.min.js"></script>
<script src="../../Scripts/layer/layer.js"></script>
<script>
    function btncode() {
        var username = document.getElementById("username").value.trim();
        var post = document.getElementById("DropDownList").value;
        if (username == "") {
            layer.alert('工号不能为空！', { icon: 5 }, function (index) {
                layer.close(index);
            });
        } else {
            if (post == "1") {
                username += "1";
            } else if (post == "2") {
                username += "2";
            } else if (post == "3") {
                username += 3;
            } else if (post == "4") {
                username += 4;
            } else if(post == "5"){
                username += 5;
            }
            $.ajax({
                url: "/LoginModule/btnSendcode",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: "{UserName:'" + username + "',Post:'" + post + "'}",
                success: function (data, status, jqXHR) {
                    if (data == -7) {
                        layer.alert('用户名不存在', { icon: 5 }, function (index) {
                            layer.close(index);
                        });
                    } else if (data > 0) {
                        layer.msg('短信已发送,请勿离开当前页面!', { icon: 6 });
                        document.getElementById("btnsend").removeAttribute("disabled");
                    } else {
                        layer.msg('短信发送失败', { icon: 5 });
                    }
                },
                error: function (jqXHR, status, error) {
                    layer.msg('连接服务器失败', function () {

                    });
                }
            });
        }
    }

    function btnSendPwd() {
        var username = document.getElementById("username").value.trim();
        var post = document.getElementById("DropDownList").value;
        var code = document.getElementById("Code").value.trim();
        if (username == "") {
            layer.alert('学号/工号不能为空！', { icon: 5 }, function (index) {
                layer.close(index);
            });
        } else if (code == "") {
            layer.alert('请输入验证码！', { icon: 5 }, function (index) {
                layer.close(index);
            });
        } else {
            var UserID = username;
            if (post != "0") {
                UserID += post;
            }
            $.ajax({
                url: "/LoginModule/btnsend",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: "{UserName:'" + UserID + "',Code:'"+code+"'}",
                success: function (data, status, jqXHR) {
                    //console.log(data);
                    if (data == -1) {
                        layer.alert('验证码错误', { icon: 5 }, function (index) {
                            layer.close(index);
                        });
                    } else if (data == -2) {
                        layer.msg('用户名错误', { icon: 5 });
                    } else {
                        if (username.length == 9) {
                            location.href = "/LoginModule/NewPwd?id=" + username;
                        } else {
                            location.href = "/LoginModule/NewPwd?id=" + username.slice(0, 9) + "&post=" + post;
                        }

                    }
                },
                error: function (jqXHR, status, error) {
                    layer.msg('连接服务器失败',{ icon: 5 }, function () {

                    });
                }
            });
        }
    }
</script>
</body>
</html>
