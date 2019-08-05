package com.LeaveSystem.service;
import com.LeaveSystem.model.Students;

import java.sql.SQLException;

public interface studentsService {
    /**
     * 通过学号获取学生信息
     * @param Num 学号
     * @return Students
     */
    Students getInfoByStudentNum(int Num);

    /**
     * 通过学号获取学生信息
     * @param Num 学号
     * @return int
     */
    int updatePwdByAdminInfo(String Num) throws SQLException;
}
