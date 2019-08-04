package com.LeaveSystem.service.impl;
import com.LeaveSystem.model.AdminInfo;
import com.LeaveSystem.service.loginService;
import  com.LeaveSystem.dao.impl.*;
public class loginServiceImpl implements loginService {
    /**
     * 声明全局的 loginDaoImpl对象
     */
    loginDaoImpl lgDao = new loginDaoImpl();

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
}
