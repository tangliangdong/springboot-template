package flybear.hziee.app.mapper;


import flybear.hziee.app.model.Collectactivity;
import java.util.List;

public interface CollectactivityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Collectactivity record);

    Collectactivity selectByPrimaryKey(Integer id);

    List<Collectactivity> selectAll();

    int updateByPrimaryKey(Collectactivity record);
    
}