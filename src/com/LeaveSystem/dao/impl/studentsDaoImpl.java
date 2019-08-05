package com.LeaveSystem.dao.impl;
import com.LeaveSystem.dao.studentsDao;
import com.LeaveSystem.model.Students;

import java.sql.*;

import com.LeaveSystem.servlet.tools;

public class studentsDaoImpl implements studentsDao {
    /**
     *  根据SQL语句查询Students表
     * @param sql sql语句
     * @return Students
     */
    public Students SelectBySql(String sql){
        Statement smt = null;
        ResultSet rs = null;
        Students stu = new Students();
        Connection conn = tools.ConnSql();
        try {
            smt = conn.createStatement();
            rs = smt.executeQuery(sql);
            while (rs.next()){
                stu.setStudentId(rs.getLong("StudentId"));
                stu.setStudentNum(rs.getString("StudentNum"));
                stu.setStudentPass(rs.getString("StudentPass"));
                stu.setStudentName(rs.getString("StudentName"));
                stu.setStudentTel(rs.getString("StudentTel"));
                stu.setStudentSex(rs.getString("StudentSex"));
                stu.setStudentClassId(rs.getString("StudentClassId"));
                stu.setStudentIdCard(rs.getString("StudentIdCard"));
                stu.setStudentBedroomNum(rs.getString("StudentBedroomNum"));
                stu.setStudentParentTel(rs.getString("StudentParentTel"));
                stu.setStudentHomeAddress(rs.getString("StudentHomeAddress"));
                stu.setStudentApprover(rs.getString("StudentApprover"));
                stu.setStudentApprovalResult(rs.getString("StudentApprovalResult"));
                stu.setStudentApprovalTime(rs.getTimestamp("StudentApprovalTime"));
            }
        }catch (Exception e){
            System.out.println(e);
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
        System.out.println(stu.getStudentApprovalResult());
        return stu;

    }

    /**
     *  通过学号获取学生信息
     * @param Num 学号
     * @return Students
     */
    @Override
    public Students getInfoByStudentNum(int Num) {
        String sql = String.format("SELECT * FROM [Students] WHERE [StudentNum]='%d'",Num);
        System.out.println(sql);
        return SelectBySql(sql);
    }

    /**
     * 根据AdminInfo表更新密码
     * @param Num 学号
     * @return int
     */
    @Override
    public int updatePwdByAdminInfo(String Num) throws SQLException {
        Connection conn = tools.ConnSql();
        Statement smt = conn.createStatement();
        String sql = String.format("UPDATE [Students] SET [Students].[StudentPass] =c.[AdnminPasssword] from [AdminInfo] ,(select [AdminLoginID],[AdnminPasssword] from [AdminInfo] where [AdminLoginID]='%s')as c where [Students].[StudentNum]=c.[AdminLoginID]",Num);
        int result = smt.executeUpdate(sql);
        smt.close();
        conn.close();
        return result;
    }
}
