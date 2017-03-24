package flybear.hziee.app.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import flybear.hziee.app.service.RecycleActivityService;
import flybear.hziee.app.util.UIUtils;
import flybear.hziee.app.model.RecycleActivity;
import flybear.hziee.core.base.BaseController;
import flybear.hziee.core.sql.Row;
import flybear.hziee.core.util.UploadUtils;

@Controller
@RequestMapping("RecycleActivity")
public class RecycleActivityController extends BaseController{

	@Autowired
	private RecycleActivityService RecycleActivityService;

	@RequestMapping(value={"add"})
	public String add(Model model,HttpServletRequest request,HttpServletResponse response,RecycleActivity RecycleActivity) throws Exception {
		if (request.getMethod().equals("POST")) {
			int flag = RecycleActivityService.save(RecycleActivity);
			if (flag == 1) {
				return ajaxReturn(response, null, "添加成功", 1);
			} else {
				return ajaxReturn(response, null, "添加失败", 0);
			}
		} else {
			return "RecycleActivity/add";
		}
	}	

	@RequestMapping(value={"edit"})
	public String edit(Model model,HttpServletRequest request,HttpServletResponse response,RecycleActivity RecycleActivity) throws Exception {
		if (request.getMethod().equals("POST")) {
			if(RecycleActivity != null){
				RecycleActivityService.update(RecycleActivity);
				return ajaxReturn(response, null, "修改成功", 1);
			}else{
				return ajaxReturn(response, null, "修改失败", 0);
			}
		}else{
			String id = request.getParameter("id");
			RecycleActivity entity = RecycleActivityService.findById(Integer.valueOf(id));
			model.addAttribute("list", entity);
			return "RecycleActivity/edit";
		}
		
	}

	@RequestMapping(value={"list"})
	public String list(Model model,HttpServletRequest request,HttpServletResponse response) {
		if(request.getMethod().equals("POST")){			
			Map<String, Object>	list = RecycleActivityService.getUIGridData(null,UIUtils.getPageParams(request));
			return ajaxReturn(response,list);
		}
		else{
			return "RecycleActivity/list";
		}
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public String delete(HttpServletRequest request,HttpServletResponse response,Integer id) throws Exception {
		int flag = RecycleActivityService.delete(id);
		if (flag == 1) {
			return ajaxReturn(response, null, "删除成功", 1);
		} else {
			return ajaxReturn(response, null, "删除失败", 0);
		}
		
	}

}

