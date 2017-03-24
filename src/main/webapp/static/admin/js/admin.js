/**
* Author: wq@zlzkj.com
* Modify: zqz@@zlzkj.com
* Date: 2014-08-12 - 2014-04-29
**/

// 框架初始化
;(function() {
    //加载左侧菜单内容
    var loadLeftMenu = function() {
        $("#nav-menu li").click(function(e) {
            var $self = $(this);
            var hidemenu = $(this).data("hidemenu");
            $(this).addClass("active").siblings().removeClass("active");
            var url = $(this).find("a").attr("href");
            $("#crumb_name1").html($(this).find("a").html());
            if (url != "#") {
                $("#left").load(url, function() {
                    // 渲染jqui组件
                    if ($.parser) {
                        if (hidemenu) {
                            $('#body_layout').layout('hidden',"west");
                            $('#center_layout').layout('hidden',"north");
                        } else {
                            $('#body_layout').layout('show',"west");
                            $('#center_layout').layout('show',"north");
                        }
                        $.parser.parse("#left");
                        $("#loading").remove();
                    }
                    //根据hash加载内容
                    var hashString = window.location.hash;
                    var indexOfSlash = hashString.indexOf("/");
                    var navId = hashString.substring(1, indexOfSlash); //获取顶部菜单ID
                    var hash = hashString.substring(indexOfSlash);
                    if(navId!=$("#nav-menu li.active").data("navid")){ //从其他topMenuNode点击过来
                        $("#left .sub-menu li:first").click();
                    }else{
                        if (hash.indexOf("?") > -1) {
                            hash = hash.split("?")[0];
                        }
                        $("#left .sub-menu li").each(function(){
                            if(hash==$(this).data("hash")){
                                var $accordionHeader = $(this).parent().parent().prev();
                                if(!$accordionHeader.hasClass("accordion-header-selected")){
                                    $accordionHeader.click();
                                }
                                $(this).click();
                                return false;
                            }
                        });
                    }
                });
            }
            e.preventDefault();
        });
    };
    //加载页面内容
    var loadContent = function() {
        $("#left").delegate(".sub-menu li","click",function(e) {
            var hashString = window.location.hash;
            var href = $(this).data("hash");
            var navId = $("#nav-menu li.active").data("navid"); //获取顶部菜单ID
            var param = '';
            // 获取地址栏参数
            if (hashString.indexOf("?") > -1) {
                param = "?" + hashString.split("?")[1];
            }
            $("#left .sub-menu li").removeClass("active");
            $(this).addClass("active");
            window.location.href = "#"+navId+href;
            $("#crumb_name2").html("/ "+$(this).parent().data("group"));
            $("#crumb_name3").html("/ "+$(this).find("a").html());
            $("#crumb_name4").html("");
            if (href != "#") {
                $("#content").removeClass("panel-noscroll");
                $("#content").html("").load(ZLZ.SELF + href + param, function() {
                    // 渲染前改变grid控件高度到全屏
                    // 渲染jqui组件
                    if ($.parser) {
                        $.parser.parse("#content");
                    }
                });
            }
            e.preventDefault();
        });
    };
    /**
     * hash锚点定位页面
     * 依赖jquery.hashchange.js
     */
    var loadPageByHash = function(){
        $(window).hashchange(function(){
            var hashString = window.location.hash;
            var indexOfSlash = hashString.indexOf("/");
            var navId = hashString.substring(1, indexOfSlash); //获取顶部菜单ID
            var hash = hashString.substring(indexOfSlash);
            //激活顶部菜单
            if(navId!=$("#nav-menu li.active").data("navid")){
                $("#nav-menu li[data-navId='"+navId+"']").click();
            }
        });

        $(window).hashchange();
    };
    loadLeftMenu();
    loadContent();
    loadPageByHash();
})();

/**
 * 工厂函数方法
=============================================================================
 */
