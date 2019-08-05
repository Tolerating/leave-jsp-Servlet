package com.LeaveSystem.servlet;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import java.sql.Connection;
import java.sql.DriverManager;

public class tools {
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
