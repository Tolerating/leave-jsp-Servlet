
function GetBase() {//获取所有基地
    $.ajax({
        url: '/WebService.asmx/GetAllBase',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        success: function (data) {
            var baseoption = '<option value=""></option>';
            var bases = jQuery.parseJSON(data.d);
            $(bases).each(function () {
                baseoption += '<option value="' + $(this)[0].BaseID + '">' + $(this)[0].BaseName + '</option>';
            });
            $("#e3").html(baseoption);
        },
        error: function () {
            alert("error");
        }
    });
}

function GetProTeam() {//获取所有项目组
    $.ajax({
        url: '/WebService.asmx/GetAllProTeam',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        success: function (data) {
            var proteamoption = "";
            var proteams = jQuery.parseJSON(data.d);
            $(proteams).each(function () {
                proteamoption += '<option value="' + $(this)[0].ProjectTeamID + '">' + $(this)[0].ProjectTeamName + '</option>';
            });
            $("#e1").append(proteamoption);
        },
        error: function () {
            alert("error");
        }
    });
}
function GetPerosonalInfo() {//获取用户个人信息
    $.ajax({
        url: '../WebService.asmx/GetPersonalInfo',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        success: function (data) {
            var user = jQuery.parseJSON(data.d);
            $("#UserName").html(user.UserName);
            $("#UserRealName").html(user.UserRealName);
            $("#UserPost").html(user.UserPost);
            $("#UserIDCard").html(user.UserIDCard);
            $("#InputQQ").val(user.UserQQ);
            $("#InputEmail1").val(user.UserEmail);
            $("#InputMobile").val(user.UserPhone);
            $("#InputRemark").val(HtmlUtil.htmlDecodeByRegExp(user.UserRemark));
        }
    });
}
function GetExperts() {//获取所有专家信息
    $.ajax({
        url: '/WebService.asmx/GetExperts',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        success: function (data) {
            var experts = jQuery.parseJSON(data.d);
            var expertoption = "";
            var site = "";
            var staff = "";
            site = "<ul class='list-unstyled'><li><a href='#'>泰安市岱岳区马庄镇服务点</a></li></ul>";
            staff = "<ul class='list-unstyled'><li><a class='color-green hover-red' href='#'>武同华</a> <span class='color-gray'>高级农艺师</span></li></ul>";
            $(experts).each(function () {
                expertoption += '<div class="col-lg-3 col-md-4 col-sm-3 col-xs-6"><div class="text-center"><a href="product/Expert.aspx?expertID=' + $(this)[0].ExpertID + '"><img   width="60" height="80" src="img/expert/' + $(this)[0].ExperImg + '.jpg" /></a></div><div class="text-center"><span class="color-green hover-red">' + $(this)[0].ExpertName + '</span><span class="color-gray">' + $(this)[0].ExpertOccupation + '</span></div></div>';
            });
            var str = "";
            str += '<div class="col-md-4 box-container ui-sortable"><div class="box border green"><div class="box-title">';
            str += '<h4><i class="fa fa-bars"></i> <span>基层站点</span></h4>';
            str += '<a href="#" class="pull-right">更多>></a></div>';
            str += '<div class="box-body">' + site + '</div></div></div>';

            str += '<div class="col-md-4 box-container ui-sortable"><div class="box"><div class="box-title">';
            str += '<h4><i class="fa fa-bars"></i> <span>专家信息</span></h4>';
            str += '<a href="#" class="pull-right">更多>></a></div>';
            str += '<div class="box-body">' + expertoption + '</div></div></div>';

            str += '<div class="col-md-4 box-container ui-sortable"><div class="box border green"><div class="box-title">';
            str += '<h4><i class="fa fa-bars"></i> <span>基层专家及信息员</span></h4>';
            str += '<a href="#" class="pull-right">更多>></a></div>';
            str += '<div class="box-body">' + staff + '</div></div></div>';
            $("#expertinfo").html(str);
        },
        error: function () {
            alert("error");
        }
    });
}
function GetQueryString(name) {//根据字段获取url的参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function GetExpertByID() {//获取专家信息
    var expertID = GetQueryString("expertID");
    if (expertID > 0) {
        $.ajax({
            url: '/WebService.asmx/GetExpertByID',
            data: '{ExpertID:"' + expertID + '"}',
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            success: function (data) {
                var expert = jQuery.parseJSON(data.d);
                var experttable = '<table class="table table-bordered" style="width:90%; margin:0 auto 0 auto">';
                experttable += '<tr><td>姓名：</td><td>' + expert.ExpertName + '</td><td>职称职务：</td><td></td><td rowspan="3"><img UserID=' + expert.UserID + ' src="/img/expert/' + expert.ExpertImg + '.jpg"</td></tr>';
                experttable += '<tr><td>学历：</td><td></td><td>政治面貌：</td><td></td></tr>';
                experttable += '<tr><td>联系方式：</td><td>' + expert.ExpertPhone + '</td><td>E-Mail：</td><td>' + expert.ExpertEmail + '</td></tr>';
                experttable += '<tr><td>工作单位：</td><td colspan="4"></td></tr>';
                experttable += '<tr><td>备注</td><td colspan="4">' + expert.ExpertRemark + '</td></tr></table>';
                $("#expert").html(experttable);
            },
            error: function () {
                alert("error");
            }
        });
    }
    else {
        alert("出错了");
    }
}
function GetUserByID(UserID) {//通过用户ID获取用户信息
    var user;
    if (UserID > 0) {
        $.ajax({
            url: '/WebService.asmx/GetPersonalByID',
            data: '{UserID:"' + UserID + '"}',
            async: false,
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            success: function (data) {
                user = jQuery.parseJSON(data.d);
            },
            error: function () {
                alert("error");
            }
        });
        return user;
    }
    else {
        alert("出错了");
    }
}
function GetFieldAllocationByID(FieldID) {//通过田块ID获取田块分配信息
    var FieldAllocation;
    if (FieldID > 0) {
        $.ajax({
            url: '/WebService.asmx/GetFieldAllocationByID',
            data: '{FieldID:"' + FieldID + '"}',
            async: false,
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            success: function (data) {
                FieldAllocation = jQuery.parseJSON(data.d);
            },
            error: function () {
                alert("error");
            }
        });
        return FieldAllocation;
    }
    else {
        alert("出错了");
    }
}
function GetProductByID(ProductID) {//通过品种ID获取品种信息
    var Product;
    if (ProductID > 0) {
        $.ajax({
            url: '/WebService.asmx/GetProductByID',
            data: '{ProductID:"' + ProductID + '"}',
            async: false,
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            success: function (data) {
                Product = jQuery.parseJSON(data.d);
            },
            error: function () {
                alert("error");
            }
        });
        return Product;
    }
    else {
        alert("出错了");
    }
}
function GetFieldByID() {//获取田块信息
    var FieldID = GetQueryString("FieldID");
    if (FieldID > 0) {
        $.ajax({
            url: '/WebService.asmx/GetFieldByID',
            data: '{FieldID:"' + FieldID + '"}',
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            success: function (data) {
                var Field = jQuery.parseJSON(data.d);
                var str;
                str = "<table class='table table-striped'><tr><td>田块名称</td><td>" + Field.FieldName + "</td><td>田块面积</td><td>" + Field.FieldArea + "</td></tr>";
                if (Field.UserID != null) {
                    var user = GetUserByID(Field.UserID);
                    var FieldAllocation = GetFieldAllocationByID(Field.FieldID);
                    str += "<tr><td>申请人</td><td>" + user.UserName + "</td><td>申请时间</td><td>" + moment(FieldAllocation.FieldAllocationStartDate).format("YYYY-MM-DD HH:mm:ss") + "-" + moment(FieldAllocation.FieldAllocationEndDate).format("YYYY-MM-DD HH:mm:ss") + "</td></tr>";
                }
                var Product = GetProductByID(Field.VarietiesID);
                str += "<tr><td>种植品种</td><td>" + Product.ProductName + "</td><td>种植时间</td><td>" + moment(Field.FieldPlantDate).format("YYYY-MM-DD HH:mm:ss") + "</td></tr>";
                str += "<tr><td>品种产量</td><td>" + Product.ProductOutput + "</td><td>生长周期</td><td>" + Product.ProductGrowthCycle + "</td></tr>";
                str += "<tr><td>土壤湿度</td><td>" + Field.FieldSoilHumidity + "</td><td>田块肥料</td><td>" + Field.FieldFertilizer + "</td></tr>";
                str += "<tr><td>田块信息</td><td colspan='3'>" + Field.FieldRemark + "</td></tr></table>";
                $("#Field").html(str);
            },
            error: function () {
                alert("error");
            }
        });
    }
    else {
        alert("出错了");
    }
}
function GetProduct() {//初始化产品数据
    $(".prod").on("click", function () {
        $("#layer img").attr("src", "img/product/" + $(this).attr("title") + ".JPG");
        var proName = $(this).attr("title");
        $.getJSON("product/productinfo.json", function (data) {
            $(data.pro).each(function () {
                if ($(this)[0].ChineseName == proName) {
                    $("#layer p").html($(this)[0].Introduction);
                    var table = "<tr><td>中文学名</td><td>" + $(this)[0].ChineseName + "</td><td>温度</td><td>" + $(this)[0].Temperature + "</td></tr>";
                    table += "<tr><td>拉丁学名</td><td>" + $(this)[0].LatinName + "</td><td>光照</td><td>" + $(this)[0].Illumination + "</td></tr>";
                    table += "<tr><td>水分</td><td>" + $(this)[0].WaterContent + "</td><td>土质</td><td>" + $(this)[0].Soil + "</td></tr>";
                    table += "<tr><td>分布</td><td colspan='3'>" + $(this)[0].Distribution + "</tr>";
                    $("#layer table").html(table);
                    return false;
                }
            });
        });
        layer.open({
            type: 1,
            area: ['500px', '500px'],
            skin: 'layui-layer-molv', //样式类名
            shift: 0, //显示样式
            shadeClose: true, //开启遮罩关闭
            title: $(this).attr("title"),
            content: $('#layer')
        });
    });
}
function GetArticleTop6(typeID, divID) {//查找最新发布的6条新闻
    $.ajax({
        url: '/WebService.asmx/GetArticleTop6ByID',
        contentType: "application/json",
        data: '{typeID:' + typeID + '}',
        type: "POST",
        dataType: "json",
        success: function (data) {
            var news = jQuery.parseJSON(data.d);
            var expertoption = "";
            $(news).each(function () {
                var title = HtmlUtil.htmlDecodeByRegExp($(this)[0].ArticleTitle);
                if (title.length > 15) {
                    title = title.substring(0, 15) + '……';
                }
                expertoption += '<li><a style="color:' + $(this)[0].ArticleTitleColor + '" href="/product/Article.aspx?ID=' + $(this)[0].ArticleID + '">' + title + '</a><span style="float:right">[' + moment($(this)[0].ArticlePublicDate).format("YYYY-MM-DD") + ']</span></li>';
            });
            $(divID).html("<ul class='list-unstyled'>" + expertoption + "</ul>");
        },
        error: function () {
            alert("error");
        }
    });
}
function GetArticleByID() {//获取新闻信息
    var ArticleID = GetQueryString("ID");
    if (ArticleID > 0) {
        $.ajax({
            url: '/WebService.asmx/getArticleByID',
            data: '{ArticleID:"' + ArticleID + '"}',
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            success: function (data) {
                var Article = jQuery.parseJSON(data.d);
                var str = "<h2 class='text-center' style='color:" + Article.ArticleTitleColor + "'>" + HtmlUtil.htmlDecodeByRegExp(Article.ArticleTitle) + "</h2><br/>";
                str += "<h5 class='text-center'>发布时间：" + moment(Article.ArticlePublicDate).format("YYYY-MM-DD HH:mm:ss") + "  作者：" + Article.ArticleAuthor + "</h5><hr>";
                content = (HtmlUtil.htmlDecodeByRegExp(Article.ArticleContent)).toString().substring(5);
                content1 = content.substr(0, content.length - 6);
                str += HtmlUtil.htmlDecodeByRegExp(content1);
                $("#Article").html(str);
                $.ajax({
                    url: '/WebService.asmx/UpdateArticleClick',
                    data: '{ArticleID:' + ArticleID + ',ArticleClick:' + (Article.ArticleClick + 1) + '}',
                    contentType: "application/json",
                    type: "POST",
                    dataType: "json",
                    success: function () {
                    },
                    complete: function (XHR, TS) { XHR = null }
                });
            },
            complete: function (XHR, TS) { XHR = null }
        });
    }
    else {
        location.href = "/HomePage.aspx";
    }
}
function GetArticleByCondition(num, TotalCount, condition, typeid, order, sort) {//根据条件获取新闻
    var index = 0;
    var count = 0;
    $.ajax({
        url: '/WebService.asmx/GetArticleByCondition',
        data: '{num:"' + num + '",TotalCount:"' + TotalCount + '",condition:"' + condition + '",typeid:"' + typeid + '",order:"' + order + '",sort:"' + sort + '"}',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            var NewsList = $.parseJSON(data.d);
            var newsoption = "";
            $(NewsList).each(function () {
                count++;
                index = $(this)[0].ArticleID;
                newsoption += '<div class="newsborder">';
                newsoption += '<div  class="clickrate pull-right">点击量' + $(this)[0].ArticleClick + '</div>';
                newsoption += '<div class="inl">';
                newsoption += '<a class="tar h4" href="/product/Article.aspx?ID=' + $(this)[0].ArticleID + '"><span style="color:' + $(this)[0].ArticleTitleColor + '">' + HtmlUtil.htmlDecodeByRegExp($(this)[0].ArticleTitle) + '</span></a>';
                newsoption += '<div class="tar">';
                newsoption += '<a href="#" class="newsauthor">' + $(this)[0].ArticleAuthor + '</a>&nbsp;&nbsp;&nbsp';
                newsoption += '<p class="newsdate">' + moment($(this)[0].ArticleUpdateDate).format("YYYY-MM-DD HH:mm:ss") + '</p></div></div>';
                newsoption += '<span class="bl">' + $(this)[0].ArticleSynopsis + '</span></div>';
            });
            $("#contain").append(newsoption);
        },
        error: function () {
            alert("error");
        }
    });
    return count;
}
function haveSession() {//判断session是否存在
    $.ajax({
        url: '/WebService.asmx/haveSession',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                $('#btn_login').remove();
                $('#navbar').append('<a href="product/Index.aspx"><span class="navbar-brand">' + data.d + '</span><a/>');
            }
        },
        complete: function (XHR, TS) { XHR = null }
    });
}
function getweather() {//获取天气信息
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        url: '/WebService.asmx/getWeather',
        success: function (data) {
            var aData = JSON.parse(data.d);
            $('#wsd').text("温州:" + aData.wendu + "/" + aData.shidu);

            if (aData.baitian != aData.wanshang) {
                $('#weather').text(aData.baitian + "转" + aData.wanshang);
                $('#weather_img1').attr("Src", "/manager/image/day/" + aData.baitian_style + ".png");
                $('#weather_img2').attr("Src", "/manager/image/night/" + aData.wanshang_style.substring(0, 5) + ".png");
            }
            else {
                $('#weather').text(aData.baitian);
                $('#weather_img1').attr("Src", "/manager/image/day/" + aData.baitian_style + ".png");
            }
        }
    });
}
function GetTime() {//获取时间
    var mon, day, now, hour, min, ampm, time, str, tz, end, beg, sec;
    mon = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月");
    day = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    now = new Date();
    hour = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    $("#datetime").html(day[now.getDay()] + " " + now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + hour
                        + ":" + min + ":" + sec);
}
function getNodeAll() {//获取所有节点
    $.ajax({
        url: '/WebService.asmx/getNodeAll',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        success: function (data) {
            var nodes = jQuery.parseJSON(data.d).nodes;
            var nodeoption = '<option value=""></option>';
            var temp;
            $(nodes).each(function () {
                temp = $(this)[0].remark.substring(0, 4);
                if (temp == "数据节点") {
                    nodeoption += '<option value="' + $(this)[0].id + '">' + $(this)[0].remark + '(' + $(this)[0].id + ')</option>';
                }
            });
            $("#nodes_select_charts").html(nodeoption);
            $("#nodes_select_charts").select2({
                placeholder: '请选择节点',
                language: 'zh-CN',
                width: '100%'

            });
        },
        error: function () {
            alert("error");
        }
    });
}
function getChannelByNodeID(NodeID) {//根据节点编号获取通道
    $.ajax({
        url: '/WebService.asmx/sensor',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        success: function (data) {//获取传感器类型列表
            var sensor = jQuery.parseJSON(data.d).sensors;
            $.ajax({
                url: '/WebService.asmx/getNode',
                data: '{nodeid:"' + NodeID + '"}',
                contentType: "application/json",
                type: "POST",
                dataType: "json",
                success: function (data) {//根据节点编号获取通道
                    var channeloption = '<select id="channel_select_charts" class="select2"><option value=""></option>';
                    var node = jQuery.parseJSON(data.d);
                    $.each(node, function (key, value) {//对应传感器类型
                        if (key.search(/^channel\d+_type$/) != -1 && value != null) {
                            var channelid = parseInt(key.replace(/[^0-9]/ig, ""));
                            $(sensor).each(function () {
                                if ($(this)[0].name == value) {
                                    channeloption += '<option value="' + channelid + '">' + $(this)[0].remark + '(' + channelid + ')(' + $(this)[0].unit + ')</option>';
                                }
                            });
                        }
                    });
                    channeloption += '</select>';
                    //$("#channel").html(channeloption);
                    $("#nodes_select_charts").after(channeloption);
                    $("#channel_select_charts").select2({
                        placeholder: "请选择通道",
                        language: 'zh-CN'
                    });
                },
                error: function () {
                    alert("error");
                }
            });
        },
        error: function () {
            alert("error");
        }
    });
}
var products;
function getSProductAll() {//获取所有特色产品
    $.ajax({
        url: '/WebService.asmx/getSProductAll',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            products = jQuery.parseJSON(data.d);
            var productlist = "";
            $(products).each(function () {
                productlist += '<div class="category_' + this.ProductTypeID + ' item" style="margin:0 15px 0 0;" ><div class="filter-content">';
                productlist += '<img   width="202" height="150"  src="img/product/' + this.ProductImg + '.JPG" alt="" class="img-responsive" />';
                productlist += '<div class="hover-content" ><h4>点击查看</h4><div id="' + this.ProductID + '" name="' + this.ProductName + '" data-toggle="modal" data-target="#layer" class="btn btn-warning sprod" title="' + this.ProductName + '">';
                productlist += '<i class="fa fa-search-plus fa-1x"></i></div></div></div></div>';
            });
            $("#filter-items").html(productlist);
        },
        error: function () {
            alert("error");
        }
    });
}
function getProductTypeAll() {//获取所有特色产品分类
    $.ajax({
        url: '/WebService.asmx/getProductType',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            var type = jQuery.parseJSON(data.d);
            var productType = '<div class="hidden-xs"><a href="#" class="btn btn-default" data-filter="*">全部</a> ';
            var typeSelect = '<div class="visible-xs"><select id="type"><option value="*">全部</option>';
            var mycars = new Array("btn btn-info", "btn btn-danger", "btn btn-success", "btn btn-warning");
            var i = 0;
            $(type).each(function () {
                productType += '<a href="#" class="' + mycars[i % 3] + '" data-filter=".category_' + this.ProductID + '">' + this.ProductName + ' </a> ';
                typeSelect += ' <option value=".category_' + this.ProductID + '">' + this.ProductName + '</option>'
                i++;
            });
            productType += '</div>';
            typeSelect += '</select></div>';
            $('#filter-controls').append(productType);
            $('#filter-controls').append(typeSelect);
        },
        error: function () {
            alert("error");
        }
    });
}
 
