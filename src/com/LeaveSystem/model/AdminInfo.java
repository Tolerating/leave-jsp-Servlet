package com.LeaveSystem.model;

public class AdminInfo {
    private int AdminID;

    /// <summary>
    /// 登录名
    /// </summary>
    private int AdminLoginID;

    /// <summary>
    /// 管理员密码
    /// </summary>
    private String AdnminPasssword;

    /// <summary>
    /// 管理员名称
    /// </summary>
    private String AdminName;

    /// <summary>
    /// 权限ID
    /// </summary>
    private String AdminJurisdictionID;

    public int getAdminID() {
        return AdminID;
    }

    public void setAdminID(int adminID) {
        AdminID = adminID;
    }

    public int getAdminLoginID() {
        return AdminLoginID;
    }

    public void setAdminLoginID(int adminLoginID) {
        AdminLoginID = adminLoginID;
    }

    public String getAdnminPasssword() {
        return AdnminPasssword;
    }

    public void setAdnminPasssword(String adnminPasssword) {
        AdnminPasssword = adnminPasssword;
    }

    public String getAdminName() {
        return AdminName;
    }

    public void setAdminName(String adminName) {
        AdminName = adminName;
    }

    public String getAdminJurisdictionID() {
        return AdminJurisdictionID;
    }

    public void setAdminJurisdictionID(String adminJurisdictionID) {
        AdminJurisdictionID = adminJurisdictionID;
    }


}
