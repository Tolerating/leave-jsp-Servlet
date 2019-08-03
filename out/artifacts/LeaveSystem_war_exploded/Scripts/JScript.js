var App = function () {

    var currentPage = ''; // 当前页
    var collapsed = false; //侧边栏的折叠
    var is_mobile = false; //是否为手机
    var is_mini_menu = false; //迷你菜单激活 
    var is_fixed_header = false; //固定头激活
    var responsiveFunctions = []; //响应功能架

    /*-----------------------------------------------------------------------------------*/
	/*	运行回调函数的app.addresponsivefunction 
	/*-----------------------------------------------------------------------------------*/
    var runResponsiveFunctions = function () {
        // 重新初始化订阅内容等 
        for (var i in responsiveFunctions) {
            var each = responsiveFunctions[i];
            each.call();
        }
    }
    /*-----------------------------------------------------------------------------------*/
	/*	获得正确的视口的宽度
	/*-----------------------------------------------------------------------------------*/
    var getViewPort = function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        }
    }
    
    /*-----------------------------------------------------------------------------------*/
	/*	检查布局大小
	/*-----------------------------------------------------------------------------------*/
	var checkLayout = function() {
		//检查sidebar是否有mini-menu样式
		is_mini_menu = $('#sidebar').hasClass('mini-menu');
		//检查header是否有navbar-fixed-top样式
		is_fixed_header = $('#header').hasClass('navbar-fixed-top');
	}
    /*-----------------------------------------------------------------------------------*/
	/*	侧边栏和主要内容大小匹配
	/*-----------------------------------------------------------------------------------*/
	var handleSidebarAndContentHeight = function () {
        var content = $('#content');
        var sidebar = $('#sidebar');
        var body = $('body');
        var height;

        if (body.hasClass('sidebar-fixed')) {
            height = $(window).height() - $('#header').height() + 1;
        } else {
            height = sidebar.height() + 20;
        }
        if (height >= content.height()) {
            content.attr('style', 'min-height:' + height + 'px !important');
        }
    }
    /*-----------------------------------------------------------------------------------*/
	/*	侧边栏的子元素点击
	/*-----------------------------------------------------------------------------------*/
	var handleSidebar = function () {
	jQuery('.sidebar-menu .has-sub > a').click(function () {
            var last = jQuery('.has-sub.open', $('.sidebar-menu'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);
            
			var thisElement = $(this);
			var slideOffeset = -200;
            var slideSpeed = 200;
			
            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
				sub.slideUp(slideSpeed, function () {
					if ($('#sidebar').hasClass('sidebar-fixed') == false) {
						App.scrollTo(thisElement, slideOffeset);
					}
					handleSidebarAndContentHeight();
                });
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(slideSpeed, function () {
					if ($('#sidebar').hasClass('sidebar-fixed') == false) {
						App.scrollTo(thisElement, slideOffeset);
					}
					handleSidebarAndContentHeight();
                });
            }
        });
		
	// 处理子菜单
	jQuery('.sidebar-menu .has-sub .sub .has-sub-sub > a').click(function () {
            var last = jQuery('.has-sub-sub.open', $('.sidebar-menu'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);
                
            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(200);
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200);
            }
        });
	}
	/*-----------------------------------------------------------------------------------*/
	/*	响应侧边栏折叠
	/*-----------------------------------------------------------------------------------*/
	var responsiveSidebar = function () {
		//手柄的侧边栏折叠屏幕宽度
        var viewport = getViewPort();
		var width = $(window).width();
		if ( viewport.width < 768 ) {
			is_mobile = true;
			//完全隐藏侧边栏
            jQuery('#main-content').removeClass("margin-left-50");
			jQuery('#main-content').addClass("margin-left-0");
            if(jQuery('#sidebar').hasClass("mini-menu"))
            {
                jQuery('#sidebar').removeClass("mini-menu");
                jQuery('#sidebar').addClass("sidebar-fixed");
                handleMobileSidebar();
            }
		}
		else {
			is_mobile = false;
            if(collapsed)
            {
                jQuery('#sidebar').addClass("mini-menu");
                jQuery('#main-content').addClass("margin-left-50");
            }
			//完全显示侧边栏
			    jQuery('#main-content').removeClass("margin-left-0");
			var menu = $('.sidebar');
			if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before resizing
				menu.slimScroll({
					destroy: true
				});
				menu.removeAttr('style');
				$('#sidebar').removeAttr('style');
			}

		}
	}
    /*-----------------------------------------------------------------------------------*/
	/*	设置特色产品查看
	/*-----------------------------------------------------------------------------------*/
    var getSProduct = function () {
    $(".sprod").on("click", function () {
        var SProductID = $(this).attr("id");
        var SProductName = $(this).attr("name");
        $(products).each(function () {//遍历产品json
            if (this.ProductID == SProductID) {
                $("#ProTitle").html(SProductName);
                $("#ProContent img").attr("src", "/img/product/" + SProductName + ".JPG");
                $("#ProContent p").html(HtmlUtil.htmlDecodeByRegExp(this.ProductIntroduction));
                var table = "<tr><td>中文学名</td><td>" + this.ProductName + "</td><td>温度</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductTemperature) + "</td></tr>";
                table += "<tr><td>土质</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductSoil) + "</td><td>光照</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductIllumination) + "</td></tr>";
                table += "<tr><td>水分</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductWaterContent) + "</td><td>规格</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductSpecType) + "</td></tr>";
                table += "<tr><td>生长周期</td><td>" + HtmlUtil.htmlDecodeByRegExp(this.ProductGrowthCycle) + "</td><td>产量</td><td>" + this.ProductOutput + "</td></tr>";
                $("#ProContent table").html(table);
                return false;
            }
        });
    });
}
    /*-----------------------------------------------------------------------------------*/
	/*	视频文件加载
	/*-----------------------------------------------------------------------------------*/
     var getVideo = function () {
           $.ajax({
            async: false,
            url: '/WebService.asmx/SelectVideo',
            contentType: "application/json",
            type: "POST",
            dataType: "json",
            success: function (data) {
                var name = [];
                var path = [];
                var definition = [];
                var video = $.parseJSON(data.d); //数据Json化
                var videos = video.sort(//根据VideoName字段对对象排序
                    function (a, b) {
                        if (a.VideoName < b.VideoName) return -1;
                        if (a.VideoName > b.VideoName) return 1;
                        return 0;
                    });
                $(videos).each(function () {
                    name.push(this.VideoName);
                    path.push(this.VideoPath);
                    definition.push(this.VideoDefinition);
                });
                var playlist = new Array();
                var sname = new Array();
                for (var i = 0; i < name.length; i++) {
                    var items = name[i];
                    //判断元素是否存在于sname中，如果不存在则插入到new_arr的最后
                    if ($.inArray(items, sname) == -1) {
                        sname.push(items);
                    }
                }
                var sources = [];
                var temp;
                for (var k = 0; k < sname.length; k++) {
                    for (var i = 0; i < name.length; i++) {
                        if (name[i] == sname[k]) {
                            sources.push({ file: path[i], label: definition[i] });
                        }
                    }
                    temp = { sources: sources, title: sname[k] };
                    playlist[k] = temp;
                    sources = [];
                }
                var viewport = getViewPort();
		        var width = $(window).width();
                var jwwidth="480px";
                var jwheight="270px";
                if(width<768)
                {
                    jwwidth="320px";
                    jwheight="180px";
                }
                
                jwplayer("my-video").setup({
                    primary: "flash",
                    playlist: playlist,
                    provider: "http", "http.startparam": "starttime"
                });
                jwplayer("my-video").resize(jwwidth,jwheight);
            },
            complete: function (XHR, TS) { XHR = null }
        });
                
        jQuery(window).resize(function() {
		    setTimeout(function () {
			    checkVideo();
		    }, 50); //等待50ms到窗口大小调整完成。 
	    });
        }
    /*-----------------------------------------------------------------------------------*/
	/*	检查视频大小
	/*-----------------------------------------------------------------------------------*/
        var checkVideo = function() {
		    var viewport = getViewPort();
		    var width = $(window).width();
            var jwwidth="480px";
            var jwheight="270px";
            if(width<768)
            {
                jwwidth="320px";
                jwheight="180px";
            }
            jwplayer("my-video").resize(jwwidth,jwheight);
	    }
    /*-----------------------------------------------------------------------------------*/
    /*	侧边栏折叠
    /*-----------------------------------------------------------------------------------*/
    var handleSidebarCollapse = function () {
        var viewport = getViewPort();

        //在用户交互处理边栏折叠
        jQuery('.sidebar-collapse').click(function () {
            //处理移动侧边栏切换
            if (is_mobile) {
                if (!collapsed) {
                    //如果侧边栏不是折叠
                    jQuery('.navbar-brand').removeClass("mini-menu");
                    jQuery('#sidebar').removeClass("mini-menu");
                    jQuery('body').addClass("slidebar");
                    jQuery('.sidebar').addClass("sidebar-fixed");
                    //如果存在去除固定顶部导航
                    if (is_fixed_header) {
                        jQuery('#header').removeClass("navbar-fixed-top");
                        jQuery('#main-content').removeClass("margin-top-100");
                    }
                    collapsed = true;
                    handleMobileSidebar();
                }
                else {
                    jQuery('.navbar-brand').removeClass("mini-menu");
                    jQuery('#sidebar').removeClass("mini-menu");
                    jQuery('body').removeClass("slidebar");
                    jQuery('.sidebar').removeClass("sidebar-fixed");
                    //如果存在增加固定顶部导航
                    if (is_fixed_header) {
                        jQuery('#header').addClass("navbar-fixed-top");
                        jQuery('#main-content').addClass("margin-top-100");
                    }
                    collapsed = false;
                }
            }
            else { //非移动设备处理侧边栏切换
                var iconElem = document.getElementById("sidebar-collapse").querySelector('[class*="fa-"]');
                var iconLeft = iconElem.getAttribute("data-icon1");
                var iconRight = iconElem.getAttribute("data-icon2");
                //如果侧边栏不是折叠
                if (!collapsed) {
                   /* 关于导航栏 */
                     jQuery('.navbar-brand').addClass("mini-menu");
                    /* 关于侧边栏 */
                    jQuery('#sidebar').addClass("mini-menu");
                    jQuery('#main-content').addClass("margin-left-50");
                    jQuery('.sidebar-collapse i').removeClass(iconLeft);
                    jQuery('.sidebar-collapse i').addClass(iconRight);
                    collapsed = true;
                }
                else {
                    /* 关于导航栏 */
                    jQuery('.navbar-brand').removeClass("mini-menu");
                    /* 关于侧边栏 */
                    jQuery('#sidebar').removeClass("mini-menu");
                    jQuery('#main-content').removeClass("margin-left-50");
                    jQuery('.sidebar-collapse i').removeClass(iconRight);
                    jQuery('.sidebar-collapse i').addClass(iconLeft);
                    collapsed = false;
                }
                $("#main-content").on('resize', function (e) {
                    e.stopPropagation();
                });
            }
        });
    }

    /*-----------------------------------------------------------------------------------*/
	/*处理移动设备上的固定侧边栏
	/*-----------------------------------------------------------------------------------*/
	var handleMobileSidebar = function () {
        var menu = $('.sidebar');

		if (menu.parent('.slimScrollDiv').size() === 1) { // 更新前的高度，折叠现有的实例 
            menu.slimScroll({
                destroy: true
            });
            menu.removeAttr('style');
            $('#sidebar').removeAttr('style');
        }
        menu.slimScroll({
            size: '7px',
            color: '#a1b2bd',
            opacity: .3,
            height: "100%",
            allowPageScroll: false,
            disableFadeOut: false
        });
    }
    /*-----------------------------------------------------------------------------------*/
	/*	处理固定侧边栏 
	/*-----------------------------------------------------------------------------------*/
	var handleFixedSidebar = function () {
        var menu = $('.sidebar-menu');
        if (menu.parent('.slimScrollDiv').size() === 1) { // 更新前的高度，折叠现有的实例 
            menu.slimScroll({
                destroy: true
            });
            menu.removeAttr('style');
            $('#sidebar').removeAttr('style');
        }

        if ($('.sidebar-fixed').size() === 0) {
            handleSidebarAndContentHeight();
            return;
        }

        var viewport = getViewPort();
        if (viewport.width >= 992) {
            var sidebarHeight = $(window).height() - $('#header').height() + 1;

            menu.slimScroll({
                size: '7px',
                color: '#a1b2bd',
                opacity: .3,
                height: sidebarHeight,
                allowPageScroll: false,
                disableFadeOut: false
            });
            handleSidebarAndContentHeight();
        }
        
    }
    /*-----------------------------------------------------------------------------------*/
	/*	窗口调整函数 
	/*-----------------------------------------------------------------------------------*/
	jQuery(window).resize(function() {
		setTimeout(function () {
			checkLayout();
			handleSidebarAndContentHeight();
			responsiveSidebar();
			handleFixedSidebar();
			handleNavbarFixedTop();
			runResponsiveFunctions(); 
		}, 50); //等待50ms到窗口大小调整完成。 
	});
    /*-----------------------------------------------------------------------------------*/
	/* 工具箱
	/*-----------------------------------------------------------------------------------*/
	var handleBoxTools = function () {
		//折叠
		jQuery('.box .tools .collapse, .box .tools .expand').click(function () {
            var el = jQuery(this).parents(".box").children(".box-body");
            if (jQuery(this).hasClass("collapse")) {
				jQuery(this).removeClass("collapse").addClass("expand");
                var i = jQuery(this).children(".fa-chevron-up");
				i.removeClass("fa-chevron-up").addClass("fa-chevron-down");
                el.slideUp(200);
            } else {
				jQuery(this).removeClass("expand").addClass("collapse");
                var i = jQuery(this).children(".fa-chevron-down");
				i.removeClass("fa-chevron-down").addClass("fa-chevron-up");
                el.slideDown(200);
            }
        });
		
		/* 关闭 */
		jQuery('.box .tools a.remove').click(function () {
            var removable = jQuery(this).parents(".box");
            if (removable.next().hasClass('box') || removable.prev().hasClass('box')) {
                jQuery(this).parents(".box").remove();
            } else {
                jQuery(this).parents(".box").parent().remove();
            }
        });
		
		/* 重装 */
		jQuery('.box .tools a.reload').click(function () {
            
        });
	}
    /*-----------------------------------------------------------------------------------*/
	/*	SlimScroll滚动条插件
	/*-----------------------------------------------------------------------------------*/
	var handleSlimScrolls = function () {
        if (!jQuery().slimScroll) {
            return;
        }

        $('.scroller').each(function () {
            $(this).slimScroll({
                size: '7px',
                color: '#a1b2bd',
				height: $(this).attr("data-height"),
                alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
				railOpacity: 0.1,
                disableFadeOut: true
            });
        });
    }
    /*-----------------------------------------------------------------------------------*/
	/*	自定义标签
	/*-----------------------------------------------------------------------------------*/
	var handleCustomTabs = function () {
			var adjustMinHeight = function (y) {
				$(y).each(function () {
					var A = $($($(this).attr("href")));
					var z = $(this).parent().parent();
					if (z.height() > A.height()) {
						A.css("min-height", z.height())
					}
				})
			};
			$("body").on("click", '.nav.nav-tabs.tabs-left a[data-toggle="tab"], .nav.nav-tabs.tabs-right a[data-toggle="tab"]', function () {
				adjustMinHeight($(this))
			});
			adjustMinHeight('.nav.nav-tabs.tabs-left > li.active > a[data-toggle="tab"], .nav.nav-tabs.tabs-right > li.active > a[data-toggle="tab"]');
			if (location.hash) {
				var w = location.hash.substr(1);
				$('a[href="#' + w + '"]').click()
			}
	}
    /*-----------------------------------------------------------------------------------*/
	/*	状态按钮
	/*-----------------------------------------------------------------------------------*/
	var handleStatefulButtons = function () {
		$(document).ready(function(){
		  $("#btn-load").on("click",function(){
			var a=$(this);
			a.button("loading");
			setTimeout(function(){
			  a.button("reset")}
					   ,1500)}
						   );
		  $("#btn-load-complete").on("click",function(){
			var a=$(this);
			a.button("loading");
			setTimeout(function(){
			  a.button("complete")}
					   ,1500)}
										 )}
						 );
	}
	/*-----------------------------------------------------------------------------------*/
	/*	切换按钮
	/*-----------------------------------------------------------------------------------*/
	var handleToggle = function () {
	$('.radio1').on('switch-change', function () {
		$('.radio1').bootstrapSwitch('toggleRadioState');
		});
		// or
		$('.radio1').on('switch-change', function () {
		$('.radio1').bootstrapSwitch('toggleRadioStateAllowUncheck');
		});
		// or
		$('.radio1').on('switch-change', function () {
		$('.radio1').bootstrapSwitch('toggleRadioStateAllowUncheck', false);
		});
	}
    /*-----------------------------------------------------------------------------------*/
	/*	jQuery UI 滑动条
	/*-----------------------------------------------------------------------------------*/
	var handleSliders = function () {
	  function repositionTooltip( e, ui ){$
        var div = $(ui.handle).data("bs.tooltip").$tip[0];
        var pos = $.extend({}, $(ui.handle).offset(), { width: $(ui.handle).get(0).offsetWidth,
                                                        height: $(ui.handle).get(0).offsetHeight
                  });
        
        var actualWidth = div.offsetWidth;
        
        tp = {left: pos.left + pos.width / 2 - actualWidth / 2}            
        $(div).offset(tp);
        
        $(div).find(".tooltip-inner").text( ui.value );     
	}
    
	  $("#slider").slider({ value: 15, slide: repositionTooltip, stop: repositionTooltip });
	  $("#slider .ui-slider-handle:first").tooltip( {title: $("#slider").slider("value"), trigger: "manual"}).tooltip("show");
	  
	  $("#slider-default").slider();
	  
      $("#slider-range").slider({
        range:true,min:0,max:500,values:[75,300]
      });
	  
      $("#slider-range-min").slider({
        range:"min",value:37,min:1,max:700,slide:function(a,b){
          $("#slider-range-min-amount").text("$"+b.value)}
      });
	  
      $("#slider-range-max").slider({
        range:"max",min:1,max:700,value:300,slide:function(a,b){
          $("#slider-range-max-amount").text("$"+b.value)}
      });
	  
      $("#slider-vertical-multiple > span").each(function(){
        var a=parseInt($(this).text(),10);
        $(this).empty().slider({
          value:a,range:"min",animate:true,orientation:"vertical"}
                              )}
                                                );
      $("#slider-vertical-range-min").slider({
        range:"min",value:400,min:1,max:600,orientation:"vertical"
      });
	  $("#slider-horizontal-range-min").slider({
        range:"min",value:600,min:1,max:1000
      });
	}
    /*-----------------------------------------------------------------------------------*/
	/*	Select2
	/*-----------------------------------------------------------------------------------*/
	var handleSelect2 = function () {

        $("#e7").select2({
			 placeholder:"请选择身份",
			 allowClear: true,
             language: 'zh-CN'
		});
        $("#e1").select2({
			 placeholder:"请选择项目组",
			 allowClear: true,
             language: 'zh-CN'
		});
        $("#type").select2({
			 minimumResultsForSearch: -1,
             width:"50%",
             language: 'zh-CN'
		});
        $("#Path").select2({
			 placeholder: "视频路径不能为中文",
             width:"50%",
             language: 'zh-CN'
		});
		/* Basic */
		$("#e3").select2({
			 placeholder: "请选择基地",
             language: 'zh-CN'
		});
        $("#e4").select2({
			 placeholder: "请选择功能区",
             language: 'zh-CN'
		});
        $("#e5").select2({
			 placeholder: "请选择地块",
             language: 'zh-CN'
		});
        $("#e6").select2({
			 placeholder: "请选择田块",
             language: 'zh-CN'
		});
        $("#classify").select2({
            placeholder: "请选择分类",
            language: 'zh-CN'
        });

        $("#nodes_select_charts").select2({
            placeholder:"请选择节点",
            language: 'zh-CN'
        });
        $("#nodes_select_box").select2({
             placeholder:"请选择节点",
             language: 'zh-CN'
        }).on('change', function () {
            $alert.hide();
        });
		    $("#e8").select2({
				tags:["red", "green", "blue"],
                language: 'zh-CN'
			});
	}
    /*-----------------------------------------------------------------------------------*/
	/*	手柄顶部导航栏固定 
	/*-----------------------------------------------------------------------------------*/
	var handleNavbarFixedTop = function () {
		if(is_mobile && is_fixed_header) {
			//Manage margin top
			$('#main-content').addClass('margin-top-100');
		}
		if(!(is_mobile) && is_fixed_header){
			//Manage margin top
			$('#main-content').removeClass('margin-top-100').addClass('margin-top-50');
		}
	} 
    /*-----------------------------------------------------------------------------------*/
	/*	Isotope
	/*-----------------------------------------------------------------------------------*/
	var handleIsotope = function () {
		var $container = $('#filter-items');
		// 图像加载后的初始化Isotope
		$container.imagesLoaded( function(){
			$container.isotope({
			  // options...
			});

			// 点击过滤链接的项目
			$('#filter-controls a').click(function(){
			  var selector = $(this).attr('data-filter');
			  $container.isotope({ filter: selector });
			  return false;
			});
			// 小屏幕上的过滤器
			$("#type").change(function(){
				var selector = $(this).find(":selected").val();
				 $container.isotope({ filter: selector });
				 return false;
			});
		});
		
	}
    /*-----------------------------------------------------------------------------------*/
	/*	操作停在画面上
	/*-----------------------------------------------------------------------------------*/
	var handleHover = function () {
		$('.filter-content').hover(function() {
			var hoverContent = $(this).children('.hover-content');
			hoverContent.removeClass('fadeOut').addClass('animated fadeIn').show();
		}, function() {
			var hoverContent = $(this).children('.hover-content');
			hoverContent.removeClass('fadeIn').addClass('fadeOut');
		});
	}

