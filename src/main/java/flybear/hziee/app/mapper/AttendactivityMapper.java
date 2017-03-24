package flybear.hziee.app.mapper;


import flybear.hziee.app.model.Attendactivity;
import java.util.List;

public interface AttendactivityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Attendactivity record);

    Attendactivity selectByPrimaryKey(Integer id);

    List<Attendactivity> selectAll();

    int updateByPrimaryKey(Attendactivity record);
    
}