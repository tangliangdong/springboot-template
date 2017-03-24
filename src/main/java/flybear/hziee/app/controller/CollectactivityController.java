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

import flybear.hziee.app.service.CollectactivityService;
import flybear.hziee.app.util.UIUtils;
import flybear.hziee.app.model.Collectactivity;
import flybear.hziee.core.base.BaseController;
import flybear.hziee.core.sql.Row;
import flybear.hziee.core.util.UploadUtils;

@Controller
@RequestMapping("Collectactivity")
public class CollectactivityController extends BaseController{

	@Autowired
	private CollectactivityService CollectactivityService;

	@RequestMapping(value={"add"})
	public String add(Model model,HttpServletRequest request,HttpServletResponse response,Collectactivity Collectactivity) throws Exception {
		if (request.getMethod().equals("POST")) {
			int flag = CollectactivityService.save(Collectactivity);
			if (flag == 1) {
				return ajaxReturn(response, null, "添加成功", 1);
			} else {
				return ajaxReturn(response, null, "添加失败", 0);
			}
		} else {
			return "Collectactivity/add";
		}
	}	

	@RequestMapping(value={"edit"})
	public String edit(Model model,HttpServletRequest request,HttpServletResponse response,Collectactivity Collectactivity) throws Exception {
		if (request.getMethod().equals("POST")) {
			if(Collectactivity != null){
				CollectactivityService.update(Collectactivity);
				return ajaxReturn(response, null, "修改成功", 1);
			}else{
				return ajaxReturn(response, null, "修改失败", 0);
			}
		}else{
			String id = request.getParameter("id");
			Collectactivity entity = CollectactivityService.findById(Integer.valueOf(id));
			model.addAttribute("list", entity);
			return "Collectactivity/edit";
		}
		
	}

	@RequestMapping(value={"list"})
	public String list(Model model,HttpServletRequest request,HttpServletResponse response) {
		if(request.getMethod().equals("POST")){			
			Map<String, Object>	list = CollectactivityService.getUIGridData(null,UIUtils.getPageParams(request));
			return ajaxReturn(response,list);
		}
		else{
			return "Collectactivity/list";
		}
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public String delete(HttpServletRequest request,HttpServletResponse response,Integer id) throws Exception {
		int flag = CollectactivityService.delete(id);
		if (flag == 1) {
			return ajaxReturn(response, null, "删除成功", 1);
		} else {
			return ajaxReturn(response, null, "删除失败", 0);
		}
		
	}

}

