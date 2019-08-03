package com.LeaveSystem.service;

import com.LeaveSystem.model.AdminInfo;

public interface loginService {
    /**
     * 用户登录
     * @param name 账户
     * @param pwd 密码
     * @return AdminInfo
     */
    AdminInfo loginLeave(String name, String pwd);
}
