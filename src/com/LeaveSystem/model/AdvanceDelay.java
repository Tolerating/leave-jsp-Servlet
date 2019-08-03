package com.LeaveSystem.model;


public class AdvanceDelay {

  private long zcwgid;
  private String studentNum;
  private String classNum;
  private java.sql.Timestamp advanceTime;
  private String advanceReson;
  private java.sql.Timestamp advanceStudentT;
  private java.sql.Timestamp delayTime;
  private String deatReson;
  private java.sql.Timestamp delayStudentT;


  public long getZcwgid() {
    return zcwgid;
  }

  public void setZcwgid(long zcwgid) {
    this.zcwgid = zcwgid;
  }


  public String getStudentNum() {
    return studentNum;
  }

  public void setStudentNum(String studentNum) {
    this.studentNum = studentNum;
  }


  public String getClassNum() {
    return classNum;
  }

  public void setClassNum(String classNum) {
    this.classNum = classNum;
  }


  public java.sql.Timestamp getAdvanceTime() {
    return advanceTime;
  }

  public void setAdvanceTime(java.sql.Timestamp advanceTime) {
    this.advanceTime = advanceTime;
  }


  public String getAdvanceReson() {
    return advanceReson;
  }

  public void setAdvanceReson(String advanceReson) {
    this.advanceReson = advanceReson;
  }


  public java.sql.Timestamp getAdvanceStudentT() {
    return advanceStudentT;
  }

  public void setAdvanceStudentT(java.sql.Timestamp advanceStudentT) {
    this.advanceStudentT = advanceStudentT;
  }


  public java.sql.Timestamp getDelayTime() {
    return delayTime;
  }

  public void setDelayTime(java.sql.Timestamp delayTime) {
    this.delayTime = delayTime;
  }


  public String getDeatReson() {
    return deatReson;
  }

  public void setDeatReson(String deatReson) {
    this.deatReson = deatReson;
  }


  public java.sql.Timestamp getDelayStudentT() {
    return delayStudentT;
  }

  public void setDelayStudentT(java.sql.Timestamp delayStudentT) {
    this.delayStudentT = delayStudentT;
  }

}