var App = function () {
    var $Popup; // 弹出层对象
    var isIE8 = !!navigator.userAgent.match(/MSIE 8.0/),
        isIE9 = !!navigator.userAgent.match(/MSIE 9.0/),
        isIE10 = !!navigator.userAgent.match(/MSIE 10/);
    // 遮罩层
    var LoadingMask,LoadingMsg;
    var loadingImpl = {
        addMsk: function(msg) {
            var msg = msg || "努力加载中，请稍候。。。";
            LoadingMask = $('<div class="datagrid-mask"></div>').css({display:"block",'z-index':'99999',width:"100%",height:$(window).height()}).appendTo("body");
            LoadingMsg = $('<div class="datagrid-mask-msg"></div>').html(msg).appendTo("body").css({display:"block",'z-index':'100000',left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height() - 45) / 2});
        },
        removeMsk: function() {
            LoadingMask.remove();
            LoadingMsg.remove();
        }
    };
    //全局的ajax访问，处理ajax清求时sesion超时
    var ajaxCheckAccess = function(){
        $.ajaxSetup({
            cache: false,
            complete:function(XMLHttpRequest,textStatus){
                //通过XMLHttpRequest取得响应头
                var accessStatus=XMLHttpRequest.getResponseHeader("Access-Status");
                if(accessStatus=="-1"){
                    //如果超时就处理 ，则刷新当前页面，会自动跳到登录页
                    $.messager.alert("提示","登录超时，请重新登录!","warning",function(){
                        window.location.reload();
                    });
                }
            }
        });
    };
    /**
     * url: 请求地址
     * title: 页面标题
     * 场景: 跳转到编辑页面App.loadPage("{:u('goods/edit')}?id=1", "产品编辑");
     */
    var loadPageImpl = function(href, title) {
        if (title) {
            $("#crumb_name4").text(title);
            $("#content").removeClass("panel-noscroll");
            $("#content").html("").load(href, function() {
                if ($.parser) {
                    $.parser.parse("#content");
                }
            });
        } else {
            var hrefFmt = href.split(".")[0];
            var reg = new RegExp(ZLZ.SELF, "gi");
            var hrefReg = hrefFmt.replace(reg, "");
            $(".main-menu .sub-menu li").each(function(){
                if(hrefReg == $(this).data("hash")){
                    $(this).click();
                }
            });
        }
    };
    /**
     * 弹出层
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    var dialogImpl  = function(options) {
        var _default = {
            minimizable: false,
            modal: true,
            collapsible: false,
            shadow: false,            
            maximizable: false,
            onClose: function() {
                $(this).dialog('destroy');
            }
        };
        var opts = $.extend(_default, options);
        var $dialog = $(opts.el || "<div style='padding: 5px;'></div>");
        if (opts.href) {
            loadingImpl.addMsk();
            // 先通过ajax加载html片段，优化弹窗体验，否则弹窗高度是撑开来的效果
            $.get(opts.href, function(html) {
                loadingImpl.removeMsk();
                opts.href = "";
                $dialog.dialog(opts);
                var content = $dialog.find('div.dialog-content');
                content.html(html);
                $dialog.dialog(opts);
                if ($.parser) {
                    $.parser.parse(content);
                }
                opts.onLoad && opts.onLoad();                
            }, "html");
        }
        return $dialog;
    };
    alertImpl = function() {
        if (arguments.length === 1) {
            $.messager.alert("提示", arguments[0]);
        } else if (arguments.length === 2 && typeof arguments[1] === "string") {
            $.messager.alert("提示", arguments[0], arguments[1]);
        } else if (arguments.length === 2 && typeof arguments[1] === "function") {
            $.messager.alert("提示", arguments[0], "", arguments[1]);
        } else if (arguments.length === 3) {
            $.messager.alert("提示", arguments[0], arguments[1], arguments[2]);
        }
    };
    confirmImpl = function(msg, fn) {
        $.messager.confirm("确认", msg, function(r){
            if (r){
                fn();
            };
        });
    };
    promptImpl = function(msg, fn) {
        $.messager.prompt("提示", msg, fn);
    }; 
    /**
     * placeholder ie支持
     */
    var fixInputPlaceholderForIE = function() {
        if (isIE8 || isIE9) {
            $("input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)").each(function() {
                var input = $(this);
                if (input.val() == "" && input.attr("placeholder") != "") {
                    input.addClass("placeholder").val(input.attr("placeholder"));
                }
                input.focus(function() {
                    if (input.val() == input.attr("placeholder")) {
                        input.val("");
                    }
                });
                input.blur(function() {
                    if (input.val() == "" || input.val() == input.attr("placeholder")) {
                        input.val(input.attr("placeholder"));
                    }
                });
            });
        }
    };
    /**
     * 数据表格刷新
     */
    var reloadGridImpl = function(element) {
        if (element == -1) {
            return false;
        }
        if (element) {
            if ($(element).hasClass("jq-datagrid")) {
                $(element).datagrid('reload');
            } else {
                $(element).treegrid('reload');
            }
        } else {
            $(".jq-datagrid").datagrid('reload');
            $(".jq-treegrid").treegrid('reload');
        }
    }
    /**
     * 提示方式封装
     * @param  {[type]} data   [ajax返回数据对象]
     */
    var ajaxMessageImpl = function(data) {
        var icon;
        var timeout = 1000;
        if(data.status == 1){
            icon = '<i class="messager-icon-tip messager-right fl"></i>';
        } else {
            icon = '<i class="messager-icon-tip messager-error fl"></i>';
            timeout = 4000;
        }
        $.messager.show({
            title: "提示",
            msg: icon + '<div style="margin: 5px 0 0 40px;">'+data.info+'</div>',
            height: "auto",
            showType: 'fade',
            timeout: timeout,
            style:{
                right: '',
                top: document.body.scrollTop+document.documentElement.scrollTop,
                bottom: '',
                fontSize: 14
            }
        });
    };
   /**
     * 表单处理封装
    */
    var ajaxFormImpl = function(formId,gridId){
        var btnText = "";
        if (typeof arguments[0] === "object") {
            var opts = arguments[0];
            var gridId = opts.gridId;
            var successCallback = opts.success;
            var formId = opts.formId;
            var isClose = opts.isClose;
        }
        $(formId).form({
            onSubmit: function() {
                var isValid = $(this).form('validate');
                    btnText = $(this).find("button[type='submit']").text();
                if (isValid){
                    var msg = $(this).find("button[type='submit']").data("msg") || '保存中...';
                    $(this).find("button[type='submit']").attr('disabled','disabled').text(msg);
                } else {
                    return false;
                }
            },
            success:function(data){
                var data = new Function("return" + data)();
                $(formId).find("button[type='submit']").removeAttr('disabled','disabled').text(btnText);
                successCallback && successCallback(data);
                ajaxMessageImpl(data);
                reloadGridImpl(gridId);
                if ($Popup && isClose !== false) {
                    $Popup.dialog('destroy');
                    $Popup = "";
                }
            }
        });
        //取消按钮触发关闭
       $(".J_close").on('click',function(){
            $Popup.dialog('destroy');
        });
    };
    /**
     * 弹出层
     */
    var popupImpl = function(href,title,onLoadCallBack){
        var _default = {
            href: href,
            title: title,
            formId: '#form',
            gridId: "",
            width: 400,
            height: 'auto',
            isClose: true
        }; 
        if (typeof arguments[1] === "object") {
            var opts = $.extend({}, _default, arguments[1]);
            var successCallback = opts.success;
        } else {
            var opts = $.extend({}, _default);
        }
        var formId = opts.formId;
        var gridId = opts.gridId;
        var isClose = opts.isClose;
        var id = href.split("id=")[1];
        opts.onLoad = function() {
            // 弹窗里存在表单
            if ($(formId).length) {
                var isAction = $(formId).attr('action');
                // 如果表单没有设置action，则自动设置href为action
                if (!isAction) {
                    $(formId).attr('action',href);
                }
                // 如果文件地址带id参数
                if (id) {
                    $(formId).append("<input type='hidden' name='id' value='"+id+"' />");
                }
                // 实例化当前表单
                ajaxFormImpl({
                    formId: formId,
                    gridId: gridId,
                    isClose: isClose,
                    success: function() {
                        successCallback && successCallback();
                    }
                });
            }
            onLoadCallBack && onLoadCallBack();
        }
        $Popup = dialogImpl(opts);
    };
    /**
     * 清空datagrid封装
     * @param {string} [element]:grid表格的元素id或class
     */
    var clearImpl = function(element) {
        $(element).datagrid('loadData',{total:0,rows:[]});
    }
    /**
     * ajax请求处理
     * @param  {string} url     [请求地址]
     * @param  {string} msg     [提示信息]
     * @param  {object} 当第二个参数为对象时 [属性参数:msg(提示信息),gridId(列表对象),param(请求参数)cd ..]
     */
    var ajaxImpl = function(url, msg) {
        var _default = {
            msg: "确定要删除选中的记录？",
            type: "POST"
        }; 
        if (typeof arguments[1] === "object") {
            var opts = $.extend({}, _default, arguments[1]);
            var msg = opts.msg;
            var successCallback = opts.success;
            var okCallback = opts.ok;
        } else {
            var opts = $.extend({}, _default);
            var msg = msg || opts.msg;
        }
        var type = opts.type;
        var gridId = opts.gridId;
        var param = opts.param;
        confirmImpl(msg,function(){
            okCallback && okCallback();
            $.ajax({
                url: url,
                type: type,
                dataType: "json",
                data: param,
                success: function(data) {
                    ajaxMessageImpl(data);
                    successCallback && successCallback(data);
                    reloadGridImpl(gridId);
                }
            });
        });
    };
    // 搜索
    var searchImpl = function(url, element, params){
        var isTreeGrid = $(element).hasClass("jq-treegrid");
        if (isTreeGrid) {
            $(element).treegrid({
                url: url,
                queryParams: params
            });
        } else {
            $(element).datagrid({
                url: url,
                queryParams: params
            });
        }
    };
    /**
     * [handleWordImpl 截取datagrid下单元格文字过多的部分，并添加(明细)操作]
     * @param val {String}: 单元格文字
     * @param number {Number}: 文字截取位置
     * @param gridId {String}: 表格对象
     */
    var handleWordImpl = function() {
        var data;
        var cut = function(val,number,gridId) {
            data = val;
            if (val.length > number) {
                var v = val.substring(0,number);
                return v+'<a href="javascript:;" class="txt-info J_openDetails">(明细)</a>';
            } else {
                return val;
            }
        };
        var look = function(gridId) {
            var gridId = gridId || ".J_grid";
            $(".J_openDetails").on('click',function() {
                App.dialog({
                    title: '查看明细',
                    width: 600,
                    content: data
                });
            });
        };
        return {
            cut: cut,
            look: look
        }
    }();
    /**
    * datagrid状态格式化
    */
    var statusFmtImpl = function(val){
        var icon;
        if (val == 0) {
            icon = "icon-cancel";
        } else if (val == 1) {
            icon = "icon-accept";
        }
        return '<i class="icon '+icon+'"></i>';
    };
    /**
     * 采用正则表达式获取地址栏参数
     * @param  {[type]} name [参数名称]
     * @return {[type]}      [description]
     */
    var getUrlParamImpl = function(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    };
    /**
     * 提取json对象中的字段，并转为字符串
     * @param  {[object]} data  [json对象]
     * @param  {[string]} field [字段名]
     */
    var getStringImpl = function(data, field) {
        var str = $.map(data, function(v) {
            return v[field];
        }).join(",");
        return str;
    };
    return {
        init: function() {
            ajaxCheckAccess();
            fixInputPlaceholderForIE();
        },
        loadPage: loadPageImpl,
        message: ajaxMessageImpl,
        popup: popupImpl,
        ajaxForm: ajaxFormImpl,
        ajax: ajaxImpl,
        search: searchImpl,
        reload: reloadGridImpl,
        statusFmt: statusFmtImpl,
        handleWord: handleWordImpl,
        getUrlParam: getUrlParamImpl,
        getString: getStringImpl,
        alert: alertImpl,
        dialog: dialogImpl,
        confirm: confirmImpl,
        prompt: promptImpl,
        loading: function(msg) {
           if (msg == "remove") {
                loadingImpl.removeMsk();
           } else {
                loadingImpl.addMsk(msg);
           } 
        }
    };

}();
//初始化
App.init();

