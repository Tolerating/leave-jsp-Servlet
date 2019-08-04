package com.LeaveSystem.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.Writer;
import com.LeaveSystem.model.*;
import com.LeaveSystem.service.impl.*;

@WebServlet("/login")
public class loginServlet extends HttpServlet {
    loginServiceImpl lgService = new loginServiceImpl();
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");
        String oper = req.getParameter("oper");
        System.out.println(oper);
//        loginLeave(req,resp);
        if ("loginLeave".equals(oper)){
            loginLeave(req,resp);
        }else{
            System.out.println("没有找到对应的操作符" + oper);
        }

    }

    private void loginLeave(HttpServletRequest req,HttpServletResponse resp) throws IOException {
        String name = req.getParameter("Name");
        String pwd = req.getParameter("Pwd");
        int result = 0;
        AdminInfo model = lgService.loginLeave(name,pwd);
        if (model.getAdminID() == 0)
        {
            result = -1;
        }
        else
        {
           result = 1;
            HttpSession session = req.getSession(true);
            session.setAttribute("AdminInfo",model);
//            Session["AdminInfo"] = model;
        }
        Writer out = resp.getWriter();
        out.write("{\"name\":\""+ model.getAdnminPasssword() +"\"}");
        out.flush();
    }
}
