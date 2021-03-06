package flybear.hziee.app.conf;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import flybear.hziee.app.interceptor.CoreInterceptor;
import flybear.hziee.core.base.BaseInterceptor;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("/static/");
    }
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new BaseInterceptor()).addPathPatterns("/**");  
        registry.addInterceptor(new CoreInterceptor()).addPathPatterns("/**").excludePathPatterns("/public");
        super.addInterceptors(registry);
    }
}
