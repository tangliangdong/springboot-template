<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://flybear.hziee/tags" prefix="z"%>
<form action="${z:u('file/save')}" method="post" enctype="multipart/form-data">
    <input name="title" type="text" />	
	<input name="data" type="file"/>
	<input type="submit" />
</form>
