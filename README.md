springboot
===============

# springboot框架模板

> 包名的命名规范，除了 Application.java 在的主程序是直接跟在 `flybear/hziee`
> 其他的例如controller、service、model、mapper都是这样写的 `flybear/hziee/controller`、`flybear/hziee/service`

 - src/main/java
     - flybear/hziee
        - `Application.java` *springboot* 的主程序，启动的入口
     - flybear/hziee.conf
        - `BeansConfig.java`
        - `WebMvcConfig.java` 过滤器
     - flybear/hziee.controller 页面控制器
     - flybear/hziee.druid
        - `DruidAutoConfiguration.java`
        - `DruidProperties.java`
     - flybear/hziee.interceptor
        - `CoreInterceptor.java` 拦截器
     - flybear/hziee.mapper 数据库映射文件，但 xml文件 在 *resources/mapper* 文件夹下，需在 `application.properties` 进行配置
     - flybear/hziee.model 
     - flybear/hziee.service 业务类
     - flybear/hziee.util 工具类

### 运行程序：

因为springboot已经内置了tomcat，不需要外部的tomcat，只需运行 通过 java Application 运行 `flybear/hziee/Application.java` 就能启动程序了。

> 项目所有的配置文件都在 `/src/main/resources/application.properties` 中

> (热部署)有自动部署的插件，修改代码后，会自动部署

### 1. 针对前端页面快速开发

说明：前台页面采用JSP作为视图

#### 1.1 提供了jsp页面继承标签，\<z:block\>和\<z:override\>两个自定义标签

在WEB-INF/views目录新建jsp页面public/base.jsp，内容如下

```java
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://flybear.hziee/tags" prefix="z"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="${__static__}/app/app.css?v=1.0">
    <script type="text/javascript" src="${__static__}/app/app.js?v=2.1.1"></script>
    <z:block name="css">
    </z:block>
    <script type="text/javascript">
        var ZLZ = window.ZLZ = {
            "ROOT"   : "${__root__}",
            "URL"    : "${__url__}",
            "STATIC" : "${__static__}"
        }
    </script>
</head>
<body>
<!-- 头部 -->
<div id="header"></div>

<!-- 主体内容 -->
<div id="content">
    <z:block name="content">
        <!-- 可以有默认内容，重写后默认内容将被替换 -->
    </z:block>
</div>

<!-- 尾部 -->
<div id="footer"></div>

<!-- 自定义JS添加到尾部 -->
<z:block name="js">
</z:block>
</body>
</html>
```

再新建index/index.jsp，站点首页，来继承public/base.jsp

```java
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://flybear.hziee/tags" prefix="z"%>

<z:override name="css">  
    <style>
        /* 写一些css样式 */
    </style>
</z:override>

<z:override name="content">  
    真正的首页内容
</z:override>

<z:override name="js">
    <script>
        /* 写一些js代码 */
    </script>
</z:override>

<!-- 模板继承写在最下面 -->
<%@ include file="../public/base.jsp" %>
```

#### 1.2 提供了几个模板路径常量

看上面的base.jsp中的头部css和js路径

```java
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="${__static__}/app/app.css?v=1.0">
    <script type="text/javascript" src="${__static__}/app/app.js?v=2.1.1"></script>
    <z:block name="css">
    </z:block>
    <script type="text/javascript">
        var ZLZ = window.ZLZ = {
            "ROOT"   : "${__root__}",
            "URL"    : "${__url__}",
            "STATIC" : "${__static__}"
        }
    </script>
</head>

//${__static__}代表静态资源跟目录，默认是src/main/webapp/static目录，网络访问路径为http://IP:8080/项目名/static/
//${__root__}代表当前项目的网址根路径，即http://IP:8080/项目名/
//${__url__}代表当前页面的带参数的url
```

#### 1.3 提供jsp快速生成url的标签${z:u("控制器/方法")}

我们的url映射习惯：类名和方法名都由驼峰变下划线，如...class ActionNode{... function delete ...}映射成url，我们就写@RequestMapping(value={"action_node/delete"})

```java
<a href='${z:u("action_node/detele")}?id=1' />
```

### 2. 针对后端快速开发

#### 2.1 提供ajax的json快速返回操作，ajaxReturn方法

使用方式如下：

```java
  @RequestMapping(value={"admin/delete"},method=RequestMethod.POST)
    public String adminDelete(HttpServletResponse response,Integer id) {
        adminService.delete(id);
        return ajaxReturn(response, null,"删除成功",1);
    }
```

> 很重要的一点：Controller类 需要继承 BaseController，不然无法使用 ajaxReturn()

ajaxReturn方法源码，重载了2个

```java
/**
     * ajax返回json数据
     * @param response
     * @param data 要返回的数据
     */
    public static String ajaxReturn(HttpServletResponse response,Object data){
        render(response,JSON.toJSONString(data),"json");
        return null;
    }
    
    /**
     * ajax返回json数据，参数重载
     * @param response
     * @param data 要返回的数据
     * @param info 返回的信息
     * @param status 返回的状态
     * @return
     */
    public static String ajaxReturn(HttpServletResponse response,Object data,String info,int status){
        Map<String, Object> jsonData = new HashMap<String,Object>();
        jsonData.put("data", data);
        jsonData.put("info", info);
        jsonData.put("status", status);
        
        render(response,JSON.toJSONString(jsonData),"json");
        return null;
    }
```

#### 2.2 提供sql查询链式操作，非常便捷

提供一个SQLBuilder类，一个SQLRunner的服务类，使用非常简单，复杂查询的利器。先贴一段用法介绍

```java
/**
 * sql查询语句生成器，用于简化复杂查询，采用连贯操作方式
 * ;mysql驱动
 * 使用示例:
 * SQLBuilder(User.class).fields("name","sex","dept_name").join(Dept.class,"User.did=Dept.id").where(HashMap).order("name","desc").page(1,10).buildSql();
 * 说明：
 *      where的用法：
 *          Map<String,Object> map = new HashMap<String,Object>();
 *          map.put("name","Simon"); //变成name='Simon'
 *          map.put("name",new String[]{"like","%Sim%"});
 *      where(map,"AND");
 *      where(map,"OR"); //where可以多次使用
 * @author Simon
 */
```

再来一个使用实例

```java
@Service
@Transactional
public class AdminService {

    @Autowired
    private SqlRunner sqlRunner;
    
    public List<Row> findBySQL(){
        
        String sql = SQLBuilder.getSQLBuilder(Admin.class).fields("nickname,login_name,add_time").where("id=#{0}").buildSql();
        return sqlRunner.select(sql,1);
    }
}
```

getSQLBuilder方法传入实体类class，自动解析表名的规则有2个：1是在Admin实体类中写一个@table(name="z_admin")注解，2是在jdbc.propertites中配置数据库表前缀,如"jdbc.prefix=z_",则会自动将Admin类名又驼峰变成下划线，然后加上表前缀。传入ActionNode.class则自动对应表z_action_node，所以你的表名要规范全部采用小写+下划线才行。

> 整合了 [zframe-ssi](https://github.com/cfansimon/zframe-ssi)的框架



