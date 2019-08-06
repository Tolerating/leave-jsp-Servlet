package com.LeaveSystem.servlet;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import java.sql.Connection;
import java.sql.DriverManager;

public class tools {

    /**
     * 生成短信模板并发送短信
     * @param RecordCategory 请假类别
     * @param TeacherTel 教师电话
     * @param TeacherName 教师姓名
     * @param StudentName 学生姓名
     * @param StudentNum 学生学号
     * @param LeaveRecordReason 请假事由
     * @param LeaveRecordSumLesson 请假节数
     * @param LeaveRecordStartTime 请假开始时间
     * @param LeaveRecordStartLesson 请假节数节数
     * @param LeaveRecordEndtTime 请假结束时间
     * @param LeaveRecordEndLesson 请假结束节数
     * @param LeaveRecordNumDays 请假天数
     * @return String
     */
    public static String compStuContent(String RecordCategory, String TeacherTel, String TeacherName, String StudentName, long StudentNum, String LeaveRecordReason, long LeaveRecordSumLesson, String LeaveRecordStartTime, long LeaveRecordStartLesson, String LeaveRecordEndtTime, long LeaveRecordEndLesson, long LeaveRecordNumDays)
    {
        String contents;
        if ("1".equals(RecordCategory))
        {
            contents = "【温科院】" + TeacherName + "教师您好，您的学生" + StudentName + "(" + StudentNum + ")上课请假：因(" + LeaveRecordReason + ")事由，需请假(" + LeaveRecordSumLesson + ")节课,请假时间：" + LeaveRecordStartTime + "到" + LeaveRecordEndtTime + "止，共请假(" + LeaveRecordNumDays + ")天。请尽快予以批复。http://qj.wzvcst.edu.cn";
        }
        else if ("2".equals(RecordCategory))
        {
            contents = "【温科院】" + TeacherName + "教师您好，您的学生" + StudentName + "(" + StudentNum + ")不留宿请假：因(" + LeaveRecordReason + ")事由，需请假(" + LeaveRecordNumDays + ")天不留宿住校，请予以批准,请假时间：" + LeaveRecordStartTime + "到" + LeaveRecordEndtTime + "止。 请尽快予以批复。http://qj.wzvcst.edu.cn";
        }
        else if ("3".equals(RecordCategory))
        {
            contents = "【温科院】" + TeacherName + "教师您好，您的学生" + StudentName + "(" + StudentNum + ")早自习请假：因(" + LeaveRecordReason + ")事由，需请假(" + LeaveRecordNumDays + ")天早自习，请予以批准,请假时间：" + LeaveRecordStartTime + "到" + LeaveRecordEndtTime + "止。 请尽快予以批复。http://qj.wzvcst.edu.cn";
        }
        else
        {
            contents= "【温科院】" + TeacherName + "教师您好，您的学生" + StudentName + "(" + StudentNum + ")周末请假：因(" + LeaveRecordReason + ")事由，需请假周六周日(2)天，请予以批准,请假时间：" + LeaveRecordStartTime + "到" + LeaveRecordEndtTime + "止。 请尽快予以批复。http://qj.wzvcst.edu.cn";
        }
        return "1";
        //return sendMSG(TeacherTel,contents);
    }

    /**
     *  发送短信
     * @param tel 电话
     * @param msg 短信
     * @return String
     */
    public static String sendMSG(String tel,String msg){
        String result = null;
        try
        {
            HttpClient client = new HttpClient();
            PostMethod post = new PostMethod("http://gbk.api.smschinese.cn");
            post.addRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=gbk");//在头文件中设置转码
            NameValuePair[] data ={
                    new NameValuePair("Uid", "whitney"),
                    new NameValuePair("Key", "d41d8cd98f00b204e980"),
                    new NameValuePair("smsMob",tel),
                    new NameValuePair("smsText",msg)
            };
            post.setRequestBody(data);
            client.executeMethod(post);
            Header[] headers = post.getResponseHeaders();
            //int statusCode = post.getStatusCode();
//            System.out.println("statusCode:"+statusCode);
//            for(Header h : headers)
//            {
//                System.out.println(h.toString());
//            }
            result = new String(post.getResponseBodyAsString().getBytes("gbk"));
            System.out.println(result); //打印返回消息状态
            post.releaseConnection();
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
        return result;
    }

    /**
     *  连接数据库
     * @return Connection对象
     */
    public static Connection ConnSql(){
        Connection conn = null;
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver").newInstance();
//            System.out.println("加载驱动成功");
        } catch (InstantiationException | IllegalAccessException | ClassNotFoundException e1) {

            e1.printStackTrace();
            System.out.println("加载驱动失败");
        }
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:1433;DatabaseName=Leave","sa","123");
//            System.out.println("数据库连接成功");
        }catch(Exception e){
            System.out.println("数据库连接失败");
        }
        return conn;
    }
}
