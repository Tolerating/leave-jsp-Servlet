package com.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.Writer;

@WebFilter(servletNames = {"login"},filterName="sessionFilter")
public class sessionFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpSession session = ((HttpServletRequest)servletRequest).getSession(true);
        String oper = servletRequest.getParameter("oper");
        if (session.getAttribute("AdminInfo") == null){
            if ("loginLeave".equals(oper) || "forgetPwd".equals(oper) || "checkCode".equals(oper) || "updatePwd".equals(oper)){
                filterChain.doFilter(servletRequest,servletResponse);
            }else{
                servletRequest.setCharacterEncoding("utf-8");
                servletResponse.setContentType("text/json;charset=utf-8");
                Writer out = servletResponse.getWriter();
                out.write("404");
                out.flush();
            }
        }else{
            filterChain.doFilter(servletRequest,servletResponse);
        }

    }
}
