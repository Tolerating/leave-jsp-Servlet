package com.LeaveSystem.service.impl;
import com.LeaveSystem.model.Class;
import com.LeaveSystem.dao.impl.classDaoImpl;
import com.LeaveSystem.service.classService;

import java.sql.SQLException;

public class classServiceImpl implements classService{
    classDaoImpl classDao = new classDaoImpl();

    /**
     * 根据班级ID获取班级信息
     * @param classID 班级ID
     * @return Class
     */
    @Override
    public Class getClassInfoByClassID(String classID) throws SQLException {
        return classDao.getClassInfoByClassID(classID);
    }
}
