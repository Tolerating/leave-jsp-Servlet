package com.LeaveSystem.service.impl;
import com.LeaveSystem.model.Students;
import com.LeaveSystem.service.studentsService;
import com.LeaveSystem.dao.impl.studentsDaoImpl;

import java.sql.SQLException;

public class studentsServiceImpl implements studentsService{
    studentsDaoImpl stuDao = new studentsDaoImpl();

    /**
     * 通过学号获取学生信息
     * @param Num 学号
     * @return
     */
    @Override
    public Students getInfoByStudentNum(int Num) {
        return stuDao.getInfoByStudentNum(Num);
    }

    /**
     * 通过学号获取学生信息
     * @param Num 学号
     * @return int
     */
    @Override
    public int updatePwdByAdminInfo(String Num) throws SQLException {return stuDao.updatePwdByAdminInfo(Num);}
}
