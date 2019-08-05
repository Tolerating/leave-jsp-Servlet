package com.LeaveSystem.service.impl;
import com.LeaveSystem.model.AdminInfo;
import com.LeaveSystem.service.adminInfoService;
import  com.LeaveSystem.dao.impl.*;

import java.sql.SQLException;

public class adminInfoServiceImpl implements adminInfoService {
    /**
     * 声明全局的 loginDaoImpl对象
     */
    adminInfoDaoImpl lgDao = new adminInfoDaoImpl();

    /**
     * 用户登录
     * @param name 账户
     * @param pwd 密码
     * @return AdminInfo
     */
    @Override
    public AdminInfo loginLeave(String name, String pwd) {
        return lgDao.loginLeave(name,pwd);
    }

    /**
     * 更新密码
     * @param name 账户
     * @param pwd 密码
     * @return int
     */
    @Override
    public int updatePassword(String name, String pwd) throws SQLException { return lgDao.updatePassword(name,pwd); }
}
