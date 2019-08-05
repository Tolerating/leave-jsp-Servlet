package com.LeaveSystem.dao.impl;
import com.LeaveSystem.dao.adminInfoDao;
import com.LeaveSystem.model.AdminInfo;
import java.sql.*;
import com.LeaveSystem.servlet.tools;

public class adminInfoDaoImpl implements adminInfoDao {
    /**
     *  根据sql语句查询AdminInfo表
     * @param sql 查询语句
     * @return AdminInfo
     */
    public AdminInfo SelectBySql(String sql) {
        Statement smt = null;
        ResultSet rs = null;
        AdminInfo admin = new AdminInfo();
        Connection conn = tools.ConnSql();
        try {
            smt = conn.createStatement();
            rs = smt.executeQuery(sql);
            while(rs.next()){
                admin.setAdminID(rs.getInt("AdminID"));
                admin.setAdminJurisdictionID(rs.getString("AdminJurisdictionID"));
                admin.setAdminLoginID(rs.getInt("AdminLoginID"));
                admin.setAdminName(rs.getString("AdminName"));
                admin.setAdnminPasssword(rs.getString("AdnminPasssword"));
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            try {
                smt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return admin;
    }

    /**
     * 用户登录
     * @param name 账户
     * @param pwd 密码
     * @return AdminInfo
     */
    @Override
    public AdminInfo loginLeave(String name, String pwd) {
        String sql = String.format("select * from [AdminInfo] where AdminLoginID='%s' and AdnminPasssword='%s'",name,pwd);
        System.out.println(sql);
        AdminInfo admin = SelectBySql(sql);
        return admin;
    }

    /**
     *  更新密码
     * @param name 账户
     * @param pwd 密码
     * @return int
     */
    @Override
    public int updatePassword(String name, String pwd) throws SQLException {
        Connection conn = tools.ConnSql();
        String sql = String.format("update [AdminInfo] set [AdnminPasssword]='%s' WHERE [AdminLoginID]='%s'",pwd,name);
        Statement smt = conn.createStatement();
        int result = smt.executeUpdate(sql);
        smt.close();
        conn.close();
        return result;
    }
}
