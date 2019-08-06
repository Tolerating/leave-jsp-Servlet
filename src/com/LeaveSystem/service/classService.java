package com.LeaveSystem.service;
import com.LeaveSystem.model.Class;

import java.sql.SQLException;

public interface classService {

    /**
     *  根据班级ID获取班级信息
     * @param classID 班级ID
     * @return Class
     */
    Class getClassInfoByClassID(String classID) throws SQLException;
}
