//function tipsoDestroy(id) { 
//    $('#'+id).tipso('hide');
//    $('#' + id).tipso('destroy');
//}
//function destroyall(){
//    tipsoDestroy('InputUsername');
//    tipsoDestroy('InputPassword1');
//    tipsoDestroy('InputPassword2');
//    tipsoDestroy('InputName');
//    tipsoDestroy('InputIDCard');
//    tipsoDestroy('InputQQ');
//    tipsoDestroy('InputEmail1');
//    tipsoDestroy('InputMobile');
//    tipsoDestroy('InputPost');
//}
/*------------------------------登录用户名密码验证------------------------------*/
function btnLoginClick() {
    $('#btnLogin').on('click', function () {
        var username = $('#username').val();
        var pwd = $('#password').val();
        var base = $("#e3").val();
        if (username == "") {
            Messenger().post({ message: "用户名不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
            return false;
        }
        else if (pwd == "") {
            Messenger().post({ message: "密码不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
            return false;
        }
        else if (base == "") {
            Messenger().post({ message: "请先选择基地！", showCloseButton: true, hideAfter: 5, type: "error" });
            return false;
        }
        else {
            var mdpwd = $.md5(pwd);
            $.ajax({
                url: '/WebService.asmx/UserNameAndUserPwdExist',
                contentType: "application/json",
                data: '{username:"' + username + '",pwd:"' + mdpwd + '"}',
                type: "POST",
                dataType: "json",
                success: function (data) {
                    if (data.d == -1) {
                        Messenger().post({ message: "用户名或密码错误！", showCloseButton: true, hideAfter: 5, type: "error" });
                        return false;
                    }
                    else if (data.d == 0) {
                        Messenger().post({ message: "账户还未审核通过！请耐心等待审核！", showCloseButton: true, hideAfter: 5, type: "error" });
                        return false;
                    }
                    else {
                        $.ajax({
                            url: '/WebService.asmx/LoginSuccess',
                            contentType: "application/json",
                            data: '{username:"' + username + '",pwd:"' + mdpwd + '",baseID:"' + base + '",userID:"' + data.d + '"}',
                            type: "POST",
                            dataType: "json",
                            success: function () {
                                location.href = "product/Index.aspx";
                            }
                        });
                    }
                }
            });
        }
    });
}
/*------------------------------登录用户名密码验证------------------------------*/


/*------------------------------登录后台用户名密码验证------------------------------*/
function btnAdminLoginClick() {
    $('#btnLogin').on('click', function () {
        var username = $('#username').val();
        var pwd = $('#password').val();
        if (username == "") {
            Messenger().post({ message: "用户名不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
            return false;
        }
        else if (pwd == "") {
            Messenger().post({ message: "密码不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
            return false;
        }
        else {
            var mdpwd = $.md5(pwd);
            $.ajax({
                url: '/WebService.asmx/UserNameAndUserPwdAdminExist',
                contentType: "application/json",
                data: '{username:"' + username + '",pwd:"' + mdpwd + '"}',
                type: "POST",
                dataType: "json",
                success: function (data) {
                    if (data.d == -1) {
                        Messenger().post({ message: "用户名或密码错误！", showCloseButton: true, hideAfter: 5, type: "error" });
                        return false;
                    }
                    else {
                        $.ajax({
                            url: '/WebService.asmx/LoginAdminSuccess',
                            contentType: "application/json",
                            data: '{username:"' + username + '",pwd:"' + mdpwd + '",userID:"' + data.d + '"}',
                            type: "POST",
                            dataType: "json",
                            success: function () {
                                location.href = "/admin/Default.aspx";
                            }
                        });
                    }
                }
            });
        }
    });
}

/*------------------------------登录后台用户名密码验证------------------------------*/




/*------------------------------注册验证------------------------------*/
function btnRegisterClick() {
    $('#btnRegister').on('click', function () {
        if (usernameValidate() && pwdValidate() && repwdValidate() && nameValidate() && idcardValidate() && qqValidate() && emailValidate() && mobileValidate() && postValidate() && ProTeamValidate()&&SliderValidate()) {
          if($('#e7').val()==2)//老师
          {
          $.ajax({
                url: '/WebService.asmx/RegisterTSuccess',
                contentType: "application/json",
                data: '{username:"' + $('#InputUsername').val() + '",pwd:"' + $.md5($('#InputPassword1').val()) + '",realname:"' + $('#InputName').val() + '",idcard:"' + $('#InputIDCard').val() + '",qq:"' + $('#InputQQ').val() + '",email:"' + $('#InputEmail1').val() + '",phone:"' + $('#InputMobile').val() + '",IDnumber:"'+$('#IDnumber').val()+'",post:"' + $('#InputPost').val() + '"}',
                type: "POST",
                dataType: "json",
                success: function () {
                    alert("注册成功");
					location.href = "/HomePage.aspx";
                },
                error: function () {
                    alert("注册失败，请确认您的信息无误！");
                }
            });
          }
             if($('#e7').val()==3)//学生
          {
          $.ajax({
                url: '/WebService.asmx/RegisterSSuccess',
                contentType: "application/json",
                data: '{username:"' + $('#InputUsername').val() + '",pwd:"' + $.md5($('#InputPassword1').val()) + '",realname:"' + $('#InputName').val() + '",idcard:"' + $('#InputIDCard').val() + '",qq:"' + $('#InputQQ').val() + '",email:"' + $('#InputEmail1').val() + '",phone:"' + $('#InputMobile').val() + '",IDnumber:"'+$('#IDnumber').val()+'",post:"' + $('#InputPost').val() + '"}',
                type: "POST",
                dataType: "json",
                success: function () {
                    alert("注册成功");
					location.href = "/HomePage.aspx";
                },
                error: function () {
                    alert("注册失败，请确认您的信息无误！");
                }
            });
          }
        }
    });
}
/*------------------------------注册验证------------------------------*/



/*------------------------------正则验证------------------------------*/
function regularValidate(reg,value)
{
	if(!reg.test(value))
	{
		return false;
	}
	else
	{
		return true;
	}
}
/*------------------------------正则验证------------------------------*/



/*------------------------------用户名验证------------------------------*/
function usernameValidate()
{
	var username = $("#InputUsername").val();
    if (username == "") {
    	Messenger().post({ message: "用户名不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
    }
    $.ajax({
        url: '/WebService.asmx/UserExist',
        contentType: "application/json",
        data: '{username:"' + username + '"}',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.d) {
                Messenger().post({ message: "用户名已经存在！", showCloseButton: true, hideAfter: 5, type: "error" });
                return false;
            }
        }
    });
    return true;
}
/*------------------------------用户名验证------------------------------*/



/*------------------------------密码验证------------------------------*/
function pwdValidate()
{
	var pwd = $("#InputPassword1").val();
	if(pwd=="")
	{
        Messenger().post({ message: "密码不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
	    return false;
    }
	else if(pwd.length<6||pwd.length>16)
	{
        Messenger().post({ message: "密码长度应为6-16位！", showCloseButton: true, hideAfter: 5, type: "error" });
	    return false;
    }
    return true;
}
/*------------------------------密码验证------------------------------*/



/*------------------------------确认密码验证------------------------------*/
function repwdValidate()
{
	var repwd = $("#InputPassword2").val();
	var pwd= $("#InputPassword1").val();
	if(pwd=="")
	{
        Messenger().post({ message: "确认密码不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
	    return false;
    }
	else if(repwd!=pwd)
	{
        Messenger().post({ message: "与密码不一致！", showCloseButton: true, hideAfter: 5, type: "error" });
	    return false;
    }
    return true;
}
/*------------------------------确认密码验证------------------------------*/



/*------------------------------真实姓名验证------------------------------*/
function nameValidate()
{
	var name = $("#InputName").val();
	var reg=/^[\u4e00-\u9fa5]+$/;
	if(name=="")
	{
        Messenger().post({ message: "真实姓名不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
	    return false;
    }
	else if(!regularValidate(reg,name))
	{
        Messenger().post({ message: "真实姓名应为中文！", showCloseButton: true, hideAfter: 5, type: "error" });
	    return false;
    }
    return true;
}
/*------------------------------真实姓名验证------------------------------*/



/*------------------------------身份证验证------------------------------*/
function idcardValidate()
{
	var idcard = $("#InputIDCard").val();
	var reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if(idcard=="")
	{
        Messenger().post({ message: "身份证不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
	    return false;
    }
	else if(!regularValidate(reg,idcard))
	{
        Messenger().post({ message: "请输入正确的身份证号码！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
	}
    return true;
}
/*------------------------------身份证验证------------------------------*/



/*------------------------------QQ验证------------------------------*/
function qqValidate()
{
	var qq = $("#InputQQ").val();
	var reg=/^[1-9][0-9]{4,}$/;
	if(qq=="")
	{
        Messenger().post({ message: "QQ号码不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
	}
	else if(!regularValidate(reg,qq))
	{
        Messenger().post({ message: "请输入正确的QQ号码！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
	}
    return true;
}
/*------------------------------QQ验证------------------------------*/



/*------------------------------邮箱验证------------------------------*/
function emailValidate()
{
	var email = $("#InputEmail1").val();
	var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	if(email=="")
	{
        Messenger().post({ message: "邮箱不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
	}
	else if(!regularValidate(reg,email))
	{
        Messenger().post({ message: "请输入正确的邮箱！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
	}
    return true;
}
/*------------------------------/邮箱验证------------------------------*/



/*------------------------------手机号验证------------------------------*/
function mobileValidate()
{
	var mobile = $("#InputMobile").val();
	var reg=/^0?(13|15|17|18|14)[0-9]{9}$/;
	if(mobile=="")
	{
        Messenger().post({ message: "手机号不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
	}
	else if(!regularValidate(reg,mobile))
	{
        Messenger().post({ message: "请输入正确的手机号！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
	}
    return true;
}
/*------------------------------手机号验证------------------------------*/



/*------------------------------职称验证------------------------------*/
function postValidate() {
    var post = $("#InputPost").val();
    if (post == "") {
        Messenger().post({ message: "职称不能为空！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
    }
    return true;
}
/*------------------------------职称验证------------------------------*/



/*------------------------------项目组验证------------------------------*/
function ProTeamValidate() {
    if ($('#e1').val() == "") {
        Messenger().post({ message: "请先选择项目组！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
    }
    return true;
}
/*------------------------------项目组验证------------------------------*/



/*------------------------------田块申请------------------------------*/
function btnApplyClick() {
    $("#btnApply").on('click', function () {
        if (BaseValidate() && FuncAreaValidate() && BlockValidate() && FieldValidate() && DataRangeValidate()) {
            var start=new Date($("#app_startdate").val());
            var end=new Date($("#app_enddate").val());
            $.ajax({
                url: '/WebService.asmx/FieldApplication',
                contentType: "application/json",
                data: '{"fieldid":"' + $("#e6").val() + '" ,"start":"' + moment(start).format("YYYY-MM-DD") +'","end":"'+moment(end).format("YYYY-MM-DD")+'"}',
                type: "POST",
                dataType: "json",
                success: function () {
                    //$('#myModal').modal('show');
                    //$('#myModal').on('hide.bs.modal', function (e) {
                    //    location.href = "/product/Index.aspx";
                    //})
                    layer.alert('申请成功!请耐心等待审核!', { icon: 1 }, function (index) {
                        layer.close(index);
                        location.href = "/product/Index.aspx";
                    });
                }
            });
        }
    });
}
/*------------------------------田块申请------------------------------*/



/*------------------------------基地验证------------------------------*/
function BaseValidate() {
    if ($("#e3").val() == "") {
        $("#errorBar").html("请选择基地!");
        $("#errorBar").show();
        return false;
    }
    else {
        return true;
    }
}
/*------------------------------基地验证------------------------------*/



/*------------------------------功能区验证------------------------------*/
function FuncAreaValidate() {
    if ($("#e4").val() == "") {
        $("#errorBar").html("请选择功能区!");
        $("#errorBar").show();
        return false;
    }
    else {
        return true;
    }
}
/*------------------------------功能区验证------------------------------*/



/*------------------------------地块验证------------------------------*/
function BlockValidate() {
    if ($("#e5").val() == "") {
        $("#errorBar").html("请选择地块!");
        $("#errorBar").show();
        return false;
    }
    else {
        return true;
    }
}
/*------------------------------地块验证------------------------------*/



/*------------------------------田块验证------------------------------*/
function FieldValidate() {
    if ($("#e6").val() == "") {
        $("#errorBar").html("请选择田块!");
        $("#errorBar").show();
        return false;
    }
    else {
        return true;
    }
}
/*------------------------------田块验证------------------------------*/



/*------------------------------田块申请时长验证------------------------------*/
function DataRangeValidate(){
    var startdate=new Date($("#app_startdate").val());
    var enddate=new Date($("#app_enddate").val());
    alert(((enddate.getTime()-startdate.getTime())/3600/24/1000)>=365);
    if(((enddate.getTime()-startdate.getTime())/3600/24/1000)>=365){
        return true;
    }
    else{
        $("#errorBar").html("最少期限为1年!");
        $("#errorBar").show();
        return false;
    }
}
/*------------------------------田块申请时长验证------------------------------*/



/*------------------------------修改用户个人信息------------------------------*/
function btnUpdateClick() {
    $("#btnUpdate").on("click", function () {
        if (qqValidate() && emailValidate() && mobileValidate()) {
            $.ajax({
                url: '/WebService.asmx/UpdatePersonalInfo',
                contentType: "application/json",
                data: '{QQ:"' + $('#InputQQ').val() + '",Email:"' + $('#InputEmail1').val() + '",Phone:"' + $('#InputMobile').val() + '",Remark:"' +HtmlUtil.htmlEncodeByRegExp($('#InputRemark').val()) +'"}',
                type: "POST",
                dataType: "json",
                success: function () {
                    //$('#myModal').modal('show');
                    //$('#myModal').on('hide.bs.modal', function (e) {
                    //    location.href = "/product/Index.aspx";
                    //})
                    layer.alert('修改成功！', { icon: 1 }, function (index) {
                        layer.close(index);
                        location.href = "/product/Index.aspx";
                    });
                },
                error: function () {
                    layer.alert("修改失败！");
                }
            });
        }
    });
}
/*------------------------------修改用户个人信息------------------------------*/



/*------------------------------文章标题验证------------------------------*/
function TitleValidate() {
    var title = $("#title").val();
    if (title.length < 5 || title.length >50) {
        Messenger().post({ message: "文章标题长度应在5到50个字之间!", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
    }
    return true;
}
/*------------------------------文章标题验证------------------------------*/



/*------------------------------文章简介验证------------------------------*/
function SummaryValidate() {
    var summary = $("#summary").val();
    if (summary.length < 10 || summary.length > 50) {
        Messenger().post({ message: "文章简介长度应在10到50个字之间!", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
    }
    return true;
}
/*------------------------------文章简介验证------------------------------*/



/*------------------------------文章内容验证------------------------------*/
function EditValidate() {
    var count = UE.getEditor('editor').getContentTxt().length;
    if (count < 10 || count > 5000) {
        Messenger().post({ message: "文章内容长度应在10到5000个字之间!", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
    }
    return true;
}
/*------------------------------文章内容验证------------------------------*/

/*------------------------------文章分类验证------------------------------*/
function ClassifyValidate() {
    if ( $('#classify').val()=="") {
        Messenger().post({ message: "文章分类不能为空!", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
    }
    return true;
}
/*------------------------------文章分类验证------------------------------*/

/*------------------------------滑动验证------------------------------*/
var sliderV=false;
function SliderValidate(){
    if(!sliderV){
        Messenger().post({ message: "重合两点完成验证！", showCloseButton: true, hideAfter: 5, type: "error" });
        return false;
    }
    else{
        return true;
    }
}
function SliderValidateInit(){
    $('.nstSlider').nstSlider({
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            if(leftValue==rightValue){
                alert("验证成功");
                $(".nstSlider").nstSlider('teardown');
                sliderV=true;
            }
        },
    });
}
/*------------------------------滑动验证------------------------------*/

function NotEmpty(str){
    return !(!str);
}
function IsFloat(str){
    return regularValidate(/^\d+(\.\d+)?$/,str);
}
var HtmlUtil = {
    /*1.用正则表达式实现html转码*/
    htmlEncodeByRegExp: function (str) {
        var s = "";
        if (!str) return "";
        s = str.replace(/&/g, "&amp;");

        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        return s;
    },
    /*2.用正则表达式实现html解码*/
    htmlDecodeByRegExp: function (str) {
        var s = "";
        if (!str) return "";
        s = str.replace(/&amp;/g, "&");

        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        return s;
    }
};