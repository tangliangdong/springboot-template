package flybear.hziee.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import flybear.hziee.core.base.BaseController;

@Controller
@RequestMapping("index")
public class IndexController extends BaseController{
	
	@RequestMapping("")
	public String index(){
		return "index/index";
	}
}
