<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://flybear.hziee/tags" prefix="z"%>

<form id="form" action="${__url__}/add" method="post">
	<table align="center" class="form-table">
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="id" id="id" value="" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="userId" id="userId" value="" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="name" id="name" value="" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="startTime" id="startTime" value="" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="endTime" id="endTime" value="" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="place" id="place" value="" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="peopleCount" id="peopleCount" value="" />           			
				</td>
			</tr>
			<tr>
				<td>&nbsp;</td>
				<td>
					<button type="submit" class="btn btn-small btn-success">确定</button>
					<button class="btn btn-primary btn-small J_close" type="button">返回</button>
				</td>
			</tr>
	</table>
</form>
