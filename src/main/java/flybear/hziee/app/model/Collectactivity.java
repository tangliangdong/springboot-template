package flybear.hziee.app.model;

import java.util.List;

public class Collectactivity {

	private Integer activityId;
	private Integer userId;

    public void setActivityId(Integer activityId){
        this.activityId = activityId;
    }
    public Integer getActivityId(){
        return this.activityId;
    }
    public void setUserId(Integer userId){
        this.userId = userId;
    }
    public Integer getUserId(){
        return this.userId;
    }
}