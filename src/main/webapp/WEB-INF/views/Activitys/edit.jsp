<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://flybear.hziee/tags" prefix="z"%>


<form id="form" action="${__url__}/edit" method="post">
    <table align="center" class="form-table">
		
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="id" id="id" value="${list.id}" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="name" id="name" value="${list.name}" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="user_id" id="user_id" value="${list.user_id}" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="start_time" id="start_time" value="${list.start_time}" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="end_time" id="end_time" value="${list.end_time}" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="place" id="place" value="${list.place}" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="people_count" id="people_count" value="${list.people_count}" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="pass" id="pass" value="${list.pass}" />           			
				</td>
			</tr>
		
		<tr>
			<td>&nbsp;</td>
			<td>
			    <input type="hidden" name="id" id="id" value="${list.id}" />
				<button type="submit"  class="btn btn-small btn-success">确定</button>
				<button class="btn btn-primary btn-small J_close" type="button">返回</button>
			</td>
		</tr>
	</table>
</form>
