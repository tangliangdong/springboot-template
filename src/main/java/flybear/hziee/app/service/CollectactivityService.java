package flybear.hziee.app.service;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import flybear.hziee.app.mapper.CollectactivityMapper;
import flybear.hziee.app.model.Collectactivity;
import flybear.hziee.app.util.UIUtils;
import flybear.hziee.core.mybatis.SqlRunner;
import flybear.hziee.core.sql.Row;
import flybear.hziee.core.sql.SQLBuilder;


@Service
public class CollectactivityService {

    @Autowired
    private CollectactivityMapper mapper;
    
    @Autowired
	private SqlRunner sqlRunner;

    public List<Collectactivity> findAll() {
        return mapper.selectAll();
    }

    public Integer delete(Integer id){
        return mapper.deleteByPrimaryKey(id);
    }
    
    public Collectactivity findById(Integer id){
		return mapper.selectByPrimaryKey(id);
	}
	
	public Integer update(Collectactivity entity) throws Exception{
		return mapper.updateByPrimaryKey(entity);
	}

    public Integer save(Collectactivity entity) {
        return mapper.insert(entity);
    }

    public Map<String, Object> getUIGridData(Map<String, Object> where, Map<String, String> pageMap) {
        SQLBuilder sqlBuilder = SQLBuilder.getSQLBuilder(Collectactivity.class);
        String sql = sqlBuilder
                .fields("*")   //这里约定前端grid需要显示多少个具体列，也可以全部*
                .where(where)
                .parseUIPageAndOrder(pageMap)
                .order("id", "asc")
                .selectSql();
        List<Row> list = sqlRunner.select(sql);

        String countSql = sqlBuilder.fields("count(*)").where(where).selectSql();
        Integer count = sqlRunner.count(countSql);
        return UIUtils.getGridData(count, list);
    }
    
	public boolean collectactivityIsExist(String key){
			SQLBuilder sqlBuilder = SQLBuilder.getSQLBuilder(Collectactivity.class);
			String sql = sqlBuilder.fields("*").where("key='"+key+"'").selectSql();
			List<Row> list = sqlRunner.select(sql);
			if(list.size()==0){
				return false;
			}else{
				return true;
			}
		}
}
