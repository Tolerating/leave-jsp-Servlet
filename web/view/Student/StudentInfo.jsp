<%--
  Created by IntelliJ IDEA.
  User: 刘凯
  Date: 2019/8/3
  Time: 22:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link href="../../Scripts/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="../../Scripts/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../../Scripts/timedemo/css/asDatepicker.css" rel="stylesheet" />
    <title>个人信息</title>
    <style>
        [v-cloak] {
            display:none;
        }
        displayDom {
            display:none;
        }
        .form-control1234 {
            display: block;
            width: 80%;
            height: 34px;
            padding: 6px 12px;
            font-size: 14px;
            line-height: 1.42857143;
            color: #555;
            background-color: #fff;
            background-image: none;
            border: 1px solid #ccc;
            border-radius: 4px;
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
            -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
            -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
            transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        }
    </style>
</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="./Home.jsp">请假系统</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li><a href="./Home.jsp">申请请假</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="./StudentInfo.jsp">个人信息</a></li>
                <li><a href="#">退出登录</a></li>
            </ul>
        </div>
    </div>
</nav>
<section class="content-wrapper main-content clear-fix">
    <div class="container" id="StuIno">
        <!-- Main component for a primary marketing message or call to action -->
        <div class="jumbotron">
            <h3 class="right"></h3>
            <div class="row">
                <ul id="myTab" class="nav nav-tabs col-sm-12">
                    <li class="active"><a href="#holidays_Class" data-toggle="tab">个人信息</a></li>
                </ul>
            </div>
            <div id="myTabContent" class="tab-content">
                <div class="tab-pane fade in active" id="holidays_Class">
                    <div class="row">
                        <br />
                        <div class="col-md-12">
                            <p class=" control-label" id="StudentNum" v-cloak>学号:&nbsp; {{StudentNum}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <p class="col-md-12" id="StudentClassName" v-cloak>班级:&nbsp; {{StudentClassName}}</p>
                    </div>
                    <div class="row">
                        <p class="col-md-12" id="StudentName" v-cloak>姓名:&nbsp; {{StudentName}}</p>
                    </div>
                    <div class="row">
                        <p class="col-md-12" id="StudentSex" v-cloak>性别:&nbsp; {{StudentSex}}</p>
                    </div>
                    <div class="row">
                        <p class="col-md-12" id="StudentIDCard" v-cloak>身份证:&nbsp; {{StudentIDCard}}</p>
                    </div>
                    <div class="row">
                        <p class="col-md-12" id="StudentBedroomNum" v-cloak>寝室号:&nbsp; {{StudentBedroomNum}}</p>
                    </div>

                    <div class="row">
                        <p class="col-md-12" id="StudentHomeAddress" v-cloak>家庭住址:&nbsp; {{StudentHomeAddress}}</p>
                    </div>
                    <div class="row">
                        <p class="col-md-12" id="StudentParentTel" v-cloak>父母一方的联系方式:&nbsp; {{StudentParentTel}}</p>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <span class="">手机号:</span>
                            <input type="text" id="StudentTel" v-model="StudentTel" class=" form-control1234" />
                        </div>
                    </div>
                </div>
                <p>
                    <br />
                    <a class="btn btn-lg btn-primary" id="sub" v-on:click="updateStuTel" role="button">修改手机号</a>
                    <a class="btn btn-lg btn-primary" id="updatemm" v-on:click="modalShow" role="button">修改密码</a>
                </p>
                <span id="transmark" style="display: none; width: 0px; height: 0px;"></span>
            </div>
        </div>

        <div class="modal fade" id="myModalEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">修改密码</h4>
                    </div>
                    <div class="modal-body">
                        <form action="" method="POST" id="formEdit">
                            <table class="table table-hover table-striped myTable2">
                                <tbody>
                                <tr>
                                    <td>新密码：</td>
                                    <td>
                                        <input id="newAdnminPassswordEdit" name="newAdnminPasssword" v-model="newAdnminPasssword" type="password" placeholder="请输入不小于6位的新密码..." class="form-control" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>新密码确认：</td>
                                    <td>
                                        <input id="new2AdnminPassswordEdit" name="new2AdnminPasssword" v-model="new2AdnminPasssword" placeholder="请再次输入..." type="password" class="form-control" />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" v-on:click="updateStuPwd" id="btnEdit">保存</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>
<script src="../../Scripts/jquery/jquery-2.0.3.min.js"></script>
<script src="../../Scripts/jQuery-Cookie/jquery.cookie.min.js"></script>
<script src="../../Scripts/bootstrap/js/bootstrap.min.js"></script>
<script src="../../Scripts/vue.js"></script>
<script>
    $('#navbar').find('a').each(function () {
        if (this.href == document.location.href || document.location.href.search(this.href) >= 0) {
            $(this).parent().addClass('active'); // this.className = 'active';
        }
    });
</script>
<script src="../../Scripts/layer/layer.js"></script>
<script src="../../Scripts/timedemo/js/jquery-asDatepicker.js"></script>
<!-- md5加密 -->
<script src="../../Scripts/jquery-md5/jQuery.md5.js" type="text/javascript"></script>
<script>
    var stuInfo;
    var classInfo;
    $(function () {
        layer.config({
            extend: ['skin/moon/style.css'], //加载新皮肤
            skin: 'layer-ext-moon'
        });
    });
    (function () {
        $.ajax({
            url: "http://localhost:8080/login",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            dataType: "JSON",
            data:{oper:"getStudentInfo"},
            async: false,
            success: function (data, status, jqXHR) {
                console.log(typeof data)
                stuInfo = data;
                console.log(stuInfo.studentClassId);
                if (data == "404"){
                    window.location.href = "../Login/index.jsp";
                } else{
                    $.ajax({
                        url: "http://localhost:8080/login",
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded;charset=utf-8",
                        dataType: "JSON",
                        data: {classID: stuInfo.studentClassId,oper:"getClassInfo"},
                        async:false,
                        success: function (data, status, jqXHR) {
                            classInfo = data;
                            if (data == "404"){
                                window.location.href = "../Login/index.jsp";
                            } else{
                                $.cookie("className", classInfo.className, {path:'/'});
                                $.cookie("StudentNum", stuInfo.studentNum);
                                $.cookie("classID", stuInfo.studentClassId);
                                $.cookie("classHeadTeacherID", classInfo.classHeadTeacherId);
                                $.cookie("StudentName", stuInfo.studentName);
                            }

                        }
                    });
                }

            }
        });
    })();

    var vm = new Vue({
        el: "#StuIno",
        data: {
            StudentNum:stuInfo.studentNum ,//
            StudentClassName: classInfo.className,
            StudentName: stuInfo.studentName,
            StudentSex: stuInfo.studentSex,
            StudentIDCard: stuInfo.studentIdCard,
            StudentBedroomNum: stuInfo.studentBedroomNum,
            StudentHomeAddress: stuInfo.studentHomeAddress,
            StudentParentTel: stuInfo.studentParentTel,
            StudentTel: stuInfo.studentTel,
            newAdnminPasssword: "",
            new2AdnminPasssword:""
        },
        methods: {
            updateStuTel: function () {
                var reg = /^(\+86)?(1[0-9]{10})$/;
                if (this.StudentTel == "") {
                    layer.alert('手机号不能为空', { icon: 5 }, function (index) {
                        layer.close(index);
                    });
                } else if (!reg.test(this.StudentTel)) {
                    layer.alert('请输入正确的手机号', { icon: 5 }, function (index) {
                        layer.close(index);
                    });
                } else {
                    layer.msg('新手机号为:' + this.StudentTel, {
                        time: 0,
                        btn: ['确定', '取消'],
                        yes: function (index) {
                            layer.close(index);
                            layer.load(1);
                            $.ajax({
                                url: "http://localhost:8080/login",
                                type: "POST",
                                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                                dataType: "JSON",
                                async: false,
                                data: {StuTel:vm.StudentTel,StuNum:vm.StudentNum,oper:"updateStudentTel"},
                                success: function (data, status, jqXHR) {
                                    if (data == "1") {
                                        setTimeout(function () {
                                            layer.closeAll('loading');
                                        }, 0);
                                        layer.alert('手机号更新成功', { icon: 0 }, function (index) {
                                            layer.close(index);
                                        });
                                    } else if(data == "404" ){
                                        window.location.href = "../Login/index.jsp";
                                    }else {
                                        setTimeout(function () {
                                            layer.closeAll('loading');
                                        }, 0);
                                        layer.msg("手机号更新失败", {icon:5});
                                    }
                                },
                                error: function (jqXHR, status, error) {
                                    layer.alert('连接服务器失败!', { icon: 0 }, function (index) {
                                        layer.close(index);
                                    });
                                }
                            });
                        }
                    });
                }
            },
            modalShow: function () {
                $('#myModalEdit').modal('show');
                this.oldAdnminPasssword = "";
                this.newAdnminPasssword = "";
                this.new2AdnminPasssword = "";
            },
            updateStuPwd: function () {
                if (this.newAdnminPasssword == "" || this.new2AdnminPasssword == "") {
                    layer.msg('请输入新密码', { icon: 5 });
                } else if (this.newAdnminPasssword.length < 6) {
                    layer.msg('密码长度不能小于6位,请重新输入', { icon: 5 });
                }else if (this.newAdnminPasssword != this.new2AdnminPasssword) {
                    layer.msg('两次输入的密码不一致', { icon: 5 });
                } else {
                    $.ajax({
                        url: "http://localhost:8080/login",
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded;charset=utf-8",
                        dataType: "JSON",
                        async: false,
                        data: {studentNum:this.StudentNum,passnew:$.md5(this.new2AdnminPasssword),oper:"updatePwd"},
                        success: function (data, status, jqXHR) {
                            if (data == 1) {
                                layer.alert('密码更新成功', { icon: 0 }, function (index) {
                                    layer.close(index);
                                    $('#myModalEdit').modal('hide');
                                    location.href = "../Login/index.jsp";
                                });

                            } else if(data == "404"){
                                window.location.href = "../Login/index.jsp";
                            }else {
                                layer.alert('密码更新失败', { icon: 5 }, function (index) {
                                    layer.close(index);
                                });
                            }
                        },
                        error: function (jqXHR,status,error) {
                            layer.alert('连接服务器失败!', { icon: 0 }, function (index) {
                                layer.close(index);
                            });
                        }
                    });
                }
            }
        }

    });
</script>
</body>
</html>
