package com.LeaveSystem.dao.impl;
import com.LeaveSystem.dao.loginDao;
import com.LeaveSystem.model.AdminInfo;
import java.sql.*;

public class loginDaoImpl implements loginDao {
    private static String ConnUrl = "jdbc:sqlserver://localhost:1433;DatabaseName=Leave";
    /**
     *  根据sql语句查询AdminInfo表
     * @param sql 查询语句
     * @return AdminInfo
     */
    public AdminInfo SelectBySql(String sql) {
        Connection conn = null;
        Statement smt = null;
        ResultSet rs = null;
        AdminInfo admin = new AdminInfo();
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver").newInstance();
            System.out.println("加载驱动成功");
        } catch (InstantiationException | IllegalAccessException | ClassNotFoundException e1) {

            e1.printStackTrace();
            System.out.println("加载驱动失败");
        }
        try {
            conn = DriverManager.getConnection(ConnUrl,"sa","123");
            System.out.println("数据库连接成功");
        }catch(Exception e){
            System.out.println("数据库连接失败");
        }
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
}
