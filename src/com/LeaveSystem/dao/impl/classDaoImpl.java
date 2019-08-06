package com.LeaveSystem.dao.impl;
import com.LeaveSystem.model.AdminInfo;
import com.LeaveSystem.model.Class;
import com.LeaveSystem.dao.classDao;
import com.LeaveSystem.servlet.tools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class classDaoImpl implements classDao{

    public Class SelectBySql(String sql) throws SQLException {
        Statement smt = null;
        ResultSet rs = null;
        Class cla = new Class();
        Connection conn = tools.ConnSql();
        try {
            smt = conn.createStatement();
            rs = smt.executeQuery(sql);
            while(rs.next()){
                cla.setClassId(rs.getLong("ClassId"));
                cla.setClassNum(rs.getString("ClassNum"));
                cla.setClassName(rs.getString("ClassName"));
                cla.setClassHeadTeacherId(rs.getLong("ClassHeadTeacherId"));
                cla.setClassSpecialityId(rs.getLong("ClassSpecialityId"));
                cla.setClassSpecialityTeacherId(rs.getLong("ClassSpecialityTeacherId"));
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            rs.close();
            smt.close();
            conn.close();
        }
        return cla;
    }

    /**
     * 根据班级ID获取班级信息
     * @param classID 班级ID
     * @return Class
     * @throws SQLException
     */
    @Override
    public Class getClassInfoByClassID(String classID) throws SQLException {
        String sql = String.format("select * from [Class] where ClassNum='%s'",classID);
        return SelectBySql(sql);
    }
}