/**
 * 验证扩展
=============================================================================
 */
$.extend($.fn.validatebox.defaults.rules, {
    idcard: { // 验证身份证
        validator: function(value) {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
        },
        message: '身份证号码格式不正确'
    },
    safepass: {
        validator: function(value, param) {
            return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value));
        },
        message: '密码由字母和数字组成，至少6位'
    },
    phone: { // 验证电话号码
        validator: function(value) {
            return /^0\d{2,3}(\-)?\d{7,8}$/.test(value);
        },
        message: '格式不正确,请使用下面格式:020-88888888'
    },
    mobile: { // 验证手机号码
        validator: function(value) {
            return /^1\d{10}$/.test(value);
        },
        message: '请输入正确的手机号码'
    },
    currency: { // 验证货币
        validator: function(value) {
            return /^d+(.d+)?$/i.test(value);
        },
        message: '货币格式不正确'
    },
    qq: { // 验证QQ,从10000开始
        validator: function(value) {
            return /^[1-9]\d{4,10}$/.test(value);
        },
        message: 'QQ号码格式不正确'
    },
    integer: { // 验证整数
        validator: function(value) {
            return /^[0-9]*[1-9][0-9]*$/.test(value);
        },
        message: '只能输入正整数'
    },
    age: { // 验证年龄
        validator: function(value) {
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
        },
        message: '年龄必须是0到120之间的整数'
    },

    chinese: { // 验证中文
        validator: function(value) {
            return /^[Α-￥]+$/i.test(value);
        },
        message: '请输入中文'
    },
    english: { // 验证英语
        validator: function(value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    number: {
        validator: function(value, param) {
            return /^\d+$/.test(value);
        },
        message: '请输入数字'
    },
    unnormal: { // 验证是否包含空格和非法字符
        validator: function(value) {
            return /.+/i.test(value);
        },
        message: '输入值不能为空和包含其他非法字符'
    },
    username: { // 验证用户名
        validator: function(value) {
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
        },
        message: '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    },
    zip: { // 验证邮政编码
        validator: function(value) {
            return /^[1-9]\d{5}$/.test(value);
        },
        message: '邮政编码格式不正确'
    },
    ip: { // 验证IP地址
        validator: function(value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message: 'IP地址格式不正确'
    },
    name: { // 验证姓名，可以是中文或英文
        validator: function(value) {
            return /^[Α-￥]+$/i.test(value) | /^w+[ws]+w+$/i.test(value);
        },
        message: '请输入正确的姓名'
    },
    same: {
        validator: function(value, param) {
            if ($("#" + param[0]).val() != "" && value != "") {
                return $("#" + param[0]).val() == value;
            } else {
                return true;
            }
        },
        message: '两次输入的密码不一致！'
    },
    minLength: {
        validator: function(value, param) {
            return value.length >= param[0];
        },
        message: '内容长度至少为 {0} 位！'
    },
    onlyLength: {
        validator: function(value, param) {
            return value.length == param[0];
        },
        message: '内容长度只能为 {0} 位！'
    }
});
/**  
 * layout方法扩展  
 * @param {Object} jq  
 * @param {Object} region  
 */  
$.extend($.fn.layout.methods, {   
    /**  
     * 面板是否存在和可见  
     * @param {Object} jq  
     * @param {Object} params  
     */  
    isVisible: function(jq, params) {   
        var panels = $.data(jq[0], 'layout').panels;   
        var pp = panels[params];   
        if(!pp) {   
            return false;   
        }   
        if(pp.length) {   
            return pp.panel('panel').is(':visible');   
        } else {   
            return false;   
        }   
    },   
    /**  
     * 隐藏除某个region，center除外。  
     * @param {Object} jq  
     * @param {Object} params  
     */  
    hidden: function(jq, params) {   
        return jq.each(function() {   
            var opts = $.data(this, 'layout').options;   
            var panels = $.data(this, 'layout').panels;   
            if(!opts.regionState){   
                opts.regionState = {};   
            }   
            var region = params;   
            function hide(dom,region,doResize){   
                var first = region.substring(0,1);   
                var others = region.substring(1);   
                var expand = 'expand' + first.toUpperCase() + others;   
                if(panels[expand]) {   
                    if($(dom).layout('isVisible', expand)) {   
                        opts.regionState[region] = 1;   
                        panels[expand].panel('close');   
                    } else if($(dom).layout('isVisible', region)) {   
                        opts.regionState[region] = 0;   
                        panels[region].panel('close');   
                    }   
                } else {   
                    panels[region].panel('close');   
                }   
                if(doResize){   
                    $(dom).layout('resize');   
                }   
            };   
            if(region.toLowerCase() == 'all'){   
                hide(this,'east',false);   
                hide(this,'north',false);   
                hide(this,'west',false);   
                hide(this,'south',true);   
            }else{   
                hide(this,region,true);   
            }   
        });   
    },   
    /**  
     * 显示某个region，center除外。  
     * @param {Object} jq  
     * @param {Object} params  
     */  
    show: function(jq, params) {   
        return jq.each(function() {   
            var opts = $.data(this, 'layout').options;   
            var panels = $.data(this, 'layout').panels;   
            var region = params;   
  
            function show(dom,region,doResize){   
                var first = region.substring(0,1);   
                var others = region.substring(1);   
                var expand = 'expand' + first.toUpperCase() + others;   
                if(panels[expand]) {   
                    if(!$(dom).layout('isVisible', expand)) {   
                        if(!$(dom).layout('isVisible', region)) {   
                            if(opts.regionState[region] == 1) {   
                                panels[expand].panel('open');   
                            } else {   
                                panels[region].panel('open');   
                            }   
                        }   
                    }   
                } else {   
                    panels[region].panel('open');   
                }   
                if(doResize){   
                    $(dom).layout('resize');   
                }   
            };   
            if(region.toLowerCase() == 'all'){   
                show(this,'east',false);   
                show(this,'north',false);   
                show(this,'west',false);   
                show(this,'south',true);   
            }else{   
                show(this,region,true);   
            }   
        });   
    }   
});  
