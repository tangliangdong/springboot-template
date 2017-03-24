<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://flybear.hziee/tags" prefix="z"%>


<form id="form" action="${__url__}/edit" method="post">
    <table align="center" class="form-table">
		
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="activity_id" id="activity_id" value="${list.activity_id}" />           			
				</td>
			</tr>
			<tr>
				<td>：</td>
				<td>
					<input type="text" name="user_id" id="user_id" value="${list.user_id}" />           			
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
