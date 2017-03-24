<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://flybear.hziee/tags" prefix="z"%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>基础页面</title>
	<%-- <link rel="stylesheet" href="${__static__}/">
	<script type="text/javascript" src="${__static__}/"></script> --%>
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
<!-- 头部 -->
<div id="footer"></div>
<!-- 自定义JS添加到尾部 -->
<z:block name="js">
</z:block>
</body>
</html>