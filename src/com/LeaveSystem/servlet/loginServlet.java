package com.LeaveSystem.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.lang.Class;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.LeaveSystem.model.*;
import com.LeaveSystem.service.impl.*;
import net.sf.json.JSON;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import net.sf.json.JSONObject;
import org.omg.PortableInterceptor.INACTIVE;


@WebServlet(name = "login",value = "/login")
public class loginServlet extends HttpServlet {
    private Logger logger = LogManager.getLogger(loginServlet.class);
    adminInfoServiceImpl lgService = new adminInfoServiceImpl();
    studentsServiceImpl stuService = new studentsServiceImpl();
    classServiceImpl classService = new classServiceImpl();
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
//        System.out.println(req.getCharacterEncoding());
        resp.setContentType("text/json;charset=utf-8");
        String oper = req.getParameter("oper");
        System.out.println(oper);
//        loginLeave(req,resp);
        if ("loginLeave".equals(oper)){
            loginLeave(req,resp);
        }else if("forgetPwd".equals(oper)){
            forgetPwd(req,resp);
        }else if("checkCode".equals(oper)){
            checkCode(req,resp);
        }else if ("updatePwd".equals(oper)){
            try {
                updatePwd(req,resp);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }else if("getStudentInfo".equals(oper)){
            getStudentInfo(req,resp);
        }else if("getClassInfo".equals(oper)){
            try {
                getClassInfo(req,resp);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }else if("updateStudentTel".equals(oper)){
            updateStudentTel(req,resp);
        }else if("selectAdvanceDelay".equals(oper)){
            selectAdvanceDelay(req,resp);
        }else if("insertLeaveRecord".equals(oper)){
            insertLeaveRecord(req,resp);
        }else if("InsertWeekDays".equals(oper)){
            InsertWeekDays(req,resp);
        }else if("checkWeekLeave".equals(oper)){
            checkWeekLeave(req,resp);
        }else if("insertIntoAdvanceDelay".equals(oper)){
            insertIntoAdvanceDelay(req,resp);
        }else{
            System.out.println("没有找到对应的操作符" + oper);
        }
    }

    /**
     *  学生登录
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     * @throws IOException
     */
    private void loginLeave(HttpServletRequest req,HttpServletResponse resp) throws IOException {

        String name = req.getParameter("Name");
        System.out.println(name);
        String pwd = req.getParameter("Pwd");
        String result = "";
        AdminInfo model = lgService.loginLeave(name,pwd);
        JSONObject obj = JSONObject.fromObject(model);
        System.out.println(obj.toString());
        logger.debug(name +"发起登录请求");
        if (model.getAdminID() == 0)
        {
            logger.debug(name+"登录失败");
            result = "-1";
        }
        else
        {
            logger.debug(model.getAdminName()+"登录成功");
           result = "1";
            HttpSession session = req.getSession(true);
            session.setAttribute("AdminInfo",model);
            AdminInfo ad = (AdminInfo)session.getAttribute("AdminInfo");
            System.out.println(ad.getAdminName());
        }
        Writer out = resp.getWriter();
        out.write(result);
        out.flush();
    }

    /**
     * 忘记密码
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     * @throws IOException
     */
    private void forgetPwd(HttpServletRequest req,HttpServletResponse resp) throws IOException{
        int studentNum = Integer.parseInt(req.getParameter("studentNum"));
        int code = (int)((Math.random()*9+1)*1000);
        System.out.println(code);
        HttpSession session = req.getSession(true);
        session.setAttribute("code",code);
        session.setAttribute("studentNum",studentNum);
        String msg = String.format("【温州科技职业学院】 您的验证码为:%d,有效时间为: 10分钟,请不要把验证码泄露给其他人。如非本人操作，可不用理会！",code);
        Students stu = stuService.getInfoByStudentNum((studentNum));
        System.out.println(stu.getStudentTel());
        String phone = stu.getStudentTel();
        System.out.println(phone);
        String result = "";
        if (phone != "" || phone != null){
            result = "1";
            //result = tools.sendMSG(phone,msg);
        }else{
            result = "-7";

        }
        Writer out = resp.getWriter();
        out.write(result);
        out.flush();
    }

    /**
     * 检查验证码是否正确
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     * @throws IOException
     */
    private void checkCode(HttpServletRequest req,HttpServletResponse resp) throws IOException{
        String reqCode = req.getParameter("Code");
        int studentNum = Integer.parseInt(req.getParameter("studentNum"));
        HttpSession session = req.getSession(true);
        String code = session.getAttribute("code").toString();
        int num = (int)session.getAttribute("studentNum");
//        System.out.println(code);
//        System.out.println(num);
//        System.out.println(reqCode);
        String result = "";
        if (!reqCode.equals(code))
        {
            result = "-1";
        }else if(studentNum != num){
            result = "-2";
        }else{
            result = "1";
        }
        session.removeAttribute("code");
        session.removeAttribute("studentNum");
        Writer out = resp.getWriter();
        out.write(result);
        out.flush();
    }
    /**
     * 更新密码
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     * @throws IOException
     */
    private void  updatePwd(HttpServletRequest req,HttpServletResponse resp) throws IOException, SQLException {
        String studentNum = req.getParameter("studentNum");
        String pwd = req.getParameter("passnew");
        String result = "-1";
        if (lgService.updatePassword(studentNum,pwd) > 0){
            if (stuService.updatePwdByAdminInfo(studentNum) > 0){
                logger.debug(studentNum+"成功更新了密码");
                result = "1";
            }
        }
        Writer out = resp.getWriter();
        out.write(result);
        out.flush();
    }

    /**
     * 获取学生信息
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     */
    private void getStudentInfo(HttpServletRequest req,HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession(true);
        AdminInfo admin = (AdminInfo)session.getAttribute("AdminInfo");
        //int studentNum = Integer.parseInt(req.getParameter("studentNum"));
        System.out.println(admin.getAdminName());
        Students stu = stuService.getInfoByStudentNum(admin.getAdminLoginID());
        JSONObject obj = JSONObject.fromObject(stu);
        Writer out = resp.getWriter();
        out.write(obj.toString());
        out.flush();
    }

    /**
     * 获取班级信息
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     */
    private void getClassInfo(HttpServletRequest req,HttpServletResponse resp) throws IOException, SQLException {
        String classID = req.getParameter("classID");
        com.LeaveSystem.model.Class cla = classService.getClassInfoByClassID(classID);
        JSONObject obj = JSONObject.fromObject(cla);
        Writer out = resp.getWriter();
        out.write(obj.toString());
        out.flush();
    }

    /**
     * 更新学生号码
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     */
    private void updateStudentTel(HttpServletRequest req,HttpServletResponse resp) throws IOException {
        String stuTel = req.getParameter("StuTel");
        String stuNum = req.getParameter("StuNum");
        int result = stuService.updateStuTel(stuTel,stuNum);
        System.out.println(result);
        System.out.println(Integer.toString(result));
        Writer out = resp.getWriter();
        out.write(Integer.toString(result));
        out.flush();
    }

    /**
     *  学生自查当天早出晚归情况
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     * @throws IOException
     */
    private void selectAdvanceDelay(HttpServletRequest req,HttpServletResponse resp) throws IOException{
        resp.setContentType("text/plain;charset=utf-8");
        HttpSession session = req.getSession(true);
        AdminInfo admin = (AdminInfo)session.getAttribute("AdminInfo");
        String result = "";
        AdvanceDelay ad = stuService.selectAdvanceDelay(Integer.toString(admin.getAdminLoginID()));
        System.out.println(ad.getDelayStudentT());
        if (ad.getZcwgid() != 0){
            if ( !"".equals(ad.getAdvanceReson()) && "".equals(ad.getDeatReson())){
                //早出请假
                result = String.format("1&%s&%s",ad.getAdvanceStudentT(),ad.getAdvanceReson());
            }else if("".equals(ad.getAdvanceReson()) && !"".equals(ad.getDeatReson())){
                //晚归请假
                result = String.format("2&%s&%s",ad.getDelayStudentT(),ad.getDeatReson());
            }else{
                result = String.format("0&%s&%s&%s&%s",ad.getAdvanceStudentT(),ad.getAdvanceReson(),ad.getDelayStudentT(),ad.getDeatReson());
            }
        }else{
            result = "3";
        }
        Writer out = resp.getWriter();
        out.write(result);
        out.flush();

    }

    /**
     *  插入上课请假 , 早自习请假 , 不留宿请假
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     * @throws IOException
     */
    private void insertLeaveRecord(HttpServletRequest req,HttpServletResponse resp) throws IOException{
        String data = req.getParameter("Data");
        String studentName = req.getParameter("StudentName");
        String teacherId = req.getParameter("TeacherID");
        String result = "-1";
        JSONObject jsonObject = JSONObject.fromObject(data);
        LeaveRecord lea = (LeaveRecord)JSONObject.toBean(jsonObject,LeaveRecord.class);
        System.out.println(lea);
        if (stuService.insertLeaveRecord(lea) == 1){
            Teachers tea = stuService.selectTeacherByNum(teacherId);
            if ("1".equals(lea.getLeaveRecordCategory()) && tea.getTeacherId() != 0)
            {
                result = tools.compStuContent(lea.getLeaveRecordCategory(), tea.getTeacherTel(), tea.getTeacherName(), studentName, lea.getLeaveRecordStudentId(), lea.getLeaveRecordReason(), lea.getLeaveRecordSumLesson(), lea.getLeaveRecordStartTime().toString(), lea.getLeaveRecordStartLesson(), lea.getLeaveRecordEndtTime().toString(), lea.getLeaveRecordEndLesson(), lea.getLeaveRecordNumDays());
            }
            else if ("2".equals(lea.getLeaveRecordCategory()) && tea.getTeacherId() != 0)
            {
                result = tools.compStuContent(lea.getLeaveRecordCategory(), tea.getTeacherTel(), tea.getTeacherName(), studentName, lea.getLeaveRecordStudentId(), lea.getLeaveRecordReason(), 0, lea.getLeaveRecordStartTime().toString(), 0, lea.getLeaveRecordEndtTime().toString(), 0, lea.getLeaveRecordNumDays());
            }
            else if ("3".equals(lea.getLeaveRecordCategory()) && tea.getTeacherId() != 0)
            {
                result = tools.compStuContent(lea.getLeaveRecordCategory(), tea.getTeacherTel(), tea.getTeacherName(), studentName, lea.getLeaveRecordStudentId(), lea.getLeaveRecordReason(), 0, lea.getLeaveRecordStartTime().toString(), 0, lea.getLeaveRecordEndtTime().toString(), 0, lea.getLeaveRecordNumDays());
            }
            else if ("4".equals(lea.getLeaveRecordCategory()) && tea.getTeacherId() != 0)
            {
                result = tools.compStuContent(lea.getLeaveRecordCategory(), tea.getTeacherTel(), tea.getTeacherName(), studentName, lea.getLeaveRecordStudentId(), lea.getLeaveRecordReason(), 0, lea.getLeaveRecordStartTime().toString(), 0, lea.getLeaveRecordEndtTime().toString(), 0, lea.getLeaveRecordNumDays());
            }
        }else{
            result = "-1";
        }
        Writer out = resp.getWriter();
        out.write(result);
        out.flush();
    }

    /**
     * 插入周末请假
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     * @throws IOException
     */
    private void InsertWeekDays(HttpServletRequest req,HttpServletResponse resp) throws IOException{
        String data = req.getParameter("Data");
        JSONObject jsonObject = JSONObject.fromObject(data);
        WeekDays week = (WeekDays)JSONObject.toBean(jsonObject,WeekDays.class);
        int result = stuService.InsertWeekDays(week);
        Writer out = resp.getWriter();
        out.write(Integer.toString(result));
        out.flush();
    }

    /**
     * 检查本周末是否请假
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     * @throws IOException
     */
    private void checkWeekLeave(HttpServletRequest req,HttpServletResponse resp) throws IOException{
        HttpSession session = req.getSession(true);
        int studentNum = ((AdminInfo)session.getAttribute("AdminInfo")).getAdminLoginID();
        String startTime = req.getParameter("starttime");
        String endTime = req.getParameter("endtime");
        int result = stuService.checkWeekLeave(startTime,endTime,Integer.toString(studentNum));
        Writer out = resp.getWriter();
        out.write(Integer.toString(result));
        out.flush();
    }

    /**
     * 插入 + 更新早出晚归请假
     * @param req HttpServletRequest
     * @param resp HttpServletResponse
     * @throws IOException
     */
    private void insertIntoAdvanceDelay(HttpServletRequest req,HttpServletResponse resp) throws IOException{
        String studentNum = req.getParameter("studentNum");
        String advanceReson = req.getParameter("advanceReson");
        String deatReson = req.getParameter("deatReson");
        String advanceStudentT = req.getParameter("advanceStudentT");
        String delayStudentT = req.getParameter("delayStudentT");
        String classNum = req.getParameter("classNum");
        String arriveCategory = req.getParameter("arriveCategory");
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        int numof = 0;
        AdvanceDelay ad = new AdvanceDelay();
        ad = stuService.selectAdvanceDelay(studentNum);
        if (ad != null){
            numof = ad.getZcwgid();
        }
        ad.setClassNum(classNum);
        ad.setStudentNum(studentNum);
        if (arriveCategory == "晚归")
        {
            ad.setDelayTime(sdf.format(date));
            ad.setDeatReson(deatReson);
            ad.setDelayStudentT(delayStudentT);
        }
        else if (arriveCategory == "早出")
        {
            ad.setAdvanceReson(advanceReson);
            ad.setAdvanceTime(sdf.format(date));
            ad.setAdvanceStudentT(advanceStudentT);
        }
        else
        {
            ad.setDelayTime(sdf.format(date));
            ad.setDeatReson(deatReson);
            ad.setDelayStudentT(delayStudentT);
            ad.setAdvanceReson(advanceReson);
            ad.setAdvanceTime(sdf.format(date));
            ad.setAdvanceStudentT(advanceStudentT);
        }
        int numInto = 0;
        if (numof == 0)
        {
            numInto = stuService.insertIntoAdvanceDelay(ad);
        }
        else
        {
            numInto = stuService.updateAdvanceDelay(ad);
        }
        Writer out = resp.getWriter();
        out.write(Integer.toString(numInto));
        out.flush();
    }
}
