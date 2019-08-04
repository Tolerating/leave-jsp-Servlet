package com.LeaveSystem.dao;
import com.LeaveSystem.model.*;
public interface loginDao {
    /**
     * 用户登录
     * @param name 账户
     * @param pwd 密码
     * @return AdminInfo
     */
     AdminInfo loginLeave(String name,String pwd);

}