function GetArticleType() {
    $.ajax({
        url: '/WebService.asmx/GetArticleType',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            type = jQuery.parseJSON(data.d);
            var typeselect = '<select id="typeSelect" class="visible-xs"><option value=""></option>';
            var typeli = '';
            $(type).each(function () {
                typeselect += '<option value="' + this.ArticleType2ID + '">' + this.ArticleType2Name + '</option>';
                typeli += '<li class="list-group-item"><span id="' + this.ArticleType2ID + '" class="pointer">' + this.ArticleType2Name + '</span></li>';
            });
            typeselect += '</select>';
            $("#selcontainer").html(typeselect);
            $("#typeSelect").select2({
                language: 'zh-CN',
                placeholder: "文章分类"
            });
            $("#typeList").html(typeli);
        },
        error: function () {
            alert("error");
        }
    });
}
function GetArticleTypeSelect() {
    $.ajax({
        url: '/WebService.asmx/GetArticleType',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            type = jQuery.parseJSON(data.d);
            var typeoption = '<option value="" ></option>';
            $(type).each(function () {
                typeoption += '<option value="' + this.ArticleType2ID + '">' + this.ArticleType2Name + '</option>';
            });
            $("#classify").html(typeoption);
            $("#classify").select2({
                language: 'zh-CN',
                placeholder: "请选择分类"
            });
        },
        error: function () {
            alert("error");
        }
    });
}
function GetUnverifiedUsers() {//获取未审核的用户
    $.ajax({
        url: '/WebService.asmx/GetUnverifiedUsers',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            var usertable = '<table id="unv_users" class="display" cellspacing="0" width="100%">';
            usertable += '<thead><tr><th>用户名</th><th>真实姓名</th><th>职位</th><th>身份证</th><th>手机号</th><th>QQ</th><th>电子邮箱</th><th>项目组编号</th><th>备注</th><th>审核</th></tr></thead>';
            usertable += '<tbody>';
            var users = jQuery.parseJSON(data.d);
            $(users).each(function () {
                usertable += '<tr id="user' + this.UserID + '"><td>' + this.UserName + '</td><td>' + this.UserRealName + '</td><td>' + this.UserPost + '</td><td>' + this.UserIDCard + '</td><td>' + this.UserPhone + '</td><td>' + this.UserQQ + '</td><td>' + this.UserEmail + '</td><td>' + this.ProjectTeamID + '</td><td>' + this.UserRemark + '</td><td class="UserCheck" style="width:13%"><div id="' + this.UserID + '" class="btn btn-primary admit">通&nbsp;&nbsp;过</div><div id="' + this.UserID + '" class="btn btn-warning deny">不通过</div></td></tr>';
            });
            usertable += '</tbody></table>';
            $("#user").html(usertable);

            $('#user-badge').html($('#unv_users').children('tbody').children().length);
            $("#unv_users tbody").on('click', "div.admit", function () {
                var selectedrow = $(this).parent('td').parent('tr');
                $.ajax({
                    url: '/WebService.asmx/AdmitUser',
                    data: '{UserID:"' + $(this).attr('id') + '"}',
                    contentType: "application/json",
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        table.row(selectedrow).remove().draw();
                        var badge = $('#user-badge').html();
                        $('#user-badge').html((badge - 1));
                        Messenger().post({
                            message: "审核操作成功！",
                            showCloseButton: true
                        });
                    },
                    error: function () {
                        alert("error");
                    }
                });
            });
            $("#unv_users tbody").on('click', "div.deny", function () {
                var selectedrow = $(this).parent('td').parent('tr');
                $.ajax({
                    url: '/WebService.asmx/DenyUser',
                    data: '{UserID:"' + $(this).attr('id') + '"}',
                    contentType: "application/json",
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        table.row(selectedrow).remove().draw();
                        var badge = $('#user-badge').html();
                        $('#user-badge').html((badge - 1));
                        Messenger().post({
                            message: "审核操作成功！",
                            showCloseButton: true
                        });
                    },
                    error: function () {
                        alert("error");
                    }
                });
            });

            var table = $('#unv_users').DataTable({
                colReorder: true,
                select: true,
                pageResize: true,
                responsive: true
            });
        },
        error: function () {
            alert("error");
        }
    });
}
function GetUnverifiedArticles() {//获取未审核的文章
    $.ajax({
        url: '/WebService.asmx/GetUnverifiedArticles',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            var artircletable = '<table id="unv_articles" class="display" cellspacing="0" width="100%">';
            artircletable += '<thead><tr><th>标题</th><th>类型编号</th><th>作者</th><th>简介</th><th>内容</th><th>审核</th></tr></thead>';
            artircletable += '<tbody>';
            var articles = jQuery.parseJSON(data.d);
            $(articles).each(function () {
                artircletable += '<tr><td><span style="color:' + this.ArticleTitleColor + '">' + HtmlUtil.htmlDecodeByRegExp(this.ArticleTitle) + '</span></td><td>' + this.ArticleType2ID + '</td><td>' + this.ArticleAuthor + '</td><td>' + this.ArticleSynopsis + '</td><td style="width:6%"><div id="' + this.ArticleID + '" class="btn btn-success article-content" title="' + this.ArticleTitle + '">查&nbsp;&nbsp;看</div></td><td class="ArticleCheck" style="width:13%"><div id="' + this.ArticleID + '" class="btn btn-primary admit">通&nbsp;&nbsp;过</div><div id="' + this.ArticleID + '" class="btn btn-warning deny">不通过</div></td></tr>';
            });
            artircletable += '</tbody></table>';
            $("#article").html(artircletable);

            $('#article-badge').html($('#unv_articles').children('tbody').children().length);
            $("#unv_articles tbody").on('click', "div.admit", function () {
                var selectedrow = $(this).parent('td').parent('tr');
                $.ajax({
                    url: '/WebService.asmx/AdmitArticle',
                    data: '{ArticleID:"' + $(this).attr('id') + '"}',
                    contentType: "application/json",
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        table.row(selectedrow).remove().draw();
                        var badge = $('#article-badge').html();
                        $('#article-badge').html((badge - 1));
                        Messenger().post({
                            message: "审核操作成功！",
                            showCloseButton: true
                        });
                    },
                    error: function () {
                        alert("error");
                    }
                });
            });
            $("#unv_articles tbody").on('click', "div.deny", function () {
                var selectedrow = $(this).parent('td').parent('tr');
                $.ajax({
                    url: '/WebService.asmx/DenyArticle',
                    data: '{ArticleID:"' + $(this).attr('id') + '"}',
                    contentType: "application/json",
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        table.row(selectedrow).remove().draw();
                        var badge = $('#article-badge').html();
                        $('#article-badge').html((badge - 1));
                        Messenger().post({
                            message: "审核操作成功！",
                            showCloseButton: true
                        });
                    },
                    error: function () {
                        alert("error");
                    }
                });
            });
            $("#unv_articles tbody").on('click', "div.article-content", function () {//添加文章查看事件
                var title = this.title;
                $.ajax({
                    url: '/WebService.asmx/getArticleById',
                    data: '{ArticleID:"' + this.id + '"}',
                    contentType: "application/json",
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        var article = jQuery.parseJSON(data.d);
                        var content = HtmlUtil.htmlDecodeByRegExp(article.ArticleContent);
                        $("#article-content").html(content);
                        layer.open({
                            type: 1,
                            area: ['500px', '500px'],
                            skin: 'layui-layer-lan', //样式类名
                            shift: 0, //显示样式
                            shadeClose: true, //开启遮罩关闭
                            title: '<span style="color:' + article.ArticleTitleColor + '">' + title + '</span>',
                            content: $('#article-content')
                        });
                    },
                    error: function () {
                        alert("error");
                    }
                });
            });
            var table = $('#unv_articles').DataTable({
                colReorder: true,
                select: true,
                pageResize: true,
                responsive: true
            });
        },
        error: function () {
            alert("error");
        }
    });
}
function GetUnverifiedFieldAllo() {//获取未审核的田块申请
    $.ajax({
        url: '/WebService.asmx/GetUnverifiedFieldAllo',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            var fa = jQuery.parseJSON(data.d);
            var faoption = '<table id="unv_fa" class="display" cellspacing="0" width="100%">';
            faoption += '<thead><tr><th>用户名</th><th>田块</th><th>开始日期</th><th>结束日期</th><th>备注</th><th>审核</th></tr></thead>';
            faoption += '<tbody>';
            $(fa).each(function () {
                faoption += '<tr><td>' + this.UserID + '</td><td>' + this.FieldID + '</td><td>' + moment(this.FieldAllocationStartDate).format("YYYY-MM-DD HH:mm:ss") + '</td><td>' + moment(this.FieldAllocationEndDate).format("YYYY-MM-DD HH:mm:ss") + '</td><td>' + this.FieldAllocationRemark + '</td><td class="FACheck" style="width:13%"><div id="' + this.FieldAllocationID + '" class="btn btn-primary admit">通&nbsp;&nbsp;过</div><div id="' + this.FieldAllocationID + '" class="btn btn-warning deny">不通过</div></td></tr>';
            });
            faoption += '</tbody></table>';
            $("#field").html(faoption);

            $('#field-badge').html($('#unv_fa').children('tbody').children().length);
            $("#unv_fa tbody").on('click', "div.admit", function () {
                var selectedrow = $(this).parent('td').parent('tr');
                $.ajax({
                    url: '/WebService.asmx/AdmitFA',
                    data: '{FAID:"' + $(this).attr('id') + '"}',
                    contentType: "application/json",
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        table.row(selectedrow).remove().draw();

                        var badge = $('#field-badge').html();
                        $('#field-badge').html((badge - 1));
                        Messenger().post({
                            message: "审核操作成功！",
                            showCloseButton: true
                        });
                    },
                    error: function () {
                        alert("error");
                    }
                });
            });
            $("#unv_fa tbody").on('click', "div.deny", function () {
                var selectedrow = $(this).parent('td').parent('tr');
                $.ajax({
                    url: '/WebService.asmx/DenyFA',
                    data: '{FAID:"' + $(this).attr('id') + '"}',
                    contentType: "application/json",
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        table.row(selectedrow).remove().draw();
                        var badge = $('#field-badge').html();
                        $('#field-badge').html((badge - 1));
                        Messenger().post({
                            message: "审核操作成功！",
                            showCloseButton: true
                        });
                    },
                    error: function () {
                        alert("error");
                    }
                });
            });
            var table = $('#unv_fa').DataTable({
                colReorder: true,
                select: true,
                pageResize: true,
                responsive: true
            });
        },
        error: function () {
            alert("error");
        }
    });
}
function GetHotArticle() {//获取焦点文章
    $.ajax({
        url: '/WebService.asmx/GetHotArticle',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            hot = jQuery.parseJSON(data.d);
            var hotli = '';
            $(hot).each(function () {
                hotli += '<li class="list-group-item a" name="' + this.ArticleID + '"><span class="pointer" style="color:' + this.ArticleTitleColor + '">' + HtmlUtil.htmlDecodeByRegExp(this.ArticleTitle) + '</span></li>';
            });
            $("#hot").html(hotli);
            $(".a").on("click", function () {
                location.href = "Article.aspx?ID=" + $(this).attr("name");
            });
        },
        error: function () {
            alert("error");
        }
    });
}
function GetProductTable() {
    $.ajax({
        url: '/WebService.asmx/getSProductAll',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            products = jQuery.parseJSON(data.d);
            var producttype = getProductType();
            var productstable = '<table id="ProsTable" class="display" cellspacing="0" width="100%">';
            var currenttype;
            productstable += '<thead><tr><th>图片</th><th>名称</th><th>种类</th><th>内容</th><th>编辑</th><th>删除</th></tr></thead><tbody>';
            $(products).each(function () {
                currenttype = this.ProductTypeID;
                $(producttype).each(function () {       //获取产品类型名称
                    if (currenttype == this.ProductID) {
                        currenttype = this.ProductName;
                        return false;
                    }
                });
                productstable += '<tr><td><img src="/img/product/' + this.ProductName + '.jpg" /></td><td>' + this.ProductName + '</td><td>' + currenttype + '</td><td style="width:6%"><div id="' + this.ProductID + '" name="' + this.ProductName + '" class="btn btn-info sprod">查&nbsp;&nbsp;看</div></td><td style="width:6%"><div id="' + this.ProductID + '" class="btn btn-primary EditProduct">编&nbsp;&nbsp;辑</div></td><td style="width:6%"><div id="' + this.ProductID + '" class="btn btn-danger DelProduct">删&nbsp;&nbsp;除</div></td></tr>';
            });
            productstable += '</tbody></table>';
            $("#ProsContainer").html(productstable);
            $("#ProsTable tbody").on('click', "div.EditProduct", function () {
                location.href = "EditProduct.aspx?id=" + $(this).attr("id");
            });
            $("#ProsTable tbody").on('click', "div.DelProduct", function () {
                var ProductID = $(this).attr("id");
                var selectedrow = $(this).parent('td').parent('tr');
                layer.confirm('您确定要删除此产品？', {
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    $.ajax({
                        url: '/WebService.asmx/deleteProduct',
                        data: '{ProductID:"' + ProductID + '"}',
                        contentType: "application/json",
                        type: "POST",
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            table.row(selectedrow).remove().draw();
                            layer.closeAll();
                        },
                        error: function () {
                            layer.closeAll();
                            alert("error");
                        }
                    });
                }, function () {
                });
            });
            $("#ProsTable tbody").on('click', "div.sprod", function () {
                var SProductID = $(this).attr("id");
                var SProductName = $(this).attr("name");
                $(products).each(function () {//遍历产品json
                    if (this.ProductID == SProductID) {
                        $("#layer img").attr("src", "/img/product/" + SProductName + ".JPG");
                        $("#layer p").html(HtmlUtil.htmlDecodeByRegExp(this.ProductIntroduction));
                        var table = "<tr><td>中文学名</td><td>" + this.ProductName + "</td><td>温度</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductTemperature) + "</td></tr>";
                        table += "<tr><td>土质</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductSoil) + "</td><td>光照</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductIllumination) + "</td></tr>";
                        table += "<tr><td>水分</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductWaterContent) + "</td><td>规格</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductSpecType) + "</td></tr>";
                        table += "<tr><td>生长周期</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductGrowthCycle) + "</td><td>产量</td><td>" + this.ProductOutput + "</td></tr>";
                        $("#layer table").html(table);
                        return false;
                    }
                });
                var width = $(window).width();
                var laywidth = "50%";
                if (width < 768) {
                    laywidth = "80%";
                }
                layer.open({
                    type: 1,
                    area: [laywidth, "80%"],
                    skin: 'layui-layer-molv', //样式类名
                    shift: 0, //显示样式
                    shadeClose: true, //开启遮罩关闭
                    title: SProductName,
                    content: $('#layer')
                });
                $(".layui-layer-molv").css("min-width", "300px");
            });
            var table = $('#ProsTable').DataTable({ select: true, pageResize: true, responsive: true, iDisplayLength: 5, aLengthMenu: [[5, 10, 20, 50, -1], ["每页5条", "每页10条", "每页20条", "每页50条", "所有"]] });
        },
        error: function () {
            alert("error");
        }
    });
}
function getProductType() {//获取产品类型json
    var pt;
    $.ajax({
        url: '/WebService.asmx/getProductType',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            pt = jQuery.parseJSON(data.d);
        },
        error: function () {
            alert("error");
        }
    });
    return pt;
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
function HtmlToStr(html) {
    var s = "";
    if (!html) return "";
    s = html.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    return s;
}
function GetCurrentBaseID() {//获取基地编号
    var baseid;
    $.ajax({
        url: '/WebService.asmx/GetCurrentBaseID',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            baseid = data.d;
        },
        error: function () {
            alert("error");
        }
    });
    return baseid;
}
function initBaseSVG(BaseID) {//初始化基地
    $('#canvas').css('background', 'url(/img/map/Base' + BaseID + '.jpg)');
    initFuncareaSVG(BaseID);
}
function initFuncareaSVG(BaseID) {//初始化功能区
    $.ajax({
        url: '/WebService.asmx/GetFuncareasByBaseID',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        data: '{BaseID:"' + BaseID + '"}',
        success: function (data) {
            var FuncArea = jQuery.parseJSON(data.d);
            var FuncAreaSVG = "";
            $(FuncArea).each(function () {
                FuncAreaSVG += '<polygon id="FA' + this.FuncAreaID + '" class="lightarea func" fill="green" points="' + this.FuncCoord + '" name="' + this.FuncAreaName + '"/>';
            });
            $('#canvas').html("<svg  width='1000px' height='707px'>" + FuncAreaSVG + "</svg>");
            $('polygon').on('mouseover', function () {
                $(this).css('opacity', 0.7);
            });
            $('polygon').on('mouseout', function () {
                $(this).css('opacity', 0.4);
            });
            $('.func').unbind("click");
            $('.func').on('click', function () {
                initBlockSVG((this.id).substring(2, (this.id).length));
            });
            $('.lightarea,func').qtip({ // Grab some elements to apply the tooltip to
                style: 'qtip-bootstrap',
                content: {
                    text: function (event, api) {
                        var CurrentFuncID = $(this).attr('id').substring(2, $(this).attr('id').length);
                        var CurrentFuncRemark = "";
                        $(FuncArea).each(function () {
                            if (this.FuncAreaID == CurrentFuncID) {
                                CurrentFuncRemark = this.FuncAreaRemark;
                                return 0;
                            }
                        });
                        return CurrentFuncRemark;
                    }
                },
                hide: {
                    event: 'unfocus click mouseleave'
                }
            });
        },
        error: function () {
            alert("error");
        }
    });
}
function initBlockSVG(FuncAreaID) {//初始化地块
    $.ajax({
        url: '/WebService.asmx/GetBlocksByFuncareaID',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        data: '{FuncareaID:"' + FuncAreaID + '"}',
        success: function (data) {
            var Block = jQuery.parseJSON(data.d);
            var BlockSVG = "";
            $('#canvas').css('background', 'url(/img/map/Block' + FuncAreaID + '.jpg)');
            $(Block).each(function () {
                BlockSVG += '<polygon id="BK' + this.BlockID + '" class="lightarea block" title="' + this.BlockRemark + '" fill="green" points="' + this.BlockCoord + '"/>';
            });
            $('#canvas').html("<svg  width='1000px' height='707px'>" + BlockSVG + "</svg>");
            $('polygon').on('mouseover', function () {
                $(this).css('opacity', 0.7);
            });
            $('polygon').on('mouseout', function () {
                $(this).css('opacity', 0.4);
            });
            $('.block').unbind("click");
            $('.block').on('click', function () {
                initFieldSVG((this.id).substring(2, (this.id).length));
            });
            $('.lightarea,block').qtip({ // Grab some elements to apply the tooltip to
                style: 'qtip-bootstrap',
                content: {
                    text: function (event, api) {
                        var CurrentBlockID = $(this).attr('id').substring(2, $(this).attr('id').length);
                        var CurrentBlockRemark = "";
                        $(Block).each(function () {
                            if (this.BlockID == CurrentBlockID) {
                                CurrentBlockRemark = this.BlockRemark;
                                return 0;
                            }
                        });
                        return CurrentBlockRemark;
                    }
                },
                hide: {
                    event: 'unfocus click mouseleave'
                }
            });
        },
        error: function () {
            alert("error");
        }
    });
}
var fas;
function getFieldAlloc() {//获取所有田块使用情况
    $.ajax({
        url: '/WebService.asmx/GetFieldAlloc',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            fas = ($.parseJSON(data.d));
        },
        complete: function (XHR, TS) { XHR = null }
    });
}
function initFieldSVG(BlockID) {
    $.ajax({
        url: '/WebService.asmx/GetFieldsByBlockID',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        data: '{BlockID:"' + BlockID + '"}',
        async: false,
        success: function (data) {
            var Field = jQuery.parseJSON(data.d);
            var FieldSVG = "";
            $('#canvas').css('background', 'url(/img/map/Q' + BlockID + '.jpg)');
            $(Field).each(function () {
                FieldSVG += '<polygon id="FD' + this.FieldID + '" class="lightarea field"';
                if (this.FieldAllocation == true) {
                    FieldSVG += ' fill="red" ';
                } else {
                    FieldSVG += ' fill="green" ';
                }
                FieldSVG += 'points="' + this.FieldCoord + '"/>';
                //FieldSVG += '<polygon id="FD' + this.FieldID + '" class="lightarea field" fill="green" points="' + this.FieldCoord + '"/>';
            });
            $('#canvas').html("<svg  width='1000px' height='707px'>" + FieldSVG + "</svg>");
            $('polygon').on('mouseover', function () {
                $(this).css('opacity', 0.7);
            });
            $('polygon').on('mouseout', function () {
                $(this).css('opacity', 0.4);
            });
            $('.field').unbind("click");
            $('.field').on('click', function () {
                browseField((this.id).substring(2, (this.id).length));
            });
            $('.lightarea,field').qtip({ // Grab some elements to apply the tooltip to
                style: 'qtip-bootstrap',
                content: {
                    text: function (event, api) {
                        var CurrentFieldID = $(this).attr('id').substring(2, $(this).attr('id').length);
                        var CurrentFieldRemark = "";
                        $(fas).each(function () {
                            if (this.FieldID == CurrentFieldID) {
                                CurrentFieldRemark = "田块名称:" + this.FieldName + "<br/>使用人:" + this.UserName + "<br/>起始日期:" + moment(this.FieldAllocationStartDate).format("YYYY-MM-DD HH:mm:ss") + "<br/>结束日期:" + moment(this.FieldAllocationEndDate).format("YYYY-MM-DD HH:mm:ss");
                                return 0;
                            }
                        });
                        if (CurrentFieldRemark == "") {
                            var CurrentFieldName = "";
                            $(Field).each(function () {
                                if (this.FieldID == CurrentFieldID) {
                                    CurrentFieldName = this.FieldName;
                                    return 0;
                                }
                            });
                            CurrentFieldRemark = "田块名称:" + CurrentFieldName + "<br/>未使用";
                        }
                        return CurrentFieldRemark;

                    }
                },
                hide: {
                    event: 'unfocus click mouseleave'
                }
            });
        },
        error: function () {
            alert("error");
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function initBase_FA(BaseID) {//初始化基地图片和下拉框 田块申请
    $('#canvas').css('background', 'url(/img/map/Base' + BaseID + '.jpg)');
    initFuncarea_FA(BaseID);
}
function initFuncarea_FA(BaseID) {//初始化功能区高亮和下拉框 田块申请
    $.ajax({
        url: '/WebService.asmx/GetFuncareasByBaseID',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        data: '{BaseID:"' + BaseID + '"}',
        success: function (data) {
            var FuncArea = jQuery.parseJSON(data.d);
            //SVG
            var FuncAreaSVG = "";
            $(FuncArea).each(function () {
                FuncAreaSVG += '<polygon id="' + this.FuncAreaID + '" class="lightarea Func" fill="green" points="' + this.FuncCoord + '" name="' + this.FuncAreaName + '"/>';
            });
            $('#canvas').html("<svg  width='1000px' height='707px'>" + FuncAreaSVG + "</svg>");
            $('polygon').on('mouseover', function () {
                $(this).css('opacity', 0.7);
            });
            $('polygon').on('mouseout', function () {
                $(this).css('opacity', 0.4);
            });
            $('.Func').unbind("click");
            $('.Func').on('click', function () {
                //initBlock_FA(this.id);
                $('#e4').val(this.id).trigger("change");
            });

            $('.lightarea,Func').qtip({ // Grab some elements to apply the tooltip to
                style: 'qtip-bootstrap',
                content: {
                    text: function (event, api) {
                        var CurrentFuncID = $(this).attr('id');
                        var CurrentFuncRemark = "";
                        $(FuncArea).each(function () {
                            if (this.FuncAreaID == CurrentFuncID) {
                                CurrentFuncRemark = this.FuncAreaRemark;
                                return 0;
                            }
                        });
                        return CurrentFuncRemark;
                    }
                },
                show: {
                    solo: true
                },
                hide: {
                    event: 'unfocus click mouseleave'
                }
            });

            //select2
            $("#e3").next().remove();
            var funcareaoption = '<div><p></p><span class="label label-default">功能区</span><p></p><div><select id="e4" class="select2 block"><option value=""></option></div>';
            $(FuncArea).each(function () {
                funcareaoption += '<option value="' + $(this)[0].FuncAreaID + '">' + $(this)[0].FuncAreaName + '</option>';
            });
            funcareaoption += '</select></div><p></p>';
            $("#e3").after(funcareaoption);
            App.init();
            $("#e4").on('change', function () {
  
                $('*').qtip('destroy', true);
                $("#errorBar").hide();
                initBlock_FA($("#e4").val());
            });
        },
        error: function () {
            alert("funcerror");
        }
    });
}
function initBlock_FA(FuncAreaID) {//初始化地块高亮和下拉框 田块申请
    $.ajax({
        url: '/WebService.asmx/GetBlocksByFuncareaID',
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        data: '{FuncareaID:"' + FuncAreaID + '"}',
        success: function (data) {
            var Block = jQuery.parseJSON(data.d);
            //SVG
            var BlockSVG = "";
            $('#canvas').css('background', 'url(/img/map/Block' + FuncAreaID + '.jpg)');
            $(Block).each(function () {
                BlockSVG += '<polygon id="' + this.BlockID + '" class="lightarea Block" title="' + this.BlockRemark + '" fill="green" points="' + this.BlockCoord + '"/>';
            });
            $('#canvas').html("<svg  width='1000px' height='707px'>" + BlockSVG + "</svg>");
            $('polygon').on('mouseover', function () {
                $(this).css('opacity', 0.7);
            });
            $('polygon').on('mouseout', function () {
                $(this).css('opacity', 0.4);
            });
            $('.Block').unbind("click");
            $('.Block').on('click', function () {
                //initField_FA(this.id);
                $('#e5').val(this.id).trigger("change");
            });
            $('.lightarea,Block').qtip({ // Grab some elements to apply the tooltip to
                style: 'qtip-bootstrap',
                content: {
                    text: function (event, api) {
                        var CurrentBlockID = $(this).attr('id');
                        var CurrentBlockRemark = "";
                        $(Block).each(function () {
                            if (this.BlockID == CurrentBlockID) {
                                CurrentBlockRemark = this.BlockRemark;
                                return 0;
                            }
                        });
                        return CurrentBlockRemark;
                    }
                },
                show: {
                    solo: true
                },
                hide: {
                    event: 'unfocus click mouseleave'
                }
            });

            //select2
            $("#e4").next().remove();
            var blockoption = '<div><p></p><span class="label label-default">地块</span><p></p><div><select id="e5" class="select2 block"><option value=""></option></div>';
            var blocks = jQuery.parseJSON(data.d);
            $(blocks).each(function () {
                blockoption += '<option value="' + $(this)[0].BlockID + '">' + $(this)[0].BlockName + '</option>';
            });
            blockoption += '</select></div><p></p>'
            $("#e4").after(blockoption);
            App.init();
            $("#e5").on('change', function () {
                $('*').qtip('destroy', true);
                $("#errorBar").hide();
                initField_FA($("#e5").val());
            });
        },
        error: function () {
            alert("blockerror");
        }
    });
}
function GetArticleCommentByID(start) {//获取新闻留言信息
    var count = 0;
    var ArticleID = GetQueryString("ID");
    if (ArticleID > 0) {

        $.ajax({
            url: '/WebService.asmx/GetCommentAll', //url: '/WebService.asmx/SelectAllByArticleID',
            //            data: '{id:' + ArticleID + '}', //
            data: '{id:' + ArticleID + ',start:' + start + '}',
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            async: false,
            success: function (data) {
                //返回的数据用data.d获取内容  
                var Comment = $.parseJSON(data.d);
                var cout = Comment.length; //获得数据条数，一公有多少条留言
                $("#lycontentcount").html(cout); //赋值给<span id="lycontentcount"><span/>              
                var str = "";
                $(Comment).each(function () {
                    count++;

                    str += '<div class="newsComment"style=" text-align:left;">';
                    str += HtmlUtil.htmlDecodeByRegExp($(this)[0].CommentContent);
                    str += "<h5 class='text-right' style='width:982px;height:0px; text-align:right;'>发布时间：" + moment($(this)[0].CommentDate).format("YYYY-MM-DD HH:mm:ss") + "  作者：" + $(this)[0].UserID + "</h5><hr style='width:982px;height:0px; text-align:center;'/></div>";
                });
                $("#Comment").append(str);

            }, error: function () {
                alert("error");
            },
            complete: function (XHR, TS) { XHR = null }
        });
    }
}
function initField_FA(BlockID) {//初始化田块高亮和下拉框 田块申请
    if (BlockID != null) {
        $.ajax({
            url: '/WebService.asmx/GetUnAllocatedFieldsByBlockID',
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            data: '{BlockID:"' + BlockID + '"}',
            success: function (data) {
                var Field = jQuery.parseJSON(data.d);
                //SVG
                var FieldSVG = "";
                $('#canvas').css('background', 'url(/img/map/Q' + BlockID + '.jpg)');
                $(Field).each(function () {
                    FieldSVG += '<polygon id="' + this.FieldID + '" class="lightarea Field" fill="green" points="' + this.FieldCoord + '"/>';
                });
                $('#canvas').html("<svg  width='1000px' height='707px'>" + FieldSVG + "</svg>");
                $('polygon').on('mouseover', function () {
                    $(this).css('opacity', 0.7);
                });
                $('polygon').on('mouseout', function () {
                    $(this).css('opacity', 0.4);
                });
                $('.Field').unbind("click");
                $('.Field').on('click', function () {
                    $(this).unbind("mouseout");
                    $("polygon:not(#" + this.id + ")").on("mouseout", function () {
                        $(this).css('opacity', 0.4);
                    })
                    $('#e6').val(this.id).trigger("change");
                });
                $('.lightarea,Field').qtip({ // Grab some elements to apply the tooltip to
                    style: 'qtip-bootstrap',
                    content: {
                        text: function (event, api) {
                            var CurrentFieldID = $(this).attr('id');
                            var CurrentFieldRemark = "";
                            $(Field).each(function () {
                                if (this.FieldID == CurrentFieldID) {
                                    CurrentFieldRemark = this.FieldRemark;
                                    return 0;
                                }
                            });
                            return CurrentFieldRemark;
                        }
                    },
                    show: {
                        solo: true
                    },
                    hide: {
                        event: 'unfocus mouseleave'
                    }
                });

                //select2
                $("#e5").next().remove();
                var fieldoption = '<div><p></p><span class="label label-default">田块</span><p></p><div><select id="e6" class="select2 block"><option value=""></option></div>';
                var fields = jQuery.parseJSON(data.d);
                $(fields).each(function () {
                    fieldoption += '<option value="' + $(this)[0].FieldID + '">' + $(this)[0].FieldName + '</option>';
                });
                fieldoption += '</select></div><p></p>';
                $("#e5").after(fieldoption);
                App.init();
                $("#e6").on('change', function () {
                    $("#errorBar").hide();
                    $("polygon,#" + $(this).val()).unbind("mouseout");
                    $("polygon:not(#" + $(this).val() + ")").on("mouseout", function () {
                        $(this).css('opacity', 0.4);
                    })
                    $("#canvas polygon").mouseout();
                    $("#canvas #" + $(this).val()).mouseover();
                });
            },
            error: function () {
                alert("fielderror");
            }
        });
    }
}


