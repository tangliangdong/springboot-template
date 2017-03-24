package flybear.hziee.app.model;

import java.util.List;

public class User {

	private Integer id;
	private String username;
	private String password;
	private String showname;
	private Integer power;

    public void setId(Integer id){
        this.id = id;
    }
    public Integer getId(){
        return this.id;
    }
    public void setUsername(String username){
        this.username = username;
    }
    public String getUsername(){
        return this.username;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public String getPassword(){
        return this.password;
    }
    public void setShowname(String showname){
        this.showname = showname;
    }
    public String getShowname(){
        return this.showname;
    }
    public void setPower(Integer power){
        this.power = power;
    }
    public Integer getPower(){
        return this.power;
    }
}