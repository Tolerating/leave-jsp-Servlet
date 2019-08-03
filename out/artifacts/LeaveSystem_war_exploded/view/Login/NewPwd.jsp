<%--
  Created by IntelliJ IDEA.
  User: 刘凯
  Date: 2019/8/3
  Time: 22:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta charset="utf-8" />
    <title>新密码</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
<%--    <link rel="icon" type="image/png" href="img/icofavicon.ico" />--%>
    <link rel="stylesheet" type="text/css" href="../../Content/cloud-admin.min.css" />
    <link href="../../Scripts/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
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
</head>
<body class="forgetpwd">
<section id="login" class="visible">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-sm-6 col-sm-offset-3 col-lg-offset-4">
                <div class="login-box-plain">
                    <h2 class="bigintro">新密码</h2>
                    <div class="divide-40"></div>
                    <form>
                        <div class="form-group">
                            <label>工号</label>
                            <i class="fa fa-user"></i>
                            <input type="text" readonly value="" name="userId">
<%--                            @Html.TextBox("userId", ViewData["userid"], new { ReadOnly = true })--%>
                            <input type="hidden" name="post">
<%--                            @Html.Hidden("post",ViewData["Post"])--%>
                        </div>
                        <div class="form-group">
                            <label>新密码</label>
                            <i class="fa fa-user"></i>
                            <input type="password" class="form-control" id="passone" v-model="pwdone" placeholder="密码长度不小于6位" />
                        </div>
                        <div class="form-group">
                            <label>再次输入密码</label>
                            <i class="fa fa-user"></i>
                            <input type="password" class="form-control" id="passtwo" v-model="pwdtwo"  placeholder="再次输入" />
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-info" v-on:click="btnSendpwd" id="btn-sure"> 确 定 </button>
                        </div>
                        <a href="./index.jsp">取消</a>
                    </form>

                </div>
            </div>
        </div>
    </div>
</section>

<script src="../../Scripts/jquery/jquery-2.0.3.min.js"></script>
<script src="../../Scripts/jquery-md5/jQuery.md5.js" type="text/javascript"></script>
<script src="../../Scripts/bootstrap/js/bootstrap.min.js"></script>
<script src="../../Scripts/layer/layer.js"></script>
<script src="../../Scripts/vue.js"></script>
<script type="text/javascript">
    var vm = new Vue({
        el: "#login",
        data: {
            pwdone: "",
            pwdtwo:""
        },
        methods: {
            btnSendpwd: function () {
                var username = document.getElementById("userId").value;
                var post = document.getElementById("post").value;
                if (this.pwdone == "" || this.pwdtwo == "") {
                    layer.alert('密码不可以为空，请输入！', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                }else if (this.pwdone != this.pwdtwo) {
                    layer.alert('两次密码输入不一致，请重新输入！', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                } else if (this.pwdone.length < 6) {
                    layer.alert('密码长度不能小于6位，请重新输入！', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                } else {
                    if (post != "" || post != "0") {
                        username += post;
                    }
                    $.ajax({
                        url: '../WebService.asmx/updatePwd',
                        contentType: "application/json",
                        type: "POST", dataType: "json",
                        data: '{ID:"' + username + '",passnew:"' + $.md5(this.pwdtwo) + '",Post:"'+post+'"}',
                        success: function (data) {
                            console.log(data);
                            if (data.d == 1) {
                                layer.alert('密码修改成功！', { icon: 1 }, function (index) {
                                    layer.close(index);
                                    location.href = "/LoginModule/Login";
                                });
                            } else {
                                layer.alert('111服务正忙，请稍后再试！', { icon: 2 }, function (index) {
                                    layer.close(index);
                                    location.href = "/LoginModule/Login";
                                });
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            layer.alert('连接服务器失败,请稍后重试!', { icon: 2 }, function (index) {
                                layer.close(index);
                            });
                        }
                    });
                }
            }
        },
    });
</script>
</body>
</html>
