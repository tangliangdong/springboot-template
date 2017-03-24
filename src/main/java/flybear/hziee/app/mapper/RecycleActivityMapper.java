package flybear.hziee.app.mapper;


import flybear.hziee.app.model.RecycleActivity;
import java.util.List;

public interface RecycleActivityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RecycleActivity record);

    RecycleActivity selectByPrimaryKey(Integer id);

    List<RecycleActivity> selectAll();

    int updateByPrimaryKey(RecycleActivity record);
    
}