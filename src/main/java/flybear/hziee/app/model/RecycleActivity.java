package flybear.hziee.app.model;

import java.util.List;

public class RecycleActivity {

	private Integer id;
	private Integer userId;
	private Integer name;
	private Integer startTime;
	private Integer endTime;
	private String place;
	private Integer peopleCount;

    public void setId(Integer id){
        this.id = id;
    }
    public Integer getId(){
        return this.id;
    }
    public void setUserId(Integer userId){
        this.userId = userId;
    }
    public Integer getUserId(){
        return this.userId;
    }
    public void setName(Integer name){
        this.name = name;
    }
    public Integer getName(){
        return this.name;
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
}