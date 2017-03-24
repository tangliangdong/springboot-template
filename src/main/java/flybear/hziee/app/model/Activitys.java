package flybear.hziee.app.model;

import java.util.List;

public class Activitys {

	private Integer id;
	private String name;
	private Integer userId;
	private Integer startTime;
	private Integer endTime;
	private String place;
	private Integer peopleCount;
	private Integer pass;

    public void setId(Integer id){
        this.id = id;
    }
    public Integer getId(){
        return this.id;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return this.name;
    }
    public void setUserId(Integer userId){
        this.userId = userId;
    }
    public Integer getUserId(){
        return this.userId;
    }
    public void setStartTime(Integer startTime){
        this.startTime = startTime;
    }
    public Integer getStartTime(){
        return this.startTime;
    }
    public void setEndTime(Integer endTime){
        this.endTime = endTime;
    }
    public Integer getEndTime(){
        return this.endTime;
    }
    public void setPlace(String place){
        this.place = place;
    }
    public String getPlace(){
        return this.place;
    }
    public void setPeopleCount(Integer peopleCount){
        this.peopleCount = peopleCount;
    }
    public Integer getPeopleCount(){
        return this.peopleCount;
    }
    public void setPass(Integer pass){
        this.pass = pass;
    }
    public Integer getPass(){
        return this.pass;
    }
}