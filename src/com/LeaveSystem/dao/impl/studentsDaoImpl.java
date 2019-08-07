package com.LeaveSystem.dao.impl;
import com.LeaveSystem.dao.studentsDao;
import com.LeaveSystem.model.*;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.LeaveSystem.servlet.tools;
import sun.util.calendar.BaseCalendar;

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
     *  根据sql语句返回AdvanceDelay表
     * @param sql sql语句
     * @return AdvanceDelay
     */
    public AdvanceDelay SelectAdBySql(String sql){
        Statement smt = null;
        ResultSet rs = null;
        AdvanceDelay ad = new AdvanceDelay();
        Connection conn = tools.ConnSql();
        try {
            smt = conn.createStatement();
            rs = smt.executeQuery(sql);
            while (rs.next()){
                ad.setZcwgid(rs.getInt("Zcwgid"));
                ad.setStudentNum(rs.getString("StudentNum"));
                ad.setAdvanceReson(rs.getString("AdvanceReson"));
                ad.setAdvanceStudentT(rs.getString("AdvanceStudentT"));
                ad.setAdvanceTime(rs.getString("AdvanceTime"));
                ad.setDeatReson(rs.getString("DeatReson"));
                ad.setDelayStudentT(rs.getString("DelayStudentT"));
                ad.setDelayTime(rs.getString("DelayTime"));
                ad.setClassNum(rs.getString("ClassNum"));
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
        return ad;
    };
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

    /**
     * 更新学生电话
     * @param StuTel 电话
     * @param StuNum 学号
     * @return int
     */
    @Override
    public int updateStuTel(String StuTel, String StuNum) {
        Connection conn = tools.ConnSql();
        String sql = String.format("update [Students] set [StudentTel]='%s' where [StudentNum]='%s';",StuTel,StuNum);
        int result = 0;
        try {
            Statement smt = conn.createStatement();
            result = smt.executeUpdate(sql);

        }catch (Exception e){
            System.out.println(e);
        }

        return result;
    }

    /**
     *  学生自查当天早出晚归情况
     * @param studentNum 学号
     * @return AdvanceDelay
     */
    @Override
    public AdvanceDelay selectAdvanceDelay(String studentNum) {
        Date dt = new Date();
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
        String dateTime = ft.format(dt);
        String sql = String.format("SELECT * FROM [AdvanceDelay] WHERE convert(varchar(50),AdvanceTime,120) like '%s%%' and convert(varchar(50),DelayTime,120) like '%s%%' and StudentNum='%s'",dateTime,dateTime,studentNum);
        return SelectAdBySql(sql);
    }

    /**
     * 查询本周该学生是否未周六日请假
     * @param starttime 请假开始时间
     * @param endtime 请假结束时间
     * @param studentNum 学号
     * @return int
     */
    @Override
    public int checkWeekLeave(String starttime, String endtime,String studentNum) {
        Connection conn = tools.ConnSql();
        PreparedStatement smt = null;
        ResultSet rs = null;
        int result = 0;
        String sql = String.format("SELECT COUNT(*) FROM [WeekDays] WHERE WeekDaysStudentID='%s' and (WeekDaysStartTime between '%s' and '%s') and (WeekDaysEndtTime between '%s' and '%s');",studentNum,starttime,endtime,starttime,endtime);
        System.out.println(sql);
        try {
            smt = conn.prepareStatement(sql);
            rs = smt.executeQuery();
            while (rs.next()){
                result = rs.getInt(1);
            }
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            try {
                smt.close();
                conn.close();
            }catch (SQLException e){
                e.printStackTrace();
            }

        }

        return result;
    }


    /**
     * 插入周末请假记录
     * @param model WeekDays
     * @return int
     */
    @Override
    public int InsertWeekDays(WeekDays model) {
        Connection conn = tools.ConnSql();
        PreparedStatement smt = null;
        int result = 0;
        String sql = "INSERT INTO [WeekDays] ([WeekDaysStudentID],[WeekDaysStartTime],[WeekDaysEndtTime],[WeekDaysNumDays],[WeekDaysReason],[WeekDaysApprover],[WeekDaysStage],[WeekDaysApprovalResult],[WeekDaysApprovalTime],[LeaveRecordClassNum]) VALUES (?,?,?,?,?,?,?,?,?,?)";
        try {
            smt = conn.prepareStatement(sql);
            smt.setLong(1,model.getWeekDaysStudentId());
            smt.setString(2,model.getWeekDaysStartTime());
            smt.setString(3,model.getWeekDaysEndtTime());
            smt.setString(4,model.getWeekDaysNumDays());
            smt.setString(5,model.getWeekDaysReason());
            smt.setString(6,model.getWeekDaysApprover());
            smt.setString(7,model.getWeekDaysStage());
            smt.setString(8,model.getWeekDaysApprovalResult());
            smt.setString(9,model.getWeekDaysApprovalTime());
            smt.setString(10,model.getLeaveRecordClassNum());
            result = smt.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            try {
                smt.close();
                conn.close();
            }catch (SQLException e){
                e.printStackTrace();
            }
        }
        return result;
    }

    /**
     * 插入上课请假 , 早自习请假 , 不留宿请假
     * @param model LeaveRecord
     * @return int
     */
    @Override
    public int insertLeaveRecord(LeaveRecord model) {
        Connection conn = tools.ConnSql();
        PreparedStatement psmt = null;
        int result = 0;
        String sql = "INSERT INTO [LeaveRecord] ([LeaveRecordStudentID],[LeaveRecordReason],[LeaveRecordStartTime],[LeaveRecordEndtTime],[LeaveRecordStartLesson],[LeaveRecordEndLesson],[LeaveRecordCategory],[LeaveRecordNumDays],[LeaveRecordApprover],[LeaveRecordStage],[LeaveRecordApprovalResult],[LeaveRecordApprovalTime],[LeaveRecordSumLesson],[LeaveRecordClassNum]) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            psmt = conn.prepareStatement(sql);
            psmt.setLong(1,model.getLeaveRecordStudentId());
            psmt.setString(2,model.getLeaveRecordReason());
            psmt.setString(3,model.getLeaveRecordStartTime());
            psmt.setString(4,model.getLeaveRecordEndtTime());
            psmt.setLong(5,model.getLeaveRecordStartLesson());
            psmt.setLong(6,model.getLeaveRecordEndLesson());
            psmt.setString(7,model.getLeaveRecordCategory());
            psmt.setLong(8,model.getLeaveRecordNumDays());
            psmt.setString(9,model.getLeaveRecordApprover());
            psmt.setLong(10,model.getLeaveRecordStage());
            psmt.setString(11,model.getLeaveRecordApprovalResult());
            psmt.setString(12,model.getLeaveRecordApprovalTime());
            psmt.setLong(13,model.getLeaveRecordSumLesson());
            psmt.setString(14,model.getLeaveRecordClassNum());
            result = psmt.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            try {
                psmt.close();
                conn.close();
            }catch (SQLException e){
                e.printStackTrace();
            }
        }
        return result;
    }

    /**
     * 插入早出晚归请假
     * @param model AdvanceDelay
     * @return int
     */
    @Override
    public int insertIntoAdvanceDelay(AdvanceDelay model) {
        Connection conn = tools.ConnSql();
        PreparedStatement psmt = null;
        int result = 0;
        String sql = "INSERT INTO [AdvanceDelay] ([StudentNum],[ClassNum],[AdvanceTime],[AdvanceReson],[AdvanceStudentT],[DelayTime],[DeatReson],[DelayStudentT]) VALUES (?,?,?,?,?,?,?,?)";
        try {
            psmt = conn.prepareStatement(sql);
            psmt.setString(1,model.getStudentNum());
            psmt.setString(2,model.getClassNum());
            psmt.setString(3,model.getAdvanceTime());
            psmt.setString(4,model.getAdvanceReson());
            psmt.setString(5,model.getAdvanceStudentT());
            psmt.setString(6,model.getDelayTime());
            psmt.setString(7,model.getDeatReson());
            psmt.setString(8,model.getDelayStudentT());
            result = psmt.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            try {
                psmt.close();
                conn.close();
            }catch (SQLException e){
                e.printStackTrace();
            }
        }
        return result;
    }

    /**
     * 更新AdvanceDelay表
     * @param model AdvanceDelay
     * @return int
     */
    @Override
    public int updateAdvanceDelay(AdvanceDelay model) {
        Connection conn = tools.ConnSql();
        PreparedStatement psmt = null;
        int result = 0;
        String sql = "UPDATE [AdvanceDelay] SET [StudentNum] = ISNULL(?,[StudentNum]),[ClassNum] = ISNULL(?,[ClassNum]),[AdvanceTime] = ISNULL(?,[AdvanceTime]),[AdvanceReson] = ISNULL(?,[AdvanceReson]),[AdvanceStudentT] = ISNULL(?,[AdvanceStudentT]),[DelayTime] = ISNULL(?,[DelayTime]),[DeatReson] = ISNULL(?,[DeatReson]),[DelayStudentT] = ISNULL(?,[DelayStudentT]) WHERE [ZCWGID]=?;";
        try {
            psmt = conn.prepareStatement(sql);
            psmt.setString(1,model.getStudentNum());
            psmt.setString(2,model.getClassNum());
            psmt.setString(3,model.getAdvanceTime());
            psmt.setString(4,model.getAdvanceReson());
            psmt.setString(5,model.getAdvanceStudentT());
            psmt.setString(6,model.getDelayTime());
            psmt.setString(7,model.getDeatReson());
            psmt.setString(8,model.getDelayStudentT());
            psmt.setInt(9,model.getZcwgid());
            result = psmt.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            try {
                psmt.close();
                conn.close();
            }catch (SQLException e){
                e.printStackTrace();
            }
        }
        return result;
    }

    /**
     *  通过教师工号获取教师信息
     * @param teacherNum 教师工号
     * @return Teachers
     */
    @Override
    public Teachers selectTeacherByNum(String teacherNum) {
        Connection conn = tools.ConnSql();
        Statement smt = null;
        ResultSet rs = null;
        Teachers tea = new Teachers();
        String sql = String.format("SELECT * FROM [Teachers] WHERE [TeacherNum]=%s;",teacherNum);
        try{
            smt = conn.createStatement();
            rs = smt.executeQuery(sql);
            while (rs.next()){
                tea.setTeacherId(rs.getLong("TeacherId"));
                tea.setTeacherNum(rs.getString("TeacherNum"));
                tea.setTeacherPass(rs.getString("TeacherPass"));
                tea.setTeacherName(rs.getString("TeacherName"));
                tea.setTeacherSex(rs.getString("TeacherSex"));
                tea.setTeacherTel(rs.getString("TeacherTel"));
                tea.setPost(rs.getString("Post"));
                tea.setTeacherIdCard(rs.getString("TeacherIdCard"));
                tea.setTeacherApprover(rs.getString("TeacherApprover"));
                tea.setTeacherApprovalResult(rs.getString("TeacherApprovalResult"));
                tea.setTeacherApprovalTime(rs.getTimestamp("TeacherApprovalTime"));
            }
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            try {
                rs.close();
                smt.close();
                conn.close();
            }catch (SQLException e){
                e.printStackTrace();
            }
        }
        return  tea;
    }
}
