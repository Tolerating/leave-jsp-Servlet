<%--
  Created by IntelliJ IDEA.
  User: 刘凯
  Date: 2019/8/3
  Time: 22:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="../../Scripts/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="../../Scripts/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../../Scripts/timedemo/css/asDatepicker.css" rel="stylesheet" />
    <link href="../../Scripts/bootstrap-datetimepicker/new/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <title>请假界面</title>
    <style>
        [v-cloak] {
            display:none;
        }
        displayDom {
            display:none;
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
    <div class="container">
        <div class="jumbotron">
            <h3 class="right"></h3>
            <div id="all" class="row">
                <ul id="myTab" class="nav nav-tabs col-sm-12">
                    <li class="active"><a href="#holidays_Class" data-toggle="tab">上课请假</a> </li>
                    <li><a href="#holidays_W" data-toggle="tab">周末请假</a></li>
                    <li><a href="#holidays_Home" data-toggle="tab">不留宿请假</a></li>
                    <li><a href="#holidays_Stu" data-toggle="tab">早自习请假</a></li>
                    <li><a href="#AdvanceDelay" data-toggle="tab">早出晚归请假</a></li>

                </ul>
            </div>
            <div id="myTabContent" v-cloak class="tab-content">
                <!--早出晚归请假-->
                <div class="tab-pane fade" id="AdvanceDelay">
                    <div class=" row">
                        <div class="col-md-12">
                            <br />
                            <p>请假类型：<b>早出晚归请假</b></p>
                            <p>
                                请假人:班级:<label id="className4">{{className}}</label>
                                学号:<label id="StudentNum4">{{StudentNum}}</label>
                                姓名:<label id="StudentName4">{{StudentName}}</label>
                            </p>
                        </div>
                        <div class="col-md-6 table-responsive">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>当日早出</th>
                                    <th>早出时间</th>
                                    <th>当日晚归</th>
                                    <th>晚归时间</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr style="height: 70px;">
                                    <td></td>
                                    <td>
                                        <img v-bind:src="arriveEarlypath" width="50" height="50" id="imageone" />
                                    </td>
                                    <td id="time1"></td>
                                    <td>
                                        <img v-bind:src="arriveLatepath" width="50" height="50" id="imagetwo" />
                                    </td>
                                    <td id="time2"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="row">
                        <p class="col-md-4" style="display:inline">
                            <input type="checkbox" id="checkedAdvance" style="zoom: 150%;" v-model="arriveEarly" v-bind:disabled="canAdvance" v-on:change="showOrhideImg" /><b>早出</b>请打勾
                        </p>
                        <p class="col-md-6" style="display:inline">
                            <input type="checkbox" id="checkedDelay" style="zoom: 150%;" v-model="arriveLate" v-bind:disabled="canDelay" v-on:change="showOrhideImg" /><b>晚归</b>请打勾
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <br />
                            <div class="input-group" v-show="arriveEarly != false" id="ZC">
                                <span class="input-group-addon">早出理由</span>
                                <input type="text" class="form-control"  id="ZCTXT" v-model="arriveEarlyReason" />
                                <input type="text" class="form_datetime form-control"  value="" readonly placeholder="早出时间" id="ZCTIME" />
                            </div>
                            <br />
                            <div class="input-group" v-show="arriveLate != false" id="WG">
                                <span class="input-group-addon">晚归理由</span>
                                <input type="text" class="form-control" aria-describedby="sizing-addon2" id="WGTXT" v-model="arriveLateReason" />
                                <input type="text" class="form_datetime form-control" aria-describedby="sizing-addon1" value="" readonly placeholder="晚归时间" id="WGTIME" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <br />
                        <div class="col-md-12">
                            <p><span id="countday2"></span>6:00前为早出时间，10:00后为晚归时间</p>
                            <h4><strong>说明：早出允许请假和学生出寝时间为6:00前。</strong></h4>
                            <h4><strong>说明：晚归允许请假时间为23:00前。</strong></h4>
                            <input type="button" class="btn btn-lg btn-primary" v-bind:disabled="canAdvanceDelaybtn" v-on:click="arriveEarlyLateLeave" id="sub4" value="提交请假单" />
                        </div>
                    </div>
                </div>
                <!--*************-->
                <!--上课请假-->
                <div class="tab-pane fade in active" id="holidays_Class">
                    <div class=" row">
                        <div class="col-md-12">
                            <br />
                            <p>请假类型：<b>上课请假</b></p>
                            <p>
                                请假人:班级:<label id="className">{{className}}</label>
                                学号:<label id="StudentNum">{{StudentNum}}</label>
                                姓名:<label id="StudentName">{{StudentName}}</label>
                            </p>
                        </div>
                        <div class="col-md-12">
                            <p>请假事由：</p>
                            <input id="Cause" type="text" v-model="lessonReason" class="form-control" />
                        </div>
                    </div>
                    <div class="row">
                    </div>
                    <div class="row">
                        <p class="col-md-12">请假开始时间:<label id="wktime1"></label></p>
                        <div class="col-md-12">
                            <input type="text" id="calendar1" readonly onchange="setStartDate(event)" class=" form-control LeaveTime" />
                        </div>
                        <!--    <div class="col-md-3">
                            <p style="display:none">
                                第
                                <select id="1" class="selectpicker show-tick"></select>节课。
                            </p>
                        </div>-->
                    </div>
                    <div class="row">
                        <p class="col-md-12">请假结束时间:</p>
                        <div class="col-md-12">
                            <input type="text" id="calendar11" readonly class="form-control LeaveTime" />
                        </div>
                        <!--            <div class="col-md-3">
                            <p style="display:none">
                                第
                                <select id="2" class="selectpicker show-tick"></select>节课。
                            </p>
                        </div>-->

                    </div>
                    <div class="row">
                        <p class="col-md-12">节数:</p>
                        <div class="col-md-12">
                            <input type="text" id="num" v-on:input="onlyNumber1($event)" v-model="lessonNum" class="form-control" placeholder="请假节数" />
                        </div>
                        <div class="col-md-12">
                            <p>请予以批准!</p>
                            <h4><strong>说明：如请假情况有误或者撤销请假请联系本班班主任</strong></h4>
                            <p>
                                <a class="btn btn-lg btn-primary" id="sub" v-on:click="lessonLeave" role="button">提交请假单</a>
                            </p>
                        </div>
                    </div>
                </div>
                <!--************-->
                <!--不留宿请假-->
                <div class="tab-pane fade" id="holidays_Home">
                    <div class=" row">
                        <div class="col-md-12">
                            <br />
                            <p>请假类型：<b>不留宿请假</b></p>
                            <p>
                                请假人:班级:<label id="className1">{{className}}</label>
                                学号:<label id="StudentNum1">{{StudentNum}}</label>
                                姓名:<label id="StudentName1">{{StudentName}}</label>
                            </p>
                        </div>
                        <div class="col-md-12">
                            <p>请假事由：</p>
                            <input id="Cause1" type="text" v-model="notStayReason" class="form-control" />

                        </div>
                    </div>

                    <div class="row">
                    </div>
                    <div class="row">
                        <p class="col-md-12">请假开始时间:</p>
                        <div class="col-md-12">
                            <input type="text" id="calendar2" readonly onchange="setStartDate(event)" class="form-control LeaveTime" />
                        </div>
                        <div class="col-md-8">
                            <p id="wk1"></p>
                        </div>
                    </div>
                    <div class="row">
                        <p class="col-md-12">请假结束时间:</p>
                        <div class="col-md-12">
                            <input type="text" id="calendar21" readonly class="form-control LeaveTime" />
                        </div>
                    </div>
                    <div class="row">
                        <br />
                        <div class="col-md-12">
                            <p><span id="countday"></span>请予以批准!</p>
                            <h4><strong>说明：如请假情况有误或者撤销请假请联系本班班主任</strong></h4>
                            <p>
                                <a class="btn btn-lg btn-primary" id="sub1" v-on:click="notStayLeave" role="button">提交请假单</a>
                            </p>
                        </div>
                    </div>
                </div>
                <!--************-->
                <!--早自习请假-->
                <div class="tab-pane fade" id="holidays_Stu">
                    <div class="row">
                        <div class="col-md-12">
                            <br />
                            <p>请假类型：<b>早自习请假</b></p>
                            <p>
                                请假人:班级:<label id="className2">{{className}}</label>
                                学号:<label id="StudentNum2">{{StudentNum}}</label>
                                姓名:<label id="StudentName2">{{StudentName}}</label>
                            </p>
                        </div>
                        <div class="col-md-12">
                            <p>请假事由：</p>
                            <input id="Cause2" type="text" v-model="earlySelfStureason" class="form-control" />

                        </div>
                    </div>

                    <div class="row">
                    </div>
                    <div class="row">
                        <p class="col-md-12">请假开始时间:</p>
                        <div class="col-md-12">
                            <input type="text" id="calendar3" readonly onchange="setStartDate(event)" class=" form-control LeaveTime" />
                        </div>
                        <div class="col-md-8">
                            <p id="wk2"></p>
                        </div>
                    </div>
                    <div class="row">
                        <p class="col-md-12">请假结束时间:</p>
                        <div class="col-md-12">
                            <input type="text" id="calendar31" readonly class=" form-control LeaveTime" />
                        </div>
                    </div>
                    <div class="row">
                        <br />
                        <div class="col-md-12">
                            <p><span id="countday1"></span>请予以批准!</p>
                            <h4><strong>说明：如请假情况有误或者撤销请假请联系本班班主任</strong></h4>
                            <p>
                                <a class="btn btn-lg btn-primary" id="sub2" v-on:click="earlySelfStuLeave" role="button">提交请假单</a>
                            </p>
                        </div>
                    </div>
                </div>
                <!--***************-->
                <!--周末请假-->
                <div class="tab-pane fade " id="holidays_W">
                    <div class=" row">
                        <div class="col-md-12">
                            <br />
                            <p>请假类型：<b>周五六晚请假</b></p>
                            <p>
                                请假人:班级:<label id="className3">{{className}}</label>
                                学号:<label id="StudentNum3">{{StudentNum}}</label>
                                姓名:<label id="StudentName3">{{StudentName}}</label>
                            </p>
                        </div>
                    </div>
                    <div class="row">
                    </div>
                    <div class="col-md-12" style="display: none">
                        <input type="text" readonly id="calendar7" class=" form-control disabled" />
                    </div>
                    <div class="row">
                        <p class="col-md-12" id="conne">请假时间:周一早8:00--周五晚9:00</p>
                    </div>
                    <div class="row">
                        <div class=" ">
                            <p class="col-md-4">
                                <input type="checkbox" id="checkedF" style="zoom: 150%;"  v-model="fridayLeave"/><b>周五晚请假</b>请打勾
                            </p>
                        </div>

                        <div class=" ">
                            <p class="col-md-6">
                                <input type="checkbox" id="checkedS" style="zoom: 150%;" v-model="saturdayLeave" /><b>周六晚请假</b>请打勾
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
                            <b>请假理由:</b>
                            <select id="WeakDaysReason" class="form-control selectpicker" v-model="weekdayReason">
                                <option selected="selected" class="f" value="回家">回家</option>
                                <option value="去另一半家">去另一半家</option>
                                <option value="去亲戚家">去亲戚家</option>
                                <option value="去朋友家">去朋友家</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <div class="row" id="WeakDaysReason1" v-show="weekdayReason == '其他'">
                        <div class="col-md-7">
                            <b>其他理由:</b>
                            <input id="Reason" type="text" v-model="otherReason" class="form-control" />
                        </div>
                    </div>
                    <div class="row">
                        <br />
                        <div class="col-md-12">
                            <p><span></span>请予以批准!</p>
                            <h4><strong>说明：如请假情况有误或者撤销请假请联系本班班主任</strong></h4>
                            <input class="btn btn-lg btn-primary" id="sub3" type="button" value="提交请假单" v-on:click="weekdayLeave" v-bind:disabled="showLeaTime">
                        </div>
                    </div>
                </div>
                <!--****************-->
            </div>
        </div>
    </div>
</section>



<div class="container ">
    <footer>
        <p class="text-center">温州科技职业学院</p>
    </footer>
    <div class="row footer-bottom">
        <ul class="list-inline text-center">
            <li><a href="http://www.miibeian.gov.cn/" target="_blank">浙ICP备09056233号</a></li>
            <li>浙公网安备 33030402000424号 </li>
            <!--
            <li><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备11008151号</a></li>
            <li>京公网安备11010802014853</li>-->
        </ul>
    </div>
</div>
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
<script src="../../Scripts/bootstrap-datetimepicker/new/js/bootstrap-datetimepicker.min.js"></script>
<script src="../../Scripts/bootstrap-datetimepicker/new/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="../../Scripts/moment/moment.js"></script>
<script>

    $(function () {
        layer.config({
            extend: ['skin/moon/style.css'], //加载新皮肤
            skin: 'layer-ext-moon'
        });

        $(".LeaveTime").datetimepicker({
            format: "yyyy-mm-dd hh:ii",
            language: 'zh-CN',
            weekStart: 1,
            autoclose: true,
            todayHighlight: 1,
            startView: 2,
            minView: 0,
            minuteStep: 5,
            maxView: 3,
            forceParse: 0,
            startDate: new Date()
        });

        $("#ZCTIME").datetimepicker({
            format: "hh:ii",
            language: 'zh-CN',
            weekStart: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView: 0,
            maxView: 1,
            forceParse: 0,
            minuteStep: 5
        });
        $("#WGTIME").datetimepicker({
            format: "hh:ii",
            language: 'zh-CN',
            weekStart: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView: 0,
            maxView: 1,
            forceParse: 0,
            minuteStep: 5
        });

        $(".glyphicon-arrow-right").addClass("calendar-next");
        $(".glyphicon-arrow-left").addClass("calendar-prev");
        $('#myTabContent input').empty();


        vm.weekdayLeaTime();
        vm.AdvanceDelay();
        getIsAdvanceDelay();
    });

    var vm = new Vue({
        el: "#myTabContent",
        data: {
            className: $.cookie("className"),
            StudentNum: $.cookie("StudentNum"),     //学生ID
            StudentName: $.cookie("StudentName"),
            classID: $.cookie("classID"),
            ClassHeadTeacherID: $.cookie("classHeadTeacherID"),   //班主任ID
            /*上课请假*/
            lessonReason: "",        //上课请假事由
            lessonNum: "",          //上课请假节数
            /*周末请假*/
            weekdayReason: "回家",
            fridayLeave: false,
            saturdayLeave: false,
            showLeaTime: false,          //周末请假表单提交按钮是否为disabled
            //weekdayStartTime: "",
            //weekdayEndTime: "",
            otherReason: "",
            /*不留宿请假*/
            notStayReason: "",
            /*早自习请假*/
            earlySelfStureason: "",
            /*早出晚归*/
            arriveEarly: false,
            canAdvance:false,               //早出是否disabled
            arriveEarlypath: "/Content/img/1.png",     //早出图片路径
            arriveLate: false,
            canDelay: false,             //晚归是否disabled
            arriveLatepath: "/Content/img/1.png",      //晚归图片路径
            arriveEarlyReason: "",
            arriveLateReason: "",
            canAdvanceDelaybtn: false,    //判断当前时间是否可以请假
            arriveCategory:""           //区分早出与晚归请假

        },
        methods: {
            //上课请假
            lessonLeave: function () {
                let lesssonStaTime = moment(document.getElementById("calendar1").value).format("YYYY-MM-DD");
                let lessonEndTime = moment(document.getElementById("calendar11").value).format("YYYY-MM-DD");
                //console.log(lesssonStaTime);
                if (this.lessonReason == "") {
                    layer.alert('请输入请假事由', { icon: 2 }, function (index) {
                        layer.close(index);
                        //alert(getdayNum(lessonEndTime, lesssonStaTime));
                    });
                } else if (this.lessonNum == "") {
                    layer.alert('请输入请假节数', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                }else if(lesssonStaTime == "" && lessonEndTime == ""){
                    layer.alert('请选择请假时间段', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                }else {
                    //**********************************
                    var leaveRecordobj = JSON.stringify({
                        leaveRecordStudentId: this.StudentNum,
                        leaveRecordReason: this.lessonReason,
                        leaveRecordStartTime: lesssonStaTime,
                        leaveRecordEndtTime: lessonEndTime,
                        leaveRecordStartLesson: 0,
                        leaveRecordEndLesson:0,
                        leaveRecordCategory: "1",
                        leaveRecordNumDays: getdayNum(lessonEndTime, lesssonStaTime),
                        leaveRecordStage: 1,
                        leaveRecordApprovalResult: "待审核",
                        leaveRecordSumLesson: this.lessonNum,
                        leaveRecordClassNum: this.classID
                    });
                    layer.msg('上课请假:因(' + this.lessonReason + ')事由，需请假<br />(' + this.lessonNum + ')节课,请假时间：' + lesssonStaTime + '<br />到' + lessonEndTime + '止,总计' + getdayNum(lessonEndTime, lesssonStaTime) +'天。', {
                        time: 0 //不自动关闭
                        , btn: ['确定', '取消']
                        , yes: function (index) {
                            layer.close(index);
                            $.ajax({
                                url: 'http://localhost:8080/login', contentType: "application/x-www-form-urlencoded;charset=UTF-8", type: "POST", dataType: "json",
                                data: {Data:leaveRecordobj,TeacherID:vm.ClassHeadTeacherID,StudentName:vm.StudentName,oper:"insertLeaveRecord"},
                                success: function (data,status,jqXHR) {
                                    if (data > "0") {
                                        layer.alert('提交请假单成功', { icon: 1 }, function (index) {
                                            layer.close(index);
                                            location.href = "./Home.jsp";
                                        });
                                    } else if(data == "404"){
                                        window.location.href = "../Login/index.jsp";
                                    }else {
                                        layer.alert('提交请假单失败', { icon: 1 }, function (index) {
                                            layer.close(index);
                                            location.href = "./Home.jsp";
                                        });
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    layer.alert('连接服务器失败', { icon: 2 }, function (index) {
                                        layer.close(index);
                                    });
                                }
                            });
                        }
                    });
                    //**********************************
                }
            },
            //周末请假
            weekdayLeave: function () {
                let weekdayStartTime = moment().add('days', 5 - new Date().getDay()).format('YYYY-MM-DD');
                let weekdayEndTime = moment().add('days', 6 - new Date().getDay()).format('YYYY-MM-DD');
                if (this.fridayLeave == false && this.saturdayLeave == false) {
                    layer.alert('周五，周六晚都未勾选', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                } else if (this.weekdayReason == "其他" && this.otherReason == "") {
                    layer.alert('请输入其他事由', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                } else {
                    $.ajax({
                        url: 'http://localhost:8080/login',
                        contentType: "application/x-www-form-urlencoded;charset=utf-8",
                        dataType:"json",
                        type: "POST",
                        data: {starttime:weekdayStartTime,endtime:weekdayEndTime,oper:"checkWeekLeave"},
                        async:false,
                        success: function (data,status,jqXHR) {
                            if (data == "0") {
                                if (vm.fridayLeave == true && vm.saturdayLeave == true) {
                                    if (vm.weekdayReason != "其他") {
                                        comment = '周五,六晚不留宿请假：' + weekdayStartTime + '(周五)晚至' + weekdayEndTime + '(周六)晚。</br>' + '请假理由:' + vm.weekdayReason + "。";
                                    }
                                    else {
                                        comment = '周五,六晚不留宿请假：' + weekdayStartTime + '(周五)晚至' + weekdayEndTime + '(周六)晚。</br>' + '请假理由:' + vm.otherReason + "。";
                                    }
                                }
                                else if (vm.fridayLeave == true && vm.saturdayLeave == false) {
                                    if (vm.weekdayReason != "其他") {
                                        comment = '周五晚不留宿请假：' + weekdayStartTime + '(周五)晚。</br>' + '请假理由:' + vm.weekdayReason + "。"; weekdayEndTime = weekdayStartTime;
                                    }
                                    else {
                                        comment = '周五晚不留宿请假：' + weekdayStartTime + '(周五)晚。</br>' + '请假理由:' + vm.otherReason + "。"; weekdayEndTime = weekdayStartTime;
                                    }
                                }
                                else if (vm.fridayLeave == false && vm.saturdayLeave == true) {
                                    if (vm.weekdayReason != "其他") {
                                        comment = '周六晚不留宿请假：' + weekdayEndTime + '(周六)晚。</br>' + '请假理由:' + vm.weekdayReason + "。"; weekdayStartTime = weekdayEndTime;
                                    }
                                    else {
                                        comment = '周六晚不留宿请假：' + weekdayEndTime + '(周六)晚。</br>' + '请假理由:' + vm.otherReason + "。"; weekdayStartTime = weekdayEndTime;
                                    }
                                }
                                else {
                                    comment = "";
                                }
                                let weekdayLeaveobj = JSON.stringify({
                                    weekDaysStudentId: vm.StudentNum,
                                    weekDaysStartTime: weekdayStartTime,
                                    weekDaysEndtTime: weekdayEndTime,
                                    weekDaysNumDays: getdayNum(weekdayEndTime, weekdayStartTime),
                                    weekDaysReason:vm.weekdayReason+vm.otherReason,
                                    weekDaysStage: "1",
                                    weekDaysApprovalResult: "未审核",
                                    weekDaysApprovalTime:moment().format("YYYY-MM-DD"),     //疑问????
                                    leaveRecordClassNum: vm.classID
                                });

                                layer.msg(comment, {
                                    time: 0 //不自动关闭
                                    , btn: ['确定', '取消']
                                    , yes: function (index) {
                                        layer.close(index);
                                        $.ajax({
                                            url: 'http://localhost:8080/login', contentType: "application/x-www-form-urlencoded", type: "POST", dataType: "json",
                                            data: {Data:weekdayLeaveobj,oper:"InsertWeekDays"},
                                            success: function (data) {
                                                if (data == "1") {
                                                    layer.alert('提交请假单成功', { icon: 1 }, function (index) {
                                                        layer.close(index);
                                                        location.href = "./Home.jsp";
                                                    });
                                                } else if(data == "404"){
                                                    window.location.href = "../Login/index.jsp";
                                                }else {
                                                    layer.alert('提交请假单失败', { icon: 2 }, function (index) {
                                                        layer.close(index);
                                                    });
                                                }
                                            },
                                            error: function (jqXHR, textStatus, errorThrown) {
                                                layer.alert('连接服务器失败', { icon: 2 }, function (index) {
                                                    layer.close(index);
                                                });
                                            }
                                        });
                                    }
                                });

                            }else if(data == "404"){
                                window.location.href = "../Login/index.jsp";
                            }else {
                                layer.alert('请勿重复提交请假', { icon: 2 }, function (index) {
                                    layer.close(index);
                                });
                            }
                        }
                    });
                }
            },
            //不留宿请假
            notStayLeave: function () {
                let notStayStaTime = moment(document.getElementById("calendar2").value).format("YYYY-MM-DD");
                let notStayEndTime = moment(document.getElementById("calendar21").value).format("YYYY-MM-DD");
                if (this.notStayReason == "") {
                    layer.alert('请输入请假事由', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                } else if (notStayStaTime == "" && notStayEndTime == "") {
                    layer.alert('请选择请假时间段', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                } else {
                    let notStayNumDays = getdayNum(notStayEndTime, notStayStaTime);
                    let notStayLeaveobj = JSON.stringify({
                        leaveRecordStudentId: this.StudentNum,
                        leaveRecordReason: this.notStayReason,
                        leaveRecordStartTime: notStayStaTime,
                        leaveRecordEndtTime: notStayEndTime,
                        leaveRecordStartLesson: 0,
                        leaveRecordEndLesson: 0,
                        leaveRecordCategory: "2",
                        leaveRecordNumDays: notStayNumDays,
                        leaveRecordStage: 1,
                        leaveRecordApprovalResult: "待审核",
                        leaveRecordSumLesson: 0,
                        leaveRecordClassNum: this.classID
                    });
                    layer.msg('不留宿请假：因(' + this.notStayReason + ')事由，需请假<br />(' + notStayNumDays + ')天不留宿住校,<br />请假时间：' + notStayStaTime + '到<br />' + notStayEndTime + '止。', {
                        time: 0 //不自动关闭
                        , btn: ['确定', '取消']
                        , yes: function (index) {
                            layer.close(index);
                            $.ajax({
                                url: 'http://localhost:8080/login', contentType: "application/x-www-form-urlencoded;charset=utf-8", type: "POST", dataType: "json",
                                data: {Data:notStayLeaveobj,TeacherID:vm.ClassHeadTeacherID,StudentName:vm.StudentName,oper:"insertLeaveRecord"},
                                success: function (data,status,jqXHR) {
                                    if (data > "0") {
                                        layer.alert('提交请假单成功', { icon: 1 }, function (index) {
                                            layer.close(index);
                                            location.href = "./Home.jsp";
                                        });
                                    } else if(data == "404"){
                                        window.location.href = "../Login/index.jsp";
                                    }else {
                                        layer.alert('提交请假单失败', { icon: 1 }, function (index) {
                                            layer.close(index);
                                            location.href = "./Home.jsp";
                                        });
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    layer.alert('连接服务器失败', { icon: 2 }, function (index) {
                                        layer.close(index);
                                    });
                                }
                            });
                        }
                    });
                }
            },
            //早自习请假
            earlySelfStuLeave: function () {
                let earlySelfStaTime = moment(document.getElementById("calendar3").value).format("YYYY-MM-DD");
                let earlySelfEndTime = moment(document.getElementById("calendar31").value).format("YYYY-MM-DD");
                if (this.earlySelfStureason == "") {
                    layer.alert('请输入请假事由', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                } else if (earlySelfStaTime == "" && earlySelfEndTime == "") {
                    layer.alert('请选择请假时间段', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                } else {
                    let earlySelfNumDays = getdayNum(earlySelfEndTime, earlySelfStaTime);
                    let earlySelfStuLeaveobj = JSON.stringify({
                        leaveRecordStudentId: this.StudentNum,
                        leaveRecordReason: this.earlySelfStureason,
                        leaveRecordStartTime: earlySelfStaTime,
                        leaveRecordEndtTime: earlySelfEndTime,
                        leaveRecordStartLesson: 0,
                        leaveRecordEndLesson: 0,
                        leaveRecordCategory: "3",
                        leaveRecordNumDays: earlySelfNumDays,
                        leaveRecordStage: 1,
                        leaveRecordApprovalResult: "待审核",
                        leaveRecordSumLesson: 0,
                        leaveRecordClassNum: this.classID
                    });
                    layer.msg('早自习请假：因(' + this.earlySelfStureason + ')事由，需<br />请假(' + earlySelfNumDays + ')天早自习,请假时间：' + earlySelfStaTime + '到<br />' + earlySelfEndTime + '止，总计' + earlySelfNumDays + '天。', {
                        time: 0 //不自动关闭
                        , btn: ['确定', '取消']
                        , yes: function (index) {
                            layer.close(index);
                            $.ajax({
                                url: 'http://localhost:8080/login', contentType: "application/x-www-form-urlencoded;charset=utf-8", type: "POST", dataType: "json",
                                data: {Data:earlySelfStuLeaveobj,TeacherID:vm.ClassHeadTeacherID ,StudentName:vm.StudentName,oper:"insertLeaveRecord"},
                                success: function (data, status, jqXHR) {
                                    if (data > "0") {
                                        layer.alert('提交请假单成功', { icon: 1 }, function (index) {
                                            layer.close(index);
                                            location.href = "./Home.jsp";
                                        });
                                    }else if(data == "404"){
                                        window.location.href = "../Login/index.jsp";
                                    } else {
                                        layer.alert('提交请假单失败', { icon: 1 }, function (index) {
                                            layer.close(index);
                                            location.href = "./Home.jsp";
                                        });
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    layer.alert('连接服务器失败', { icon: 2 }, function (index) {
                                        layer.close(index);
                                    });
                                }
                            });
                        }
                    });
                }
            },
            //早出晚归请假
            arriveEarlyLateLeave: function () {
                var arriveEarlyTime = document.getElementById("ZCTIME").value;
                var arriveLateTime = document.getElementById("WGTIME").value;
                //console.log(arriveLateTime);
                var ZTIME = moment().format("YYYY-MM-DD ") + arriveEarlyTime;
                var WTIME = moment().format("YYYY-MM-DD ") + arriveLateTime;
                //console.log(arriveEarlyTime);
                console.log(ZTIME);
                var ZDATE = moment().format("YYYY-MM-DD ") + "6:00";         //早出请假限制时间
                var WDATE = moment().format("YYYY-MM-DD ") + "21:00";         //晚归请假限制时间
                //alert(Date.parse(ZTIME));
                if (this.arriveEarly == false && this.arriveLate == false) {
                    layer.alert('请勾选早出/晚归', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                    return false;
                }

                if (this.arriveEarly == true && this.arriveEarlyReason == "") {
                    layer.alert('请输入早出事由', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                    return;
                } else if (this.arriveEarly == true && arriveEarlyTime == "") {
                    layer.alert('请选择早出的时间', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                    return;
                } else if (this.arriveEarly == true && Date.parse(ZTIME) > Date.parse(ZDATE)) {
                    //alert(arriveEarlyTime);
                    console.log()
                    layer.alert('预计出寝未到6点，方可早出请假。', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                    return;
                }

                if (this.arriveLate == true && this.arriveLateReason == "") {
                    layer.alert('请输入晚归事由', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                    return;
                } else if (this.arriveLate == true && arriveLateTime == "") {
                    layer.alert('请选择晚归的时间', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                    return;
                } else if (this.arriveLate == true && Date.parse(WTIME) < Date.parse(WDATE)) {
                    //alert(arriveLateTime);
                    //console.log(Date.parse(WTIME));
                    //console.log(Date.parse(WDATE));
                    layer.alert('预计回寝超过21点，方可晚归请假。', { icon: 2 }, function (index) {
                        layer.close(index);
                    });
                    return;
                }

                var message;
                if (this.arriveEarly == false && this.arriveLate == true) {
                    message = "【早出晚归请假】因：" + this.arriveLateReason + " 事由，需请: 晚归假,晚归大概时间为：" + WTIME + "。";
                    this.arriveCategory = "晚归";
                } else if (this.arriveEarly == true && this.arriveLate == false) {
                    message = "【早出晚归请假】因：" + this.arriveEarlyReason + " 事由，需请: 早出假,早出大概时间为：" + ZTIME + "。";
                    this.arriveCategory = "早出";
                } else {
                    message = "【早出晚归请假】因：" + this.arriveEarlyReason + " 与 " + this.arriveLateReason + "事由，需请: 早出晚归假,早出晚归大概时间分别为：" + ZTIME + "和" + WTIME + "。";
                    this.arriveCategory = "早出晚归";
                }

                layer.msg(message, {
                    time: 0 //不自动关闭
                    , btn: ['确定', '取消']
                    , yes: function (index) {
                        layer.close(index);
                        $.ajax({
                            url: 'http://localhost:8080/login', contentType: "application/x-www-form-urlencoded;charset=utf-8", type: "POST", dataType: "json",
                            data:{
                                studentNum:vm.StudentNum,
                                advanceReson:vm.arriveEarlyReason,
                                deatReson:vm.arriveLateReason,
                                advanceStudentT:ZTIME,
                                delayStudentT:WTIME,
                                classNum:vm.classID,
                                arriveCategory:vm.arriveCategory,
                                oper:"insertIntoAdvanceDelay"
                            },
                            success: function (data) {
                                if (data == "1") {
                                    layer.alert('提交请假单成功！。', { icon: 1 }, function (index) {
                                        layer.close(index);
                                        location.href = "./Home.jsp";
                                    });
                                }else if(data == "404"){
                                    window.location.href = "../Login/index.jsp";
                                } else {
                                    layer.alert('提交请假单失败！。', { icon: 1 }, function (index) {
                                        layer.close(index);
                                        location.href = "./Home.jsp";
                                    });
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                layer.alert('网络连接失败，请稍后再试！', { icon: 2 }, function (index) {
                                    layer.close(index);
                                });
                            }
                        });
                    }
                });




            },
            onlyNumber1: function (event) {
                var val = event.target.value;
                this.lessonNum = val.replace(/^[^0-9]*/g, "");
                if (val >= 500) {           //最大节数为499
                    this.lessonNum = "";
                }
            },
            weekdayLeaTime: function () {
                var date = new Date();
                if (date.getDay() >1 && date.getDay() <5) {
                    this.showLeaTime = false;
                } else if (date.getDay() == 1 && date.getHours() >= 8) {
                    this.showLeaTime = false;
                } else if (date.getDay() == 5 && date.getHours() <= 19) {
                    this.showLeaTime = false;
                } else {
                    this.showLeaTime = true;
                }
            },      //判断星期
            showOrhideImg: function () {
                if (this.arriveEarly == true) {
                    this.arriveEarlypath = "/Content/img/2.png";
                } else {
                    this.arriveEarlypath = "/Content/img/1.png";
                }

                if (this.arriveLate == true) {
                    this.arriveLatepath = "/Content/img/2.png";
                } else {
                    this.arriveLatepath = "/Content/img/1.png";
                }
            },      //早出晚归图片路径
            AdvanceDelay: function () {
                let timenow = new Date();
                $.ajax({
                    url: 'http://localhost:8080/login', contentType: "application/x-www-form-urlencoded;charset=utf-8", type: "POST", dataType: "text",
                    data: {StudetnID:vm.StudentNum,oper:"selectAdvanceDelay"},
                    success: function (data) {
                        //window.location.href="../Login/index.jsp";
                        console.log(data)
                        let dt = data.toString().split("&");
                        console.log(dt);
                        if (dt[0] == "1") {  //早出
                            vm.arriveEarlypath = "/Content/img/2.png";
                            vm.arriveEarly = true;
                            vm.canAdvance = true;
                            vm.arriveEarlyReason = dt[2];
                            $("#time1").text(dt[1]);
                            //$('#ZCTXT').attr("disabled", 'disabled');
                            document.getElementById("ZCTIME").value = moment(dt[1]).format("HH:mm");
                            /*alert(moment(dt[1]).format("HH:mm"));*/
                            //$('#ZCTIME').attr("disabled", 'disabled');
                            vm.arriveCategory = "晚归";

                        } else if (dt[0] == "2") { //晚归
                            vm.arriveLatepath = "/Content/img/2.png";
                            vm.arriveLate = true;
                            vm.canDelay = true;
                            $("#time2").text(dt[1]);
                            vm.arriveEarlyReason = dt[2];
                            //$('#WGTXT').attr("disabled", 'disabled');
                            document.getElementById("WGTIME").value = moment(dt[1]).format("HH:mm");
                            /*alert(moment(dt[1]).format("HH:mm"));*/
                            //$('#WGTIME').attr("disabled", 'disabled');
                            vm.arriveCategory = "早出";
                        } else if (dt[0] == "0") {
                            vm.arriveEarlypath = "/Content/img/2.png";
                            vm.arriveEarly = true;
                            vm.canAdvance = true;
                            vm.arriveEarlyReason = dt[2];
                            $("#time1").text(dt[1]);
                            //$('#ZCTXT').attr("disabled", 'disabled');
                            document.getElementById("ZCTIME").value = moment(dt[1]).format("HH:mm");
                            /*alert(moment(dt[1]).format("HH:mm"));*/
                            //$('#ZCTIME').attr("disabled", 'disabled');

                            vm.arriveLatepath = "/Content/img/2.png";
                            vm.arriveLate = true;
                            vm.canDelay = true;
                            $("#time2").text(dt[3]);
                            vm.arriveLateReason = dt[4];
                            //$('#WGTXT').attr("disabled", 'disabled');
                            document.getElementById("WGTIME").value = moment(dt[3]).format("HH:mm");
                            /*alert(moment(dt[3]).format("HH:mm"));*/
                            //$('#WGTIME').attr("disabled", 'disabled');

                            //clearInterval(myInterval);
                            //vm.canAdvanceDelaybtn = true;
                            vm.arriveCategory = "早出晚归";
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        layer.alert('网络连接失败，请稍后再试！', { icon: 2 }, function (index) {
                            layer.close(index);
                        });
                    }
                });
            }
        }
    });

    //设置日期控件的开始日期
    function setStartDate(e) {
        var ID = e.target.id;
        var startValue = document.getElementById(ID).value;
        var id = "#" + ID + "1";
        var endVale = document.getElementById(ID +1).value;
        $(id).datetimepicker('setStartDate', startValue);
        if (endVale < startValue) {
            document.getElementById(ID + 1).value = startValue;
            $(id).datetimepicker('update');
        }
    }

    //计算时间差
    function getdayNum(date1, date2) {
        if (date1 == date2) {
            return 1;
        } else {
            return ((Date.parse(date1) - Date.parse(date2)) / (24 * 60 * 60 * 1000))+1;
        }

    }

    //计算当前时间是否可以请假
    function getIsAdvanceDelay(){
        //myInterval;
        //console.log(myInterval);
        var myInterval = setInterval(function () {
            var timenow = new Date();
            console.log("1");
            if (timenow.getHours() > 6 && timenow.getHours() < 21) {
                vm.canAdvanceDelaybtn = false;     //disabled=false


            } else {
                vm.canAdvanceDelaybtn = true;
            }
            if(timenow.getHours() > 6){
                //vm.canAdvance = true;
            }

        }, 1000);//每隔30秒执行一次
    }
</script>
</body>
</html>