//		jQuery(window).resize(resizeColorBox);
//		window.addEventListener("orientationchange", resizeColorBox, false);
//	}
	
    /*-----------------------------------------------------------------------------------*/
	/*	处理在尾处的顶部按钮
	/*-----------------------------------------------------------------------------------*/
	var handleGoToTop = function () {
		$('.footer-tools').on('click', '.go-top', function (e) {
			App.scrollTo();
			e.preventDefault();//取消事件的默认动作
		});
	} 
   
    /*-----------------------------------------------------------------------------------*/
	/*	处理配置文件编辑
	/*-----------------------------------------------------------------------------------*/
	var handleProfileEdit = function () {
		$(".datepicker").datepicker();
	}
	return {

        //初始化主题页面
        init: function () {
            if (App.isPage("HomePage")) {
				handleIsotope();	//动态排版功能
				handleHover();		//功能来显示悬停内容
                handleSelect2();
                getSProduct();
                getVideo();
			}
            if(App.isPage("select"))
            {
                handleSelect2();
            }
            if(App.isPage("product"))
            {
                getSProduct();
            }
		    checkLayout();//功能检查迷你菜单/固定头是否激活 
			handleSidebarCollapse(); //函数来显示或隐藏侧边栏
		    handleSidebar();//函数显示侧边栏
            responsiveSidebar();//函数来处理相应的侧边栏
            handleBoxTools(); //处理工具箱的功能
            handleSlimScrolls(); //处理滚动条的功能
            handleCustomTabs(); //函数来处理自定义制表符的最小高度 
            handleGoToTop(); 	//功能处理转到顶部的按钮
        },

        //设置页面
        setPage: function (name) {
            currentPage = name;
        },

        isPage: function (name) {
            return currentPage == name ? true : false;
        },
		//公共函数添加回调函数，该函数将被调用在窗口调整大小
        addResponsiveFunction: function (func) {
            responsiveFunctions.push(func);
        },
		//滚动函数
        scrollTo: function (el, offeset) {
            pos = (el && el.size() > 0) ? el.offset().top : 0;
            jQuery('html,body').animate({
                scrollTop: pos + (offeset ? offeset : 0)
            }, 'slow');
        },

        // 函数滚动到顶部
        scrollTop: function () {
            App.scrollTo();
        },
    };
}();
