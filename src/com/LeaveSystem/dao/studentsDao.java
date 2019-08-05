package com.LeaveSystem.dao;
import com.LeaveSystem.model.*;

import java.sql.SQLException;

public interface studentsDao {
    /**
     * 通过学号获取学生信息
     * @param Num 学号
     * @return Students
     */
    Students getInfoByStudentNum(int Num);

    /**
     * 根据AdminInfo表更新密码
     * @param Num 学号
     * @return int
     */
    int updatePwdByAdminInfo(String Num) throws SQLException;
}
