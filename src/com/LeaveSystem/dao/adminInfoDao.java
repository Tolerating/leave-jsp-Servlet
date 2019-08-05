package com.LeaveSystem.dao;
import com.LeaveSystem.model.*;

import java.sql.SQLException;

public interface adminInfoDao {
    /**
     * 用户登录
     * @param name 账户
     * @param pwd 密码
     * @return AdminInfo
     */
     AdminInfo loginLeave(String name,String pwd);

    /**
     * 更新密码
     * @param name 账户
     * @param pwd 密码
     * @return int
     */
     int updatePassword(String name,String pwd) throws SQLException;
}
