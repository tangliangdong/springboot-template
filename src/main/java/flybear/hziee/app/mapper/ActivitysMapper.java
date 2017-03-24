package flybear.hziee.app.mapper;


import flybear.hziee.app.model.Activitys;
import java.util.List;

public interface ActivitysMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Activitys record);

    Activitys selectByPrimaryKey(Integer id);

    List<Activitys> selectAll();

    int updateByPrimaryKey(Activitys record);
    
}