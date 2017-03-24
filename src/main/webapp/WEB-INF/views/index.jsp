<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://flybear.hziee/tags" prefix="z"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'MyJsp.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
		<script>
			var ZLZ = window.ZLZ = {
				"ROOT"   : "${__root__}",
				"URL"    : "${__url__}",
				"STATIC" : "${__static__}"
			};
		</script>
  </head>
  
  <body>
    <c:forEach items="${list }" var="data">
    ${data.username }--${data.password}<br>
    </c:forEach>
    
    <a href="${z:u('login/list') }">test</a>
    <br>

    <z:override name="js">
    		ffffffffff
    </z:override>
    <br>
    "ROOT"   : "${__root__}",<br>
				"URL"    : "${__url__}",<br>
				"STATIC" : "${__static__}"
	<a href='${__static__}/css/style.css'>style.cssxxx</a>
  </body>
</html>
<%@ include file="top.jsp" %>